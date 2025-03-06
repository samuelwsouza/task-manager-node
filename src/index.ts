import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import { TaskController } from "./controllers/taskController";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const taskController = new TaskController();

const router = taskRoutes(taskController);

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log("Servidor funcionando..."));
