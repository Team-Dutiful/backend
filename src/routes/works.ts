import express, { Express, Router } from "express";
const router: Router = express.Router();

import controller from "../controller/worksController";

router.post("/", controller.createWork);
router.get("/", controller.getWorks);

export default router;
