import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const taskRoutes = (controller: TaskController) => {
  const router = Router();

  router.post("/tasks", controller.createTask);
  router.get("/tasks", controller.findAllTasks);
  router.get("/tasks/:id", controller.findTaskById);
  router.put("/tasks/:id", controller.updateTask);
  router.delete("/tasks/:id", controller.deleteTask);
  router.get("/tasks/status/:status", controller.findByStatus);
  router.patch("/tasks/:id/complete", controller.updateToComplete);

  return router;
};

export default taskRoutes;
