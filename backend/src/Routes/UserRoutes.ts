import { Router } from "express";
import { createUser, updateUser, loginUser, deleteUser, forgotPassword } from "../Controllers/UserController";
const router = Router();

router.post("/singup", createUser); 
router.put("/:id", updateUser); 
router.post("/singin", loginUser); 
router.post("/forgotPassword", forgotPassword); 
router.delete("/:id", deleteUser); 

export default router;