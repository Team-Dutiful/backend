import { Request, Response } from "express";
import * as ScheduleService from "@services/scheduleService";

const manageSchedule = async (req: Request, res: Response) => {
  try {
    await ScheduleService.manageSchedule(req.body.calendarWork, req.user_id);
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getSchedule = async (req: Request, res: Response) => {
  try {
    await ScheduleService.getSchedule(req.body.year, req.body.month);
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default { manageSchedule, getSchedule };
