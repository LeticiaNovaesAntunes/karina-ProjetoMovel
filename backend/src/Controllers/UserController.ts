// src/controllers/authController.ts
import { PrismaClient } from "../generated/prisma/index.js";
import type { Request, Response } from "express";
import type { UserDTO, UpdateUserDTO } from "../DTO/UserDTO.js";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { senha, email } = req.body as UserDTO;
  try {
    const user = await prisma.user.create({ data: { senha, email } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as UpdateUserDTO;

  try {
    const user = await prisma.user.update({
      where: { id: String(id) },
      data,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, senha } = req.body as UserDTO;

  try {
    const user = await prisma.user.findUnique({
      where: { email: String(email), senha: String(senha) },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao logar usuário" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: String(id) } });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar usuário" });
  }
};
