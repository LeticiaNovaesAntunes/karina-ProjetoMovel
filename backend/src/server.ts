import express from "express";
import cors from 'cors';

// ADICIONE ESTA LINHA:
import userRoutes from './Routes/UserRoutes'; 
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const app = express();

app.use(express.json());
app.use(cors());

// Agora 'userRoutes' existe e contém o objeto Router
app.use("/users", userRoutes); 

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});