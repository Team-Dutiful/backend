import { Request, Response } from "express";
import GroupService from "@services/groupsService";
const service = new GroupService();

const createGroup = async (req: Request, res: Response) => {
  try {
    const groupId = await service.createGroup(req.body.name, req.body.color);
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getGroup = async (req: Request, res: Response) => {
  try {
    await service.getGroup();
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default { createGroup, getGroup };
