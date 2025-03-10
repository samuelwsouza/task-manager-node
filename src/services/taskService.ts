import { ITaskService } from "../interfaces/service.interface";
import { ITask } from "../interfaces/task.interface";
import { TaskRepository } from "../repositories/taskRepository";

export class TaskService implements ITaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async create(taskData: {
    title: string;
    description: string;
    status?: "pending" | "completed" | "canceled";
    userId: string;
  }): Promise<ITask> {
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

      const newTask = await this.taskRepository.create(newTaskData);
      return newTask;
    } catch (error) {
      console.log("Erro ao criar a tarefa:", error);
      throw new Error("Falha ao criar a tarefa...");
    }
  }

  async findAll(
    filters?: {
      status?: "pending" | "completed" | "canceled";
      userId?: string;
    },
    pagination?: { page: number; limit: number }
  ): Promise<{ tasks: ITask[]; total: number }> {
    try {
      const { tasks, total } = await this.taskRepository.findAll(
        filters,
        pagination
      );
      return { tasks, total };
    } catch (error) {
      throw new Error("Falha ao listar todas as tarefas...");
    }
  }

  async findById(id: string): Promise<ITask | null> {
    try {
      const task = await this.taskRepository.findById(id);
      return task;
    } catch (error) {
      throw new Error("Falha ao encontrar sua específica tarefa...");
    }
  }

  async update(
    id: string,
    taskData: {
      title?: string;
      description?: string;
      status?: "pending" | "completed" | "canceled";
    }
  ): Promise<ITask | null> {
    try {
      const updatedTask = await this.taskRepository.update(id, taskData);
      return updatedTask;
    } catch (error) {
      throw new Error("Falha ao atualizar sua tarefa...");
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const isDeleted = await this.taskRepository.delete(id);
      return isDeleted;
    } catch (error) {
      throw new Error("Falha ao deletar sua tarefa...");
    }
  }

  async findByStatus(
    status: "pending" | "completed" | "canceled"
  ): Promise<ITask[]> {
    try {
      const tasks = await this.taskRepository.findByStatus(status);
      return tasks;
    } catch (error) {
      throw new Error("Falha ao encontrar suas tarefas...");
    }
  }

  async updateToComplete(id: string): Promise<ITask> {
    try {
      const updatedTask = await this.taskRepository.update(id, {
        status: "completed",
      });

      if (!updatedTask) {
        throw new Error("Task not found");
      }

      return updatedTask;
    } catch (error) {
      throw new Error("Falha ao atualizar sua tarefa para concluída...");
    }
  }
}
