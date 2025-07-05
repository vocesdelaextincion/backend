import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  handleValidationErrors,
} from "../middleware/validators";

const router = Router();

router.post("/register", registerValidator, handleValidationErrors, register);
router.post("/login", loginValidator, handleValidationErrors, login);
router.post("/verify-email/:token", verifyEmail);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  handleValidationErrors,
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPasswordValidator,
  handleValidationErrors,
  resetPassword
);

export default router;
