import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  body("name").isLength({ min: 3 }).withMessage("hi mr/miss"),
  body("email").isEmail().withMessage("email must be valid address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be least 6 character long"),

  userController.createUserController
);

// login
router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.loginController
);

router.get(
  "/profile",
  authMiddleware.authUser,
  userController.profileController
);

router.get("/logout", authMiddleware.authUser, userController.logoutController);

router.get("/all", authMiddleware.authUser , userController.getAllUsersController);

export default router;
