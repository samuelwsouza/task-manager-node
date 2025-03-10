import { NextFunction, Request, Response } from "express";
import { IUserController } from "../interfaces/users/userController.interface";
import { IUserService } from "../interfaces/users/service.interface";

export class UserController implements IUserController {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.findAllUsers = this.findAllUsers.bind(this);
    this.findUserById = this.findUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await this.userService.register(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login({ email, password });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async findAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { users, total } = await this.userService.findAll({
        page: Number(page),
        limit: Number(limit),
      });

      res.status(200).json({ users, total });
    } catch (error) {
      next(error);
    }
  }

  async findUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.userService.findById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updatedUser = await this.userService.update(id, {
        name,
        email,
        password,
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      await this.userService.delete(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}
