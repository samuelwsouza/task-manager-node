import { ITask } from "./task.interface";

export interface ITaskRepository {
  // Cria uma nova tarefa no banco de dados
  create(taskData: {
    title: string;
    description: string;
    status?: "pending" | "completed" | "canceled";
    userId: string;
  }): Promise<ITask>;

  // Busca uma tarefa pelo ID
  findById(id: string): Promise<ITask | null>;

  // Busca todas as tarefas (com filtros e paginação)
  findAll(
    filters?: {
      status?: "pending" | "completed" | "canceled";
      userId?: string;
    },
    pagination?: { page: number; limit: number }
  ): Promise<{ tasks: ITask[]; total: number }>;

  // Atualiza uma tarefa existente
  update(
    id: string,
    taskData: {
      title?: string;
      description?: string;
      status?: "pending" | "completed" | "canceled";
    }
  ): Promise<ITask | null>;

  // Deleta uma tarefa
  delete(id: string): Promise<boolean>;

  // Busca tarefas por status
  findByStatus(
    userId: string,
    status: "pending" | "completed" | "canceled"
  ): Promise<ITask[]>;

  // Atualiza uma tarefa para "concluída"
  updateToComplete(id: string): Promise<any>;
}
