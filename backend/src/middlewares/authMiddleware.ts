import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define uma interface para estender o objeto Request do Express, adicionando 'user'
// Isso é necessário para que TypeScript entenda que 'req.user' existe após o middleware
interface CustomRequest extends Request {
    user?: {
        userId: string;
        userRole: string;
    };
}

// Chave Secreta para verificar o token JWT.
// ⚠️ ATENÇÃO: Use uma variável de ambiente (process.env.JWT_SECRET) em produção!
const JWT_SECRET = 'sua_chave_secreta_muito_forte';

/**
 * Middleware para autenticar o token JWT presente no cabeçalho 'Authorization'.
 * Anexa as informações do usuário (userId e userRole) ao objeto de requisição (req.user).
 */
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    // 1. Obter o cabeçalho de autorização
    const authHeader = req.headers['authorization'];

    // 2. Extrair o token (Bearer <token>)
    // Se o cabeçalho não existir ou não começar com 'Bearer ', rejeita.
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
    }

    // 3. Verificar e decodificar o token
    try {
        // Assume-se que o token foi assinado com o mesmo formato usado em UserController.ts
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, userRole: string };
        
        // 4. Anexar os dados do usuário à requisição (req.user)
        req.user = decoded;
        
        // 5. Prosseguir para a próxima função/middleware
        next();

    } catch (error) {
        // Se a verificação falhar (token inválido, expirado, etc.)
        console.error("Erro na verificação do Token:", error);
        return res.status(403).json({ error: "Token inválido ou expirado." });
    }
};

export const isAdmin = (req: any, res: any, next: any) => {
    // A propriedade req.user foi anexada pela middleware authenticateToken
    // Se a autenticação não foi rodada antes, isso falhará, mas assumimos que foi.

    if (req.user && req.user.userRole === 'ADMIN') {
        // O usuário é Admin, permite continuar
        next();
    } else {
        // 403 Forbidden: Usuário não tem permissão de administrador
        return res.status(403).json({ error: 'Acesso negado. Requer permissão de Administrador.' });
    }
};