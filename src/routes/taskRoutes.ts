import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const taskRoutes = (controller: TaskController) => {
  const router = Router();

  router.post("/tasks", controller.createTask.bind(controller));
  router.get("/tasks", controller.findAllTasks.bind(controller));
  router.get("/tasks/:id", controller.findTaskById.bind(controller));
  router.put("/tasks/:id", controller.updateTask.bind(controller));
  router.delete("/tasks/:id", controller.deleteTask.bind(controller));
  router.get("/tasks/status/:status", controller.findByStatus.bind(controller));
  router.patch(
    "/tasks/:id/complete",
    controller.updateToComplete.bind(controller)
  );

  return router;
};

export default taskRoutes;
