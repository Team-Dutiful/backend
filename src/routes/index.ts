import express, { Express, Router } from "express";
const router: Router = express.Router();

import groupRouter from "./groups"
import authRouter from "./auth"
import scheduleRouter from "../routes/schedule"
import worksRouter from "../routes/works"

router.use('/groups', groupRouter);
router.use('/auth', authRouter);
router.use('/schedule', scheduleRouter);
router.use('/works', worksRouter);

export default router;