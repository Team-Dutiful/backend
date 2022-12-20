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
  const accessToken = req.cookies.accessToken;

  try {
    const decodedToken = jwt.decode(accessToken) as UserAttributes;
    console.log(decodedToken);
    const user = await authService.findByUserIdentification(
      decodedToken.identification
    );

    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.user_id = user.user_id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json(AUTH_ERROR);
  }
};
