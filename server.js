//Importaciones
import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from './Routes/cancionesRoutes.js';
import 'dotenv/config';

//Creacion de instacia&puerto
const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRouter);

  

//Levantando Servidor 
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
