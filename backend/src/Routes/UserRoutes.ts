// src/routes/authRoutes.ts
import { Router } from "express";
import { createUser, updateUser, loginUser, deleteUser } from "../Controllers/UserController.js"

export const userRoutes = Router();

userRoutes.post("/singup", createUser);        
userRoutes.put("/:id", updateUser);      
userRoutes.post("/singin", loginUser);   
userRoutes.delete("/:id", deleteUser);   
