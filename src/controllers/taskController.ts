import { Request, Response, NextFunction } from "express";
import { ITaskController } from "../interfaces/taskController.interface";
import { ITaskService } from "../interfaces/service.interface";

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

      if (!title && !description) {
        return res
          .status(400)
          .json({ message: "Title and description are required" });
      }

      const newTask = await this.taskService.create({
        title,
        description,
        status,
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
      const { status, userId } = req.query;
      const { page = 1, limit = 10 } = req.query;

      const tasks = await this.taskService.findAll(
        { status: status as string, userId: userId as string },
        { page: Number(page), limit: Number(limit) }
      );

      return res.status(200).json(tasks);
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
      const task = await this.taskService.findById(id);
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
