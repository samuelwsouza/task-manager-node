import { ITaskRepository } from "../interfaces/repository.interface";
import { ITask } from "../interfaces/task.interface";

export class TaskRepository implements ITaskRepository {
  async create(taskData: {
    title: string;
    description: string;
    status: string;
    userId: string;
  }): Promise<ITask> {
    const newTask: ITask = {
      id: "1",
      title: taskData.title,
      description: taskData.description,
      status: taskData.status as "pending" | "completed" | "canceled",
      userId: taskData.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newTask;
  }

  async findAll(
    filters?: {
      status?: "pending" | "completed" | "canceled";
      userId?: string;
    },
    pagination?: { page: number; limit: number }
  ): Promise<ITask[]> {
    // Simulação de busca
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
  }

  async update(
    id: string,
    taskData: {
      title?: string;
      description?: string;
      status?: "pending" | "completed" | "canceled";
    }
  ): Promise<ITask | null> {
    // Simulação de atualização
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
  }

  async delete(id: string): Promise<boolean> {
    // Simulação de deletar
    return true;
  }

  async findByStatus(
    status: "pending" | "completed" | "canceled"
  ): Promise<ITask[]> {
    // Simulação de busca
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
}
