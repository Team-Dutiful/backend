import { Request, Response } from "express";
import AuthService from '../services/authService';
const service = new AuthService();

exports.login = async(req: Request, res: Response) => {
    try {
        await service.login();
        return res.status(200).json({ status: 200 });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.logout = async(req: Request, res: Response) => {
    try {
        await service.logout();
        return res.status(200).json({ status: 200 });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

