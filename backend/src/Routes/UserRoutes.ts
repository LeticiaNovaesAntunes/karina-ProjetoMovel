import { Router } from "express";
import { createUser, updateUser, loginUser, deleteUser, forgotPassword } from "../Controllers/UserController"

// Mude 'export const userRoutes = Router();' para:
const router = Router();

router.post("/singup", createUser);        
router.put("/:id", updateUser);      
router.post("/singin", loginUser); 
router.post("/forgotPassword", forgotPassword);  
router.delete("/:id", deleteUser);  

// Use Exportação Padrão (default) para funcionar com o server.ts
export default router;