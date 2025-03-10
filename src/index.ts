import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import { TaskController } from "./controllers/taskController";
import { TaskService } from "./services/taskService";
import { connectDB } from "./database/mongoConnection";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1999;

connectDB();

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const router = taskRoutes(taskController);

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () =>
  console.log(`Servidor funcionando na porta ${PORT} ...`)
);
