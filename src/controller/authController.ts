import { Request, Response } from "express";
import AuthService from "../services/authService";
const service = new AuthService();

const login = async (req: Request, res: Response) => {
  try {
    await service.login();
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await service.logout();
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default { login, logout };
