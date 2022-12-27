import express, { Express, Router } from "express";
import { isAuth } from "./middlewares/auth";

const router: Router = express.Router();

import controller from "@controller/scheduleController";

router.post("/manage", isAuth, controller.manageSchedule);
router.post("/", isAuth, controller.getSchedule);

export default router;
