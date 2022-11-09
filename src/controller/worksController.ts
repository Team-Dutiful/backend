import { Request, Response } from "express";
import WorksService from "@services/worksService";
const service = new WorksService();

const createWork = async (req: Request, res: Response) => {
  try {
    await service.createWork(
      req.body.name,
      req.body.color,
      req.body.start_time,
      req.body.end_time,
      req.body.work_type,
      req.body.memo
    );
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getWorks = async (req: Request, res: Response) => {
  try {
    const work_id = Number(req.params.workId);
    await service.getWork(work_id);
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default { createWork, getWorks };
