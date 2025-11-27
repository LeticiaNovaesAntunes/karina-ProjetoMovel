import { Router } from "express";
import { forgotPassword, verifyTokenAndResetPassword } from "../Controllers/AuthController";

const router = Router();

;
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", verifyTokenAndResetPassword);

export default router;
