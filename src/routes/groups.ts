import express, { Router } from "express";
import controller from "@controller/groupsController";
import { isAuth } from "./middlewares/auth";

const router: Router = express.Router();

router.post("/", isAuth, controller.createGroup);
router.put("/:groupId", isAuth,controller.updateGroup);
router.get("/", isAuth, controller.getGroup);
router.delete("/:groupId", isAuth, controller.deleteGroup);

router.post("/:groupId/ban", isAuth, controller.banGroup);
router.post("/:groupId/exit", isAuth, controller.exitGroup);
router.put("/:groupId/change-leader", isAuth, controller.changeLeader);
router.get("/:groupId/members", isAuth, controller.getGroupMembers);
router.get("/:groupId/schedule", isAuth, controller.getScheduleByMembers);

export default router;
