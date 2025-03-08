import { ITaskService } from "../interfaces/service.interface";
import { ITask } from "../interfaces/task.interface";
import { TaskRepository } from "../repositories/taskRepository";

export class TaskService implements ITaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }
  create(taskData: {
    title: string;
    description: string;
    status?: string;
  }): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findAll(
    filters?: { status?: string; userId?: string },
    pagination?: { page: number; limit: number }
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string,
    taskData: { title?: string; description?: string; status?: string }
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async createTask(taskData: {
    title: string;
    description: string;
    status: string;
  }): Promise<ITask> {
    try {
      if (!taskData.title || !taskData.description) {
        throw new Error("Título/Descrição é obrigatório!");
      }

      const newTaskData = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || "pending",
      };

      const newTask = await this.taskRepository.create(newTaskData);

      return newTask;
    } catch (error) {
      throw new Error("Falha ao criar a tarefa");
    }
  }

  async findAllTasks(
    filters?: { status?: string; userId?: string },
    pagination?: { page: number; limit: number }
  ): Promise<ITask[]> {
    try {
      const allMyTasks = await this.taskRepository.findAll(filters, pagination);
      return allMyTasks;
    } catch (error) {
      throw new Error("Falha ao encontrar todas as suas tarefas...");
    }
  }

  async findTaskById(id: string): Promise<ITask | null> {
    try {
      const task = await this.taskRepository.findById(id);
      return task;
    } catch (error) {
      throw new Error("Falha ao encontrar sua específica tarefa...");
    }
  }

  async updateTask(
    id: string,
    taskData: { title?: string; description?: string; status?: string }
  ): Promise<ITask | null> {
    try {
      const updatedTask = await this.taskRepository.update(id, taskData);
      return updatedTask;
    } catch (error) {
      throw new Error("Falha ao atualizar sua tarefa...");
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const isDeleted = await this.taskRepository.delete(id);
      return isDeleted;
    } catch (error) {
      throw new Error("Falha ao deletar sua tarefa...");
    }
  }

  async findByStatus(status: string): Promise<ITask[]> {
    try {
      const tasks = await this.taskRepository.findByStatus(status);
      return tasks;
    } catch (error) {
      throw new Error("Failed to find tasks by status}");
    }
  }

  async updateToComplete(id: string): Promise<ITask> {
    try {
      const updatedTask = await this.taskRepository.update(id, {
        status: "completed",
      });
      return updatedTask;
    } catch (error) {
      throw new Error("Failed to update task to complete");
    }
  }
}
