import express from "express";
import cors from 'cors';
import { userRoutes } from "./Routes/UserRoutes.js"; 


const app = express();

app.use(express.json());
app.use(cors());


app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});
