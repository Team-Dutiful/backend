import express, { Router } from "express";
const router: Router = express.Router();

import controller from "@controller/worksController";
import { isAuth } from "./middlewares/auth";

router.post("/", controller.createWork);
router.get("/", isAuth, controller.getWorksList);
router.get("/:workId", controller.getWorks);
router.put("/:workId", controller.updateWorks);
router.delete("/:workId", controller.deleteWorks);

export default router;
