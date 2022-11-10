import express, { Express, Router } from "express";
import { isAuth } from "./middlewares/auth";

const router: Router = express.Router();

import controller from "@controller/scheduleController";

router.post("/", isAuth, controller.manageSchedule);
router.get("/", controller.getSchedule);

export default router;
