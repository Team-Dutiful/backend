import { Request, Response } from "express";
import WorksService from "@services/worksService";
const service = new WorksService();

const createWork = async (req: Request, res: Response) => {
  try {
    const { user_id, name, color, start_time, end_time, work_type, memo } =
      req.body;
    await service.createWork(
      user_id,
      name,
      color,
      start_time,
      end_time,
      work_type,
      memo
    );
    return res.status(200).json({ status: 200, message: "OK", body: {} });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getWorks = async (req: Request, res: Response) => {
  try {
    const work_id = Number(req.params.workId);
    await service.getWork(work_id);
    return res.status(200).json({ status: 200, message: "OK", body: {} });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getWorksList = async (req: Request, res: Response) => {
  try {
    await service.getWorkList();
    return res.status(200).json({ status: 200, message: "OK", body: {} });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const updateWorks = async (req: Request, res: Response) => {
  try {
    const work_id = Number(req.params.workId);
    const { name, color, start_time, end_time, work_type, memo } = req.body;

    await service.updateWork(
      work_id,
      name,
      color,
      start_time,
      end_time,
      work_type,
      memo
    );
    return res.status(200).json({ status: 200, message: "OK", body: {} });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const deleteWorks = async (req: Request, res: Response) => {
  try {
    const work_id = Number(req.params.workId);
    await service.deleteWork(work_id);
    return res.status(200).json({ status: 200, message: "OK", body: {} });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default { createWork, getWorks, getWorksList, updateWorks, deleteWorks };
