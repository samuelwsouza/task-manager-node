import { ITask } from "./task.interface";

export interface ITaskRepository {
  // Cria uma nova tarefa no banco de dados
  create(taskData: {
    title: string;
    description: string;
    status: string;
  }): Promise<ITask>;

  // Busca uma tarefa pelo ID
  findById(id: string): Promise<ITask | null>;

  // Busca todas as tarefas (com filtros e paginação)
  findAll(
    filters?: { status?: string; userId?: string },
    pagination?: { page: number; limit: number }
  ): Promise<ITask[]>;

  // Atualiza uma tarefa existente
  update(
    id: string,
    taskData: { title?: string; description?: string; status?: string }
  ): Promise<ITask | null>;

  // Deleta uma tarefa
  delete(id: string): Promise<boolean>;

  // Busca tarefas por status
  findByStatus(status: string): Promise<ITask[]>;
}
