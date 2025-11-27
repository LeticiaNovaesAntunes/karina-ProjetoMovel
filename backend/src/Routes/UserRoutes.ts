import { Router } from "express";
import { createUser, updateUser, loginUser, deleteUser, forgotPassword, getUserProfile, getAllUsers, adminControl } from "../Controllers/UserController";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.post("/singup", createUser);
router.put("/profile", authenticateToken, updateUser);
router.post("/signin", loginUser);
router.post("/forgotPassword", forgotPassword);
router.delete("/admin/:id", authenticateToken, isAdmin, deleteUser);
router.get("/profile", authenticateToken, getUserProfile);
router.get("/", authenticateToken, isAdmin, getAllUsers);
router.patch("/admin/:id", authenticateToken, isAdmin, adminControl);

export default router;
