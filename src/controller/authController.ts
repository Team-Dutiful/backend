import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authService from "@services/authService";
import { UserAttributes } from "@db/models/user";
import { config } from "config";

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
    await authService.createUser({
      identification,
      password: hashed,
      name,
      email,
    });

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
        identification,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
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

const changepwd = async (req: Request, res: Response) => {
  const { password } = req.body;

  // 입력 받은 패스워드를 암호화
  // saltRounds를 이용하여 암호화를 더 복잡하게 한다.
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
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
  logout,
  signup,
  findid,
  changepwd,
  changepwdByEmail,
  sendCode,
  sendCodeAtFindPassword,
};
