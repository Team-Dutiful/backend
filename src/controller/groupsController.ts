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
    const groups = await service.getGroup();
    return res.status(200).json({ status: 200, data : groups });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const updateGroup = async (req: Request, res: Response) => {
  try {
    const groupId = await service.updateGroup(+req.params.groupId, req.body.name, req.body.color);
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const groupId = await service.deleteGroup(+req.params.groupId);
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const banGroup = async (req: Request, res: Response) => {
  try {
    const groupId = await service.banGroup(+req.params.groupId, req.body.user_id);
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const exitGroup = async (req: Request, res: Response) => {
  try {
    await service.exitGroup(+req.params.groupId, req.body.user_id);
    return res.status(200).json({ status: 200});
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const changeLeader = async (req: Request, res: Response) => {
  try {
    const groupId = await service.changeLeader(+req.params.groupId, req.body.user_id);
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getGroupMembers = async (req: Request, res: Response) => {
  try {
    const groupId = await service.getGroupMembers(+req.params.groupId);;
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getScheduleByMembers = async (req: Request, res: Response) => {
  try {
    const groupId = await service.getScheduleByMembers(+req.params.groupId);
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


export default { createGroup, getGroup, updateGroup, deleteGroup, banGroup, exitGroup, changeLeader, getGroupMembers, getScheduleByMembers};
