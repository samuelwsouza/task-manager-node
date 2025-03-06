import { NextFunction, Request, Response } from "express";
import { ITaskService } from "../interfaces/service.interface";
class TaskController {
  private taskService: ITaskService;

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
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { title, description, status } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "A tarefa precisa ter um título/descrição!" });
      }

      const newTask = await this.taskService.create({
        title,
        description,
        status,
      });

      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }

  async findAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
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
  ): Promise<any> {
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
  ): Promise<any> {
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
  ): Promise<any> {
    try {
      const { id } = req.params;

      await this.taskService.delete(id);

      return res.status(200).json({ message: "Tarefa excluída com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  async findByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
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
  ): Promise<Response | void> {
    try {
      const { id } = req.params;

      const updatedTask = await this.taskService.updateToComplete(id);

      return res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }
}

export default TaskController;
