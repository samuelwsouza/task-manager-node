import { ITaskRepository } from "../interfaces/repository.interface";
import { ITask } from "../interfaces/task.interface";
<<<<<<< HEAD
import { TaskModel } from "../models/taskModel";
import mongoose, { Types } from "mongoose";
=======
>>>>>>> 975addfb94aee9d418e1e470b2dc1d64e7972293

export class TaskRepository implements ITaskRepository {
  async create(taskData: {
    title: string;
    description: string;
    status?: "pending" | "completed" | "canceled";
    userId: string;
  }): Promise<ITask> {
<<<<<<< HEAD
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
=======
    // Simulação de uma operação de banco de dados
    const newTask: ITask = {
      id: "1",
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || "pending",
      userId: taskData.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newTask;
>>>>>>> 975addfb94aee9d418e1e470b2dc1d64e7972293
  }

  async findAll(
    filters?: {
      status?: "pending" | "completed" | "canceled";
      userId?: string;
    },
    pagination?: { page: number; limit: number }
<<<<<<< HEAD
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
=======
  ): Promise<ITask[]> {
    // Simulação de busca no banco de dados
    const tasks: ITask[] = [
      {
        id: "1",
        title: "Task 1",
        description: "Description 1",
        status: "pending",
        userId: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Task 2",
        description: "Description 2",
        status: "completed",
        userId: "user2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return tasks;
  }

  async findById(id: string): Promise<ITask | null> {
    // Simulação de busca no banco de dados
    const task: ITask = {
      id,
      title: "Sample Task",
      description: "This is a sample task",
      status: "pending",
      userId: "user1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return task;
>>>>>>> 975addfb94aee9d418e1e470b2dc1d64e7972293
  }

  async update(
    id: string,
    taskData: {
      title?: string;
      description?: string;
      status?: "pending" | "completed" | "canceled";
    }
  ): Promise<ITask | null> {
<<<<<<< HEAD
    /* Simulação de atualização no banco de dados
=======
    // Simulação de atualização no banco de dados
>>>>>>> 975addfb94aee9d418e1e470b2dc1d64e7972293
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
<<<<<<< HEAD
    */

    return await TaskModel.findByIdAndUpdate(id, taskData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    /* Simulação de deletar
    return true;
    */
    const result = await TaskModel.findByIdAndDelete(id);
    return !!result;
=======
  }

  async delete(id: string): Promise<boolean> {
    // Simulação de deletar
    return true;
>>>>>>> 975addfb94aee9d418e1e470b2dc1d64e7972293
  }

  async findByStatus(
    status: "pending" | "completed" | "canceled"
  ): Promise<ITask[]> {
    // Simulação de busca no banco de dados
    const tasks: ITask[] = [
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
  }
<<<<<<< HEAD

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
=======
>>>>>>> 975addfb94aee9d418e1e470b2dc1d64e7972293
}
