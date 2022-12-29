import { Request, Response } from "express";
import * as groupService from "@services/groupsService";

const createGroup = async (req: Request, res: Response) => {
  try {
    const data = await groupService.createGroup(
      req.user_id,
      req.body.name,
      req.body.color
    );
    return res.status(200).json({ status: 200, body: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getGroup = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.getGroup(req.user_id);
    return res.status(200).json({ status: 200, body: groups });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const updateGroup = async (req: Request, res: Response) => {
  try {
    await groupService.updateGroup(
      req.user_id,
      +req.params.groupId,
      req.body.name,
      req.body.color
    );
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const groupId = await groupService.deleteGroup(
      req.user_id,
      +req.params.groupId
    );
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const banGroup = async (req: Request, res: Response) => {
  try {
    const groupId = await groupService.banGroup(
      +req.params.groupId,
      req.user_id,
      req.body.user_id
    );
    return res.status(200).json({ status: 200, id: groupId });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const exitGroup = async (req: Request, res: Response) => {
  try {
    await groupService.exitGroup(+req.params.groupId, req.user_id);
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const changeLeader = async (req: Request, res: Response) => {
  try {
    await groupService.changeLeader(
      +req.params.groupId,
      req.user_id,
      req.body.user_id
    );
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getGroupMembers = async (req: Request, res: Response) => {
  try {
    const data = await groupService.getGroupMembers(+req.params.groupId);
    return res.status(200).json({ status: 200, body: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getScheduleByMembers = async (req: Request, res: Response) => {
  try {
    const data = await groupService.getScheduleByMembers(+req.params.groupId);
    return res.status(200).json({ status: 200, body: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const inviteMember = async (req: Request, res: Response) => {
  try {
    await groupService.inviteMember(
      req.user_id,
      +req.params.groupId,
      req.body.email
    );
    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default {
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  banGroup,
  exitGroup,
  changeLeader,
  getGroupMembers,
  getScheduleByMembers,
  inviteMember,
};
