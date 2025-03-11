import { Request, Response, NextFunction } from "express";
import { ITaskController } from "../interfaces/tasks/taskController.interface";
import { ITaskService } from "../interfaces/tasks/service.interface";

export class TaskController implements ITaskController {
  taskService: ITaskService;

  constructor(taskService: ITaskService) {
    this.taskService = taskService;

    this.createTask = this.createTask.bind(this);
    this.findAllTasks = this.findAllTasks.bind(this);
    this.findTaskById = this.findTaskById.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.findByStatus = this.findByStatus.bind(this);
    this.updateToComplete = this.updateToComplete.bind(this);
  }

  async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { title, description, status } = req.body;

      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }

      const newTask = await this.taskService.create({
        title,
        description,
        status,
        userId,
      });
      return res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }

  async findAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { status } = req.query;
      const { page = 1, limit = 10 } = req.query;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }

      const { tasks, total } = await this.taskService.findAll(
        { status: status as string, userId },
        { page: Number(page), limit: Number(limit) }
      );

      return res.status(200).json({ tasks, total });
    } catch (error) {
      next(error);
    }
  }

  async findTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }

      const task = await this.taskService.findById(id);

      if (task.userId !== userId) {
        return res.status(403).json({
          message: "Acesso negado! Tarefa não pertence a este usuário!",
        });
      }

      return res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      const updatedTask = await this.taskService.update(id, {
        title,
        description,
        status,
      });
      return res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      await this.taskService.delete(id);
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async findByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { status } = req.params;
      const tasks = await this.taskService.findByStatus(status);
      return res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async updateToComplete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const updatedTask = await this.taskService.updateToComplete(id);
      return res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }
}
