import { PrismaClient } from "../generated/prisma/index.js";
import type { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const saltRounds = 10;
const JWT_SECRET = "sua_chave_secreta_muito_forte";

const prisma = new PrismaClient();

export const createUser = async (request: Request, response: Response) => {
    const { name, email, senha, telefone } = request.body;
    const roleFromRequest = request.body.role || "USER";

    if (!name || !email || !senha) {
        return response.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    try {
        const passwordHash = await bcrypt.hash(senha, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                telefone,
                role: roleFromRequest
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        return response.status(201).json(newUser);
    } catch (error: any) {
        if (error.code === "P2002") {
            return response.status(409).json({ error: "Este e-mail já está cadastrado." });
        }
        return response.status(500).json({ error: "Erro interno ao criar usuário." });
    }
};

export const loginUser = async (request: Request, response: Response) => {
    const { email, senha } = request.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return response.status(401).json({ error: "E-mail ou senha inválidos." });
        }

        const passwordMatch = await bcrypt.compare(senha, user.passwordHash);

        if (!passwordMatch) {
            return response.status(401).json({ error: "E-mail ou senha inválidos." });
        }

        const token = jwt.sign(
            { userId: user.id, userRole: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return response.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        return response.status(500).json({ error: "Erro interno no servidor." });
    }
};

export const forgotPassword = async (request: Request, response: Response) => {
    const { email } = request.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (user) {
        return response.status(200).json({ message: "Reset process initiated." });
    }

    return response.status(200).json({ message: "Reset process initiated." });
};

export const updateUser = async (req: any, res: any) => {
    const userId = req.user.userId;
    const { telefone, photoUrl } = req.body;

    const updates: any = {};

    if (telefone !== undefined) {
        updates.telefone = telefone;
    }

    if (photoUrl !== undefined) {
        updates.photoUrl = photoUrl;
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "Nenhum campo válido para atualização." });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updates,
            select: { id: true, name: true, email: true, telefone: true, role: true, photoUrl: true }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar perfil." });
    }
};

export const getUserProfile = async (req: any, res: any) => {
    const userId = req.user.userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                telefone: true,
                role: true,
                photoUrl: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno ao buscar perfil." });
    }
};

export const deleteUser = async (req: any, res: any) => {
    const userIdToDelete = req.params.id;

    try {
        await prisma.user.delete({ where: { id: userIdToDelete } });
        return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        return res.status(500).json({ error: "Erro ao deletar usuário." });
    }
};

export const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
                role: true,
                isBlocked: true,
                photoUrl: true
            }
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
};

export const adminControl = async (req: any, res: any) => {
    const userIdToUpdate = req.params.id;
    const { newPassword, isBlocked, newRole } = req.body;

    const updates: any = {};

    try {
        if (newPassword) {
            const passwordHash = await bcrypt.hash(newPassword, saltRounds);
            updates.passwordHash = passwordHash;
        }

        if (isBlocked !== undefined) {
            updates.isBlocked = isBlocked;
        }

        if (newRole && (newRole === "USER" || newRole === "ADMIN")) {
            updates.role = newRole;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "Nenhuma ação válida fornecida." });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userIdToUpdate },
            data: updates,
            select: { id: true, name: true, email: true, isBlocked: true, role: true }
        });

        return res.status(200).json(updatedUser);
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Usuário não encontrado para atualização." });
        }

        return res.status(500).json({ error: "Erro interno ao atualizar usuário." });
    }
};
