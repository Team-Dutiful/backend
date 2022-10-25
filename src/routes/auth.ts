import express, { Express, Router } from "express";
const router: Router = express.Router();

const controller = require('../controller/authController')

router.post('/login', controller.login);
router.post('/logout', controller.logout);

export default router;