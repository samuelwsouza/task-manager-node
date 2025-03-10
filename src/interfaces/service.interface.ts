import { Request, Response } from "express";

export interface ITaskService {
  // Cria uma nova tarefa
  create(taskData: {
    title: string;
    description: string;
    status?: string;
    userId: string;
  }): Promise<any>;

  // Lista todas as tarefas (com filtros e paginação)
  findAll(
    filters?: { status?: string; userId?: string },
    pagination?: { page: number; limit: number }
  ): Promise<any>;

  // Busca uma tarefa pelo ID
  findById(id: string): Promise<any>;

  // Atualiza uma tarefa
  update(
    id: string,
    taskData: { title?: string; description?: string; status?: string }
  ): Promise<any>;

  // Deleta uma tarefa
  delete(id: string): Promise<any>;

  // Busca tarefas por status
  findByStatus(status: string): Promise<any>;

  // Atualiza uma tarefa para "concluída"
  updateToComplete(id: string): Promise<any>;
}
