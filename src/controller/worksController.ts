import { Request, Response } from "express";
import WorksService from "@services/worksService";
const service = new WorksService();

const createWork = async (req: Request, res: Response) => {
  try {
    await service.createWork();
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getWorks = async (req: Request, res: Response) => {
  try {
    await service.getWork();
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default { createWork, getWorks };
