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
}

export const forgotPassword = async (request, response) => {
    const { email } = request.body;

    // 1. Encontrar o usuário
    const user = await prisma.user.findUnique({
        where: { email },
    });

    // 2. Lógica de Envio de Email (APENAS UM SIMULACRO)
    if (user) {
        // ⚠️ Aqui você implementaria a lógica real para:
        //    a) Gerar um token de redefinição único.
        //    b) Salvar esse token e o tempo de expiração no DB.
        //    c) Enviar um email para o usuário com o link contendo o token.

        console.log(`[SUCESSO] Processo de redefinição iniciado para: ${email}`);
        
        // 🚨 RETORNO IMPORTANTE: Retorne 200/204 para o FRONTEND
        // Por segurança, você sempre retorna sucesso para evitar que hackers descubram emails válidos.
        return response.status(200).json({ message: "Reset process initiated." });
    }
    
    // Se o usuário não for encontrado, simule um sucesso para segurança (para evitar enumeração de usuários)
    console.log(`[INFO] Tentativa de redefinição para email não encontrado: ${email}`);
    return response.status(200).json({ message: "Reset process initiated." }); 
};