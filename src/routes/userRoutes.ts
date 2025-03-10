import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRoutes = (controller: UserController) => {
  const router = Router();

  router.post("/cadastro", controller.register);
  router.post("/login", controller.login);
  router.get("/users", controller.findAllUsers);
  router.get("/users/:id", controller.findUserById);
  router.put("/users/:id", controller.updateUser);
  router.delete("/users/:id", controller.deleteUser);

  return router;
};

export default userRoutes;
