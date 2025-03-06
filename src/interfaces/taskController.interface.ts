import { NextFunction } from "express";
import { ITaskService } from "../interfaces/service.interface";

export interface ITaskController {
  taskService: ITaskService;

  createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  findAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  findTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  findByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  updateToComplete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
