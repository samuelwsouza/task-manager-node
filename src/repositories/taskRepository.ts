import { ITask } from "../interfaces/taskInterface";

export class TaskRepository {
  async create(taskData: {
    title: string;
    description: string;
    status: string;
  }): Promise<ITask> {
    // Simulação de uma operação de banco
    const newTask: ITask = {
      id: "1", // Gerar um ID único
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newTask;
  }
}
