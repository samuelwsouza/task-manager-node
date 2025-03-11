"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router.post("/cadastro", controller.register);
    router.post("/login", controller.login);
    router.get("/users", controller.findAllUsers);
    router.get("/users/:id", controller.findUserById);
    router.put("/users/:id", controller.updateUser);
    router.delete("/users/:id", controller.deleteUser);
    return router;
};
exports.default = userRoutes;
