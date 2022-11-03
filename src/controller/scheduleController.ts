import { Request, Response } from "express";
import ScheduleService from "@services/scheduleService";
const service = new ScheduleService();

const createSchedule = async (req: Request, res: Response) => {
  try {
    await service.createSchedule();
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getSchedule = async (req: Request, res: Response) => {
  try {
    await service.getSchedule();
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default { createSchedule, getSchedule };