import { Request, Response, NextFunction } from "express";
import { IUserService } from "./service.interface";

export interface IUserController {
  userService: IUserService;

  register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  findAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  findUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
