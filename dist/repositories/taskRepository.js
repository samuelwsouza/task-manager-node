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
exports.TaskRepository = void 0;
const taskModel_1 = require("../models/taskModel");
const mongoose_1 = require("mongoose");
class TaskRepository {
    create(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = new taskModel_1.TaskModel(taskData);
            const savedTask = yield newTask.save();
            return {
                id: savedTask._id.toString(), // Convertendo _id para string
                title: savedTask.title,
                description: savedTask.description,
                status: savedTask.status,
                userId: savedTask.userId,
                createdAt: savedTask.createdAt,
                updatedAt: savedTask.updatedAt,
            };
        });
    }
    findAll(filters, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            // Adiciona filtros somente se existirem
            if (filters === null || filters === void 0 ? void 0 : filters.status)
                query.status = filters.status;
            if (filters === null || filters === void 0 ? void 0 : filters.userId)
                query.userId = filters.userId;
            const page = (pagination === null || pagination === void 0 ? void 0 : pagination.page) || 1;
            const limit = (pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10;
            const skip = (page - 1) * limit;
            // Busca as tarefas e o total de tarefas filtradas
            const [tasks, total] = yield Promise.all([
                taskModel_1.TaskModel.find(query).skip(skip).limit(limit),
                taskModel_1.TaskModel.countDocuments(query),
            ]);
            // Converte os _id para id
            const formattedTasks = tasks.map((task) => ({
                id: task._id.toString(),
                title: task.title,
                description: task.description,
                status: task.status,
                userId: task.userId,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
            }));
            return { tasks: formattedTasks, total };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return null; // Caso o ID for inválido
            const task = yield taskModel_1.TaskModel.findById(id);
            if (!task)
                return null;
            return {
                id: task._id.toString(),
                title: task.title,
                description: task.description,
                status: task.status,
                userId: task.userId,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
            };
        });
    }
    update(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            /* Simulação de atualização no banco de dados
            const updatedTask: ITask = {
              id,
              title: taskData.title || "Updated Task",
              description: taskData.description || "Updated Description",
              status: taskData.status || "pending",
              userId: "user1",
              createdAt: new Date(),
              updatedAt: new Date(),
            };
        
            return updatedTask;
            */
            return yield taskModel_1.TaskModel.findByIdAndUpdate(id, taskData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /* Simulação de deletar
            return true;
            */
            const result = yield taskModel_1.TaskModel.findByIdAndDelete(id);
            return !!result;
        });
    }
    findByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulação de busca no banco de dados
            const tasks = [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Description 1",
                    status,
                    userId: "user1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];
            return tasks;
        });
    }
    updateToComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return null;
            const updatedTask = yield taskModel_1.TaskModel.findByIdAndUpdate(id, { status: "completed" }, { new: true } // Retorna atualizado
            );
            if (!updatedTask)
                return null;
            return {
                id: updatedTask._id.toString(),
                title: updatedTask.title,
                description: updatedTask.description,
                status: updatedTask.status,
                userId: updatedTask.userId,
                createdAt: updatedTask.createdAt,
                updatedAt: updatedTask.updatedAt,
            };
        });
    }
}
exports.TaskRepository = TaskRepository;
