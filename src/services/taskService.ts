import { ITask } from "../interfaces/taskInterface";
import { TaskRepository } from "../repositories/taskRepository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(taskData: {
    title: string;
    description: string;
    status: string;
  }): Promise<ITask> {
    try {
      if (!taskData.title || !taskData.description) {
        throw new Error("Título/Descrição é obrigatório!");
      }

      const newTaskData = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || "pending",
      };

      const newTask = await this.taskRepository.create(newTaskData);

      return newTask;
    } catch (error) {
      throw new Error("Falha ao criar a tarefa");
    }
  }

  async findAllTasks(req: Request, res: Response): Promise<any> {
    // Lógica para listar tarefas
  }

  async findTaskById(req: Request, res: Response): Promise<any> {
    // Lógica para buscar uma tarefa específica
  }

  async updateTask(req: Request, res: Response): Promise<any> {
    // Lógica para atualizar tarefa
  }

  async deleteTask(req: Request, res: Response): Promise<any> {
    // Lógica para deletar tarefa
  }

  async findByStatus(req: Request, res: Response): Promise<any> {
    // Lógica para achar task por status como completed
  }

  async updateToComplete(req: Request, res: Response): Promise<any> {
    // Lógica para colocar tarefa como concluída
  }
}
