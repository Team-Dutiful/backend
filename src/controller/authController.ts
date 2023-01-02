import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authService from "@services/authService";
import WorksService from "@services/worksService";
import { UserAttributes } from "@db/models/user";
import { config } from "config";
import axios from "axios";
const service = new WorksService();

const signup = async (req: Request<{}, {}, UserAttributes>, res: Response) => {
  const { identification, password, name, email } = req.body;
  const found = await authService.findByUserIdentification(identification);
  if (found) {
    return res
      .status(409)
      .json({ message: `${identification} already exists` });
  }

  // 입력 받은 패스워드를 암호화
  // saltRounds를 이용하여 암호화를 더 복잡하게 한다.
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

  try {
    const user = await authService.createUser({
      identification,
      password: hashed,
      name,
      email,
    });

    await service.createDefaultWork(user.user_id);

    res.status(200).json({
      status: "200",
      message: "OK",
      body: {
        identification,
        email,
        name,
      },
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { identification, password } = req.body;
    const user = await authService.findByUserIdentification(identification);
    if (!user) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    // 입력받은 패스워드와 저장되어있는 암호화된 패스워드를 비교
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid user or password" });
    }
    const token = createJwtToken(user);
    res.cookie("accessToken", token, {
      maxAge: config.jwt.expiresInSec,
      httpOnly: true,
    });
    return res.status(200).json({
      status: " 200",
      message: "OK",
      body: {
        user_id: user.user_id,
        identification,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const loginKakao = async (req: Request, res: Response) => {
  const { code } = req.query;

  const {
    data: { access_token: kakaoAccessToken },
  } = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    { withCredentials: true },
    {
      params: {
        grant_type: "authorization_code",
        client_id: config.kakao.apiKey,
        redirect_uri: config.kakao.redirectURI,
        code,
      },
    }
  );

  console.log(kakaoAccessToken);

  const { data: kakaoUser } = await axios.post(
    "https://kapi.kakao.com/v2/user/me",
    { withCredentials: true },
    {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    }
  );

  console.log(kakaoUser);
  const email = kakaoUser.kakao_account.email;
  const nickname = kakaoUser.kakao_account.profile.nickname;

  const find = await authService.findByEmail(email);
  console.log(find);

  // 카카오 유저 정보에서 가져온 이메일이 서비스 DB에 없으면 새로운 계정을 만들고 로그인 진행
  if (!find) {
    const hashed = await bcrypt.hash(
      String(kakaoUser.id),
      config.bcrypt.saltRounds
    );
    const newUser: UserAttributes = {
      identification: email,
      password: hashed,
      name: nickname,
      email,
    };

    try {
      await authService.createUser(newUser);
      const user = await authService.findByUserIdentification(
        newUser.identification
      );

      const token = createJwtToken(user);
      res.cookie("accessToken", token, {
        maxAge: config.jwt.expiresInSec,
        httpOnly: true,
      });
      return res.status(200).json({
        status: " 200",
        message: "OK",
        body: {
          user_id: user.user_id,
          identification: user.identification,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: 400, message: "로그인 중 가입 실패" });
    }
  }

  // 계정이 있다면 로그인
  const token = createJwtToken(find);
  res.cookie("accessToken", token, {
    maxAge: config.jwt.expiresInSec,
    httpOnly: true,
  });
  return res.status(200).json({
    status: " 200",
    message: "OK",
    body: {
      user_id: find.user_id,
      identification: find.identification,
      name: find.name,
      email: find.email,
    },
  });
};

const loginNaver = async (req: Request, res: Response) => {
  const { code, state } = req.query;

  // 접근 토큰 요청
  const {
    data: { access_token: naverAccessToken },
  } = await axios.post(
    `https://nid.naver.com/oauth2.0/token`,
    { withCredentials: true },
    {
      params: {
        client_id: config.naver.clientID,
        client_secret: config.naver.clientSecret,
        grant_type: "authorization_code",
        state,
        code,
      },
    }
  );

  // 네이버 유저 정보 조회
  const { data: naverUser } = await axios.post(
    "https://openapi.naver.com/v1/nid/me",
    { withCredentials: true },
    {
      headers: {
        Authorization: `Bearer ${naverAccessToken}`,
      },
    }
  );

  const { id, email, name } = naverUser.response;
  console.log(id, email, name);

  const find = await authService.findByEmail(email);
  console.log(find);

  // DB에 이메일이 없다면 계정 생성 후 로그인
  if (!find) {
    const hashed = await bcrypt.hash(id, config.bcrypt.saltRounds);
    const newUser: UserAttributes = {
      identification: email,
      password: hashed,
      name,
      email,
    };

    try {
      await authService.createUser(newUser);
      const user = await authService.findByUserIdentification(
        newUser.identification
      );

      const token = createJwtToken(user);
      res.cookie("accessToken", token, {
        maxAge: config.jwt.expiresInSec,
        httpOnly: true,
      });
      return res.status(200).json({
        status: " 200",
        message: "OK",
        body: {
          user_id: user.user_id,
          identification: user.identification,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: 400, message: "로그인 중 가입 실패" });
    }
  }

  // 계정이 있다면 로그인
  const token = createJwtToken(find);
  res.cookie("accessToken", token, {
    maxAge: config.jwt.expiresInSec,
    httpOnly: true,
  });
  return res.status(200).json({
    status: " 200",
    message: "OK",
    body: {
      user_id: find.user_id,
      identification: find.identification,
      name: find.name,
      email: find.email,
    },
  });
};

const logout = (req: Request, res: Response) => {
  return res.clearCookie("accessToken").status(200).json({
    status: "204",
    message: "OK",
    body: {},
  });
};

const findid = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await authService.findByUserNameAndEmail(name, email);
  if (!user) {
    return res.status(401).json({ message: "Invaild user" });
  }
  console.log(user);

  return res.status(200).json({
    status: "200",
    message: "OK",
    body: {
      identification: user.identification,
    },
  });
};

const changeName = async (req: Request, res: Response) => {
  const { newUserName } = req.body;

  try {
    await authService.changeUserName(req.user_id, newUserName);
    return res.status(200).json({
      status: "200",
      message: "OK",
      body: {},
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const changeEmail = async (req: Request, res: Response) => {
  const { newUserEmail } = req.body;
  console.log("------", newUserEmail);
  try {
    await authService.changeUserEmail(req.user_id, newUserEmail);
    return res.status(200).json({
      status: "200",
      message: "OK",
      body: {},
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const changepwdByPwd = async (req: Request, res: Response) => {
  const { identification, curPwd, newPwd } = req.body;
  const user = await authService.findByUserIdentification(identification);
  const isValidPassword = await bcrypt.compare(curPwd, user.password);

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: "현재 비밀번호가 일치하지 않습니다." });
  }

  const hashed = await bcrypt.hash(newPwd, config.bcrypt.saltRounds);
  try {
    await authService.changeUserPassword(req.user_id, hashed);
    return res.status(200).json({
      status: "200",
      message: "OK",
      body: {},
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const changepwdByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const user = await authService.findByEmail(email);

  try {
    await authService.changeUserPassword(user.user_id, hashed);
    return res.status(200).json({
      status: "200",
      message: "OK",
      body: {
        identification: user.identification,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  const found = await authService.findByEmail(email);
  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }

  const authNum = await authService.sendCodeMail(email, "signup");
  return res.status(200).json({
    body: {
      authNum,
    },
  });
};

const sendCodeAtFindPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const found = await authService.findByEmail(email);
  if (!found) {
    return res.status(409).json({ message: `${email} not exists` });
  }

  const authNum = await authService.sendCodeMail(email, "changepwd");
  return res.status(200).json({
    body: {
      authNum,
    },
  });
};

function createJwtToken(user: UserAttributes) {
  return jwt.sign(
    { identification: user.identification },
    config.jwt.secretKey,
    {
      expiresIn: config.jwt.expiresInSec,
    }
  );
}

export default {
  login,
  loginKakao,
  loginNaver,
  logout,
  signup,
  findid,
  changeName,
  changeEmail,
  changepwdByPwd,
  changepwdByEmail,
  sendCode,
  sendCodeAtFindPassword,
};
