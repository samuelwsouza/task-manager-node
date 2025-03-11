"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const authorizer_1 = require("../middlewares/authorizer");
const taskRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router.post("/tasks", authorizer_1.authorizer, (0, asyncHandler_1.asyncHandler)(controller.createTask));
    router.get("/tasks", authorizer_1.authorizer, (0, asyncHandler_1.asyncHandler)(controller.findAllTasks));
    router.get("/tasks/:id", authorizer_1.authorizer, (0, asyncHandler_1.asyncHandler)(controller.findTaskById));
    router.put("/tasks/:id", authorizer_1.authorizer, (0, asyncHandler_1.asyncHandler)(controller.updateTask));
    router.delete("/tasks/:id", authorizer_1.authorizer, (0, asyncHandler_1.asyncHandler)(controller.deleteTask));
    router.get("/tasks/status/:status", authorizer_1.authorizer, (0, asyncHandler_1.asyncHandler)(controller.findByStatus));
    router.patch("/tasks/:id/complete", authorizer_1.authorizer, (0, asyncHandler_1.asyncHandler)(controller.updateToComplete));
    return router;
};
exports.default = taskRoutes;
