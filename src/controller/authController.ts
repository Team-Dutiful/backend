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
      body: {},
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
    return res.status(200).json({
      status: " 200",
      message: "OK",
      body: {
        token,
        identification,
      },
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const findid = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const users = await authService.findByUserNameAndEmail(name, email);
  if (!users.length) {
    return res.status(401).json({ message: "Invaild user" });
  }

  return res.status(200).json({
    status: "200",
    message: "OK",
    body: {
      identification: users.map((user) => user.identification),
    },
  });
};

const changepwd = async (req: Request, res: Response) => {
  const { password } = req.body;
  console.log(password);
  // 입력 받은 패스워드를 암호화
  // saltRounds를 이용하여 암호화를 더 복잡하게 한다.
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  try {
    await authService.changeUserPasswrod(req.identification, hashed);
    return res.status(200).json({
      status: "200",
      message: "OK",
      body: {},
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// isAuth를 사용했을 때 req 사용 예시
const me = async (req: Request, res: Response) => {
  // req에 저장되어있는 identification을 이용하여 유저정보 찾기
  const user = await authService.findByUserIdentification(req.identification);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res
    .status(200)
    .json({ token: req.token, identification: user.identification });
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

export default { login, signup, findid, changepwd, me };
