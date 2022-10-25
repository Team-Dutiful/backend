import express, { Express, Router } from "express";
const router: Router = express.Router();

const controller = require('../controller/groupsController')

router.post('/', controller.createGroup);
router.get('/', controller.getGroup);

export default router;