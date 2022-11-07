import express, { Express, Router } from "express";
const router: Router = express.Router();

import controller from "@controller/scheduleController";

router.post("/", controller.manageSchedule);
router.get("/", controller.getSchedule);

export default router;
