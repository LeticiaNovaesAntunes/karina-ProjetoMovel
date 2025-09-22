import express from "express";
import { userRoutes } from "./routes.js"; // mantenha o .js se usar ESM

const app = express();

app.use(express.json());

// liga as rotas
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});
