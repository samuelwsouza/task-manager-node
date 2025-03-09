import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { asyncHandler } from "../middlewares/asyncHandler";

const taskRoutes = (controller: TaskController) => {
  const router = Router();

  router.post("/tasks", asyncHandler(controller.createTask));
  router.get("/tasks", asyncHandler(controller.findAllTasks));
  router.get("/tasks/:id", asyncHandler(controller.findTaskById));
  router.put("/tasks/:id", asyncHandler(controller.updateTask));
  router.delete("/tasks/:id", asyncHandler(controller.deleteTask));
  router.get("/tasks/status/:status", asyncHandler(controller.findByStatus));
  router.patch(
    "/tasks/:id/complete",
    asyncHandler(controller.updateToComplete)
  );

  return router;
};

export default taskRoutes;
