import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import { TaskController } from "./controllers/taskController";
import { TaskService } from "./services/taskService";
import { connectDB } from "./database/mongoConnection";
import userRoutes from "./routes/userRoutes";
import { UserController } from "./controllers/userController";
import { UserService } from "./services/userService";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1999;

connectDB();

const userService = new UserService();
const userController = new UserController(userService);

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const userRouter = userRoutes(userController);
const taskRouter = taskRoutes(taskController);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () =>
  console.log(`Servidor funcionando na porta ${PORT} ...`)
);
