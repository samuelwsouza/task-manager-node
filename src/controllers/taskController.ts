import { Request, Response } from "express";

export class TaskController {
  constructor() {
    this.createTask = this.createTask.bind(this);
    this.findAllTasks = this.findAllTasks.bind(this);
    this.findTaskById = this.findTaskById.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.findByStatus = this.findByStatus.bind(this);
    this.updateToComplete = this.updateToComplete.bind(this);
  }

  async createTask(req: Request, res: Response): Promise<any> {
    // Lógica para criar uma tarefa
    res.status(201).json({ message: "Task created" });
  }

  async findAllTasks(req: Request, res: Response): Promise<any> {
    // Lógica para listar tarefas
    res.status(200).json({ message: "All tasks" });
  }

  async findTaskById(req: Request, res: Response): Promise<any> {
    // Lógica para buscar uma tarefa específica
    res.status(200).json({ message: "Task by id" });
  }

  async updateTask(req: Request, res: Response): Promise<any> {
    // Lógica para atualizar tarefa
    res.status(200).json({ message: "Task updated" });
  }

  async deleteTask(req: Request, res: Response): Promise<any> {
    // Lógica para deletar tarefa
    res.status(200).json({ message: "Task deleted" });
  }

  async findByStatus(req: Request, res: Response): Promise<any> {
    // Lógica para achar task por status como completed
    res.status(200).json({ message: "Tasks by status" });
  }

  async updateToComplete(req: Request, res: Response): Promise<any> {
    // Lógica para colocar tarefa como concluída
    res.status(200).json({ message: "Task completed" });
  }
}
