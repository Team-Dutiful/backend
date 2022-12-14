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

const getWork = async (req: Request, res: Response) => {
  try {
    const work_id = Number(req.params.workId);
    const work = await service.getWork(work_id);
    return res.status(200).json({ status: 200, message: "OK", body: { work } });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getWorksList = async (req: Request, res: Response) => {
  try {
    const workList = await service.getWorkList(req.user_id);
    return res
      .status(200)
      .json({ status: 200, message: "OK", body: { workList } });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const updateWork = async (req: Request, res: Response) => {
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

export default { createWork, getWork, getWorksList, updateWork, deleteWorks };
