import express, { Express, Router } from "express";
const router: Router = express.Router();

import controller from "@controller/groupsController";

router.post("/", controller.createGroup);
router.put("/:groupId", controller.updateGroup);
router.get("/", controller.getGroup);
router.delete("/:groupId", controller.deleteGroup);

router.post("/:groupId/ban", controller.banGroup);
router.post("/:groupId/exit", controller.exitGroup);
router.put("/:groupId/change-leader", controller.changeLeader);
router.get("/:groupId/members", controller.getGroupMembers);
router.get("/:groupId/schedule", controller.getScheduleByMembers);

export default router;
