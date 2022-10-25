import express, { Express, Router } from "express";
const router: Router = express.Router();

const controller = require('../controller/worksController')

router.post('/', controller.createWork);
router.get('/', controller.getWorks);

export default router;