import express, { Express, Router } from "express";
const router: Router = express.Router();

import controller from "@controller/worksController";

router.get("/", controller.getWorksList);
router.post("/", controller.createWork);
router.get("/:workId", controller.getWorks);
router.put("/:workId", controller.updateWorks);
router.delete("/:workId", controller.deleteWorks);

export default router;
