import express, { urlencoded } from "express";
import { userRoutes } from "./Routes/UserRoutes.js"; 

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(urlencoded({ extended: true }));
app.use(express.json());


// liga as rotas
app.use("/users", userRoutes);


app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});
