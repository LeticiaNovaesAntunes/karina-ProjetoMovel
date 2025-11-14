import { PrismaClient } from "../generated/prisma/index";
import type { Request, Response } from "express";
import type { UserDTO, UpdateUserDTO } from "../DTO/UserDTO";


const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { senha, email } = req.body as UserDTO;
      console.log("\n\nSENHA ::::", email)

  try {
    const user = await prisma.user.create({ data: { senha, email } });
    console.log('\n\n USER :::', user)
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

export const forgotPassword = async (request: Request, response:Response) => {
    const { email } = request.body;
    console.log("\n\nSENHA ::::", email)

    const user = await prisma.user.findUnique({
        where: { email },
    });


    if (user) {
        return response.status(200).json({ message: "Reset process initiated." });
    }
    
    // Se o usuário não for encontrado, simule um sucesso para segurança (para evitar enumeração de usuários)
    console.log(`[INFO] Tentativa de redefinição para email não encontrado: ${email}`);
    return response.status(200).json({ message: "Reset process initiated." }); 
};