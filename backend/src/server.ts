import express from "express";
import cors from 'cors';

// ADICIONE ESTA LINHA:
import userRoutes from './Routes/UserRoutes'; 
import classRoutes from './Routes/ClassRoutes'

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const app = express();

// 💡 CORREÇÃO: Aumente o limite do corpo JSON para 50MB
app.use(express.json({ limit: '50mb' })); 

// 💡 Opcional: Aumente o limite para dados de formulário (se você usá-los)
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

// Agora 'userRoutes' existe e contém o objeto Router
app.use("/users", userRoutes); 
app.use("/classes", classRoutes)

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});