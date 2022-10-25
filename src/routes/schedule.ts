import express, { Express, Router } from "express";
const router: Router = express.Router();

const controller = require('../controller/scheduleController')

router.post('/', controller.createSchedule);
router.get('/', controller.getSchedule);

export default router;