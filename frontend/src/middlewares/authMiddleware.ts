import * as jwt from 'jsonwebtoken';
// Importe Request e Response se estiver usando TypeScript/Express types
// import { Request, Response, NextFunction } from 'express'; 

// ⚠️ Use a mesma chave secreta que você usou no loginUser!
const JWT_SECRET = 'sua_chave_secreta_muito_forte'; 

export const authenticateToken = (req, res, next) => {
    // 1. Obter o token do cabeçalho
    const authHeader = req.headers.authorization;
    // O token geralmente vem no formato: "Bearer [token]"
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {
        // 401 Unauthorized: Nenhum token fornecido
        return res.status(401).json({ error: "Acesso negado. Token não fornecido." }); 
    }

    // 2. Verificar o token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // 403 Forbidden: Token inválido ou expirado
            return res.status(403).json({ error: "Token inválido ou expirado." });
        }
        
        // 3. O token é válido: Anexar os dados do usuário à requisição
        req.user = user; // user aqui contém { userId, userRole }
        next(); // Continuar para o próximo manipulador de rota
    });
};