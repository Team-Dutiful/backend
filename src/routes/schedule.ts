import express, { Express, Router } from "express";
const router: Router = express.Router();

import controller from "../controller/scheduleController";

router.post("/", controller.createSchedule);
router.get("/", controller.getSchedule);

export default router;
