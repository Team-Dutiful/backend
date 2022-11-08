import express, { Router } from "express";
import { body } from "express-validator";
import controller from "@controller/authController";
import { validate } from "./middlewares/validator";
import { isAuth } from "./middlewares/auth";

const router: Router = express.Router();

const validateLogin = [
  body("identification")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("아이디는 5자 이상"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("패스워드는 5자 이상"),
  validate,
];

const validateFindID = [
  body("name").notEmpty().withMessage("이름을 입력하세요"),
  body("email").isEmail().withMessage("이메일 형식 입력 필요").normalizeEmail(),
  validate,
];

const validateSignup = [...validateLogin, ...validateFindID];

router.post(
  "/signup", //
  validateSignup,
  controller.signup
);
router.post("/login", validateLogin, controller.login);

router.post("/find-id", validateFindID, controller.findid);

router.post(
  "/change-pwd",
  [
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("패스워드는 5자 이상"),
    validate,
  ],
  isAuth,
  controller.changepwd
);

router.get("/me", isAuth, controller.me);

export default router;
