"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.createTask = this.createTask.bind(this);
        this.findAllTasks = this.findAllTasks.bind(this);
        this.findTaskById = this.findTaskById.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.findByStatus = this.findByStatus.bind(this);
        this.updateToComplete = this.updateToComplete.bind(this);
    }
    createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, status, userId } = req.body;
                const newTask = yield this.taskService.create({
                    title,
                    description,
                    status,
                    userId,
                });
                return res.status(201).json(newTask);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findAllTasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, userId } = req.query;
                const { page = 1, limit = 10 } = req.query;
                const { tasks, total } = yield this.taskService.findAll({ status: status, userId: userId }, { page: Number(page), limit: Number(limit) });
                return res.status(200).json({ tasks, total });
            }
            catch (error) {
                next(error);
            }
        });
    }
    findTaskById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const task = yield this.taskService.findById(id);
                return res.status(200).json(task);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, status } = req.body;
                const updatedTask = yield this.taskService.update(id, {
                    title,
                    description,
                    status,
                });
                return res.status(200).json(updatedTask);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.taskService.delete(id);
                return res.status(200).json({ message: "Task deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    findByStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.params;
                const tasks = yield this.taskService.findByStatus(status);
                return res.status(200).json(tasks);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateToComplete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedTask = yield this.taskService.updateToComplete(id);
                return res.status(200).json(updatedTask);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TaskController = TaskController;
