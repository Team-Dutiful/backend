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

router.post("/signup", validateSignup, controller.signup);

router.post("/login", validateLogin, controller.login);

router.get("/login-kakao", controller.loginKakao);

router.get("/login-naver", controller.loginNaver);

router.post("/logout", controller.logout);

router.post("/find-id", validateFindID, controller.findid);

router.post("/send-code", controller.sendCode);

router.post("/find-send-code", controller.sendCodeAtFindPassword);

router.post(
  "/change-pwd-from-email",
  [
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("패스워드는 5자 이상"),
    validate,
  ],
  controller.changepwdByEmail
);

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

router.post("/change-name", isAuth, controller.changeName);

export default router;
