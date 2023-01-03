import express, { Router } from "express";
const router: Router = express.Router();

import controller from "@controller/worksController";
import { isAuth } from "./middlewares/auth";

router.post("/", controller.createWork);
router.get("/", isAuth, controller.getWorksList);
router.get("/:workId", controller.getWork);
router.put("/:workId", controller.updateWork);
router.delete("/:workId", controller.deleteWorks);

export default router;
