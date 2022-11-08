import jwt from "jsonwebtoken";
import * as authService from "@services/authService";
import { NextFunction, Request, Response } from "express";
import { config } from "config";
import { UserAttributes } from "@db/models/user";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");

  if (!authHeader && authHeader.startsWith("Bearer ")) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.secretKey, (error) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
  });

  const decodedToken = jwt.decode(token) as UserAttributes;

  const user = await authService.findByUserIdentification(
    decodedToken.identification
  );

  if (!user) {
    return res.status(401).json(AUTH_ERROR);
  }
  req.identification = user.identification; // 다른 콜백에서 동일하게 접속해야 하기때문에 사용

  next();
};
