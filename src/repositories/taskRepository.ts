import { ITaskRepository } from "../interfaces/tasks/repository.interface";
import { ITask } from "../interfaces/tasks/task.interface";
import { TaskModel } from "../models/taskModel";
import mongoose, { Types } from "mongoose";

export class TaskRepository implements ITaskRepository {
  async create(taskData: {
    title: string;
    description: string;
    status?: "pending" | "completed" | "canceled";
    userId: string;
  }): Promise<ITask> {
    const newTask = new TaskModel(taskData);
    const savedTask = await newTask.save();

    return {
      id: savedTask._id.toString(), // Convertendo _id para string
      title: savedTask.title,
      description: savedTask.description,
      status: savedTask.status,
      userId: savedTask.userId,
      createdAt: savedTask.createdAt,
      updatedAt: savedTask.updatedAt,
    };
  }

  async findAll(
    filters?: {
      status?: "pending" | "completed" | "canceled";
      userId?: string;
    },
    pagination?: { page: number; limit: number }
  ): Promise<{ tasks: ITask[]; total: number }> {
    const query: any = {};

    // Adiciona filtros somente se existirem
    if (filters?.status) query.status = filters.status;
    if (filters?.userId) query.userId = filters.userId;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    // Busca as tarefas e o total de tarefas filtradas
    const [tasks, total] = await Promise.all([
      TaskModel.find(query).skip(skip).limit(limit),
      TaskModel.countDocuments(query),
    ]);

    // Converte os _id para id
    const formattedTasks: ITask[] = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    return { tasks: formattedTasks, total };
  }

  async findById(id: string): Promise<ITask | null> {
    if (!Types.ObjectId.isValid(id)) return null; // Caso o ID for inválido

    const task = await TaskModel.findById(id);
    if (!task) return null;

    return {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async update(
    id: string,
    taskData: {
      title?: string;
      description?: string;
      status?: "pending" | "completed" | "canceled";
    }
  ): Promise<ITask | null> {
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

    return await TaskModel.findByIdAndUpdate(id, taskData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    /* Simulação de deletar
    return true;
    */
    const result = await TaskModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByStatus(
    userId: string,
    status: "pending" | "completed" | "canceled"
  ): Promise<ITask[]> {
    const tasks = await TaskModel.find({ userId, status });

    const formattedTasks: ITask[] = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    return formattedTasks;
  }

  async updateToComplete(id: string): Promise<ITask | null> {
    if (!Types.ObjectId.isValid(id)) return null;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true } // Retorna atualizado
    );

    if (!updatedTask) return null;

    return {
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      userId: updatedTask.userId,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    };
  }
}
