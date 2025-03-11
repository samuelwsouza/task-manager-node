import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authorizer } from "../middlewares/authorizer";

const taskRoutes = (controller: TaskController) => {
  const router = Router();

  router.post("/tasks", authorizer, asyncHandler(controller.createTask));
  router.get("/tasks", authorizer, asyncHandler(controller.findAllTasks));
  router.get("/tasks/:id", authorizer, asyncHandler(controller.findTaskById));
  router.put("/tasks/:id", authorizer, asyncHandler(controller.updateTask));
  router.delete("/tasks/:id", authorizer, asyncHandler(controller.deleteTask));
  router.get(
    "/tasks/status/:status",
    authorizer,
    asyncHandler(controller.findByStatus)
  );
  router.patch(
    "/tasks/:id/complete",
    authorizer,
    asyncHandler(controller.updateToComplete)
  );

  return router;
};

export default taskRoutes;
