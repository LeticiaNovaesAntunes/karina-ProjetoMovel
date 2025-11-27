import express from "express";
import cors from "cors";
import userRoutes from "./Routes/UserRoutes";
import classRoutes from './Routes/ClassRoutes';
import authRoutes from './Routes/AuthRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes); 
app.use("/classes", classRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});