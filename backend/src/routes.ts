import { PrismaClient } from "./generated/prisma/index.js"
import { Router } from "express";
import type  { Request, Response } from "express";
import type { UserDTO, UpdateUserDTO } from './DTO/UserDTO.js'

const userRoutes = Router();
const prisma = new PrismaClient();

// Criar usuário
userRoutes.post("/", async (req: Request, res: Response) => {
  const { senha, email } = req.body as UserDTO;

  try {
    const user = await prisma.user.create({ data: { senha, email } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
});

// Atualizar usuário
userRoutes.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as UpdateUserDTO;

  try {
    const user = await prisma.user.update({
      where: { id: String(id)},
      data,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
});

// Logar

userRoutes.get("/", async(req: Request, res:Response)=> {
  const {email, senha}= req.body as UserDTO;
  const user = await prisma.user.findUnique({where: {email: String(email), senha: String(senha)
}})
  res.json(user);
})

// Deletar usuário
userRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: String(id)}});
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar usuário" });
  }
});

export { userRoutes };
