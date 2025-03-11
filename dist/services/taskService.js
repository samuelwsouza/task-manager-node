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
exports.TaskService = void 0;
const taskRepository_1 = require("../repositories/taskRepository");
class TaskService {
    constructor() {
        this.taskRepository = new taskRepository_1.TaskRepository();
    }
    create(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!taskData.title || !taskData.description || !taskData.userId) {
                    throw new Error("Title, description, and userId are required");
                }
                const newTaskData = {
                    title: taskData.title,
                    description: taskData.description,
                    status: taskData.status || "pending",
                    userId: taskData.userId,
                };
                const newTask = yield this.taskRepository.create(newTaskData);
                return newTask;
            }
            catch (error) {
                console.log("Erro ao criar a tarefa:", error);
                throw new Error("Falha ao criar a tarefa...");
            }
        });
    }
    findAll(filters, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tasks, total } = yield this.taskRepository.findAll(filters, pagination);
                return { tasks, total };
            }
            catch (error) {
                throw new Error("Falha ao listar todas as tarefas...");
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskRepository.findById(id);
                return task;
            }
            catch (error) {
                throw new Error("Falha ao encontrar sua específica tarefa...");
            }
        });
    }
    update(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield this.taskRepository.update(id, taskData);
                return updatedTask;
            }
            catch (error) {
                throw new Error("Falha ao atualizar sua tarefa...");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield this.taskRepository.delete(id);
                return isDeleted;
            }
            catch (error) {
                throw new Error("Falha ao deletar sua tarefa...");
            }
        });
    }
    findByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskRepository.findByStatus(status);
                return tasks;
            }
            catch (error) {
                throw new Error("Falha ao encontrar suas tarefas...");
            }
        });
    }
    updateToComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield this.taskRepository.update(id, {
                    status: "completed",
                });
                if (!updatedTask) {
                    throw new Error("Task not found");
                }
                return updatedTask;
            }
            catch (error) {
                throw new Error("Falha ao atualizar sua tarefa para concluída...");
            }
        });
    }
}
exports.TaskService = TaskService;
