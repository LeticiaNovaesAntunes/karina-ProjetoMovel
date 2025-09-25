// src/routes/authRoutes.ts
import { Router } from "express";
import { createUser, updateUser, loginUser, deleteUser } from "../Controllers/UserController.js"

export const userRoutes = Router();

userRoutes.post("/signup", createUser);        
userRoutes.put("/:id", updateUser);      
userRoutes.get("/singin", loginUser);   
userRoutes.delete("/:id", deleteUser);   
