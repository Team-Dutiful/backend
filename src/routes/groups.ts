import express, { Express, Router } from "express";
const router: Router = express.Router();

import controller from "@controller/groupsController";

router.post("/", controller.createGroup);
router.get("/", controller.getGroup);

export default router;
