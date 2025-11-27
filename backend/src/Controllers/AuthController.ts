import { PrismaClient } from "../generated/prisma/index";
import type { Request, Response } from "express";
import bcrypt from 'bcryptjs';
// Importe sua biblioteca de envio de e-mail (ex: nodemailer)
import nodemailer from 'nodemailer'; 

const prisma = new PrismaClient();

// Configuração do Nodemailer (EXEMPLO: USE SUAS CREDENCIAIS REAIS)
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'leticia.n.antunes@gmail.com',
        pass: 'nxyl ajfg hrup tdek'
    }
});

const generateToken = () => {
    // Gera um token de 4 dígitos
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendPasswordResetEmail = async (email: string, token: string) => {
    const mailOptions = {
        from: 'seu_email@gmail.com',
        to: email,
        subject: 'Código de Redefinição de Senha',
        html: `<p>Seu código de redefinição de senha é: <strong>${token}</strong>. Este código expira em 10 minutos.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        return false;
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        // Por segurança, retorna uma resposta genérica mesmo que o e-mail não exista
        return res.status(200).json({ message: "Se o e-mail estiver cadastrado, você receberá um token." });
    }

    const token = generateToken();
    const tokenExpiresAt = new Date(Date.now() + 10 * 60000); // 10 minutos

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: token,
                resetTokenExpires: tokenExpiresAt,
            }
        });

        const emailSent = await sendPasswordResetEmail(email, token);

        if (!emailSent) {
            // Em produção, você pode querer logar isso e retornar um erro 500
            return res.status(500).json({ error: "Erro ao enviar o e-mail de redefinição." });
        }

        res.status(200).json({ message: "Token de redefinição enviado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro interno ao processar a solicitação." });
    }
};

export const verifyTokenAndResetPassword = async (req: Request, res: Response) => {
    const { email, token, newPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.resetToken !== token || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
        return res.status(400).json({ error: "Token inválido ou expirado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash: hashedPassword,
                resetToken: null,
                resetTokenExpires: null, 
            }
        });

        res.status(200).json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao salvar a nova senha." });
    }
};