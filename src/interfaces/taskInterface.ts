export interface ITask {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "canceled";
  userId: string; // ID do usuário associado à tarefa
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}
