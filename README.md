# Task Manager API

- Este é um sistema de gerenciamento de tarefas (Task Manager) desenvolvido em Node.js com TypeScript. Ele permite criar, listar, atualizar e deletar tarefas, além de associá-las a usuários e definir status como "pendente", "concluída" ou "cancelada".

## 📋 Funcionalidades

### CRUD de Tarefas:

- Criar, listar, editar e deletar tarefas.

### Associação de Tarefas a Usuários:

- Cada tarefa pertence a um usuário (relacionamento 1:N).

### Status das Tarefas:

- As tarefas podem ter os status: pending, completed ou canceled.

### Filtragem e Paginação:

- Listar tarefas com filtros (status, usuário) e paginação.

### Autenticação:

Futuramente, será implementada autenticação com JWT e refresh tokens.

## 🛠️ Estrutura do Projeto

### O projeto segue uma arquitetura modular, com separação de responsabilidades entre Controller, Service e Repository.

## 📂 Estrutura de Pastas

src/
├── controllers/ # Controladores (lidam com requisições HTTP)
│ └── taskController.ts
├── interfaces/ # Interfaces (tipagens)
│ ├── controller.interface.ts
│ ├── repository.interface.ts
│ ├── service.interface.ts
│ └── task.interface.ts
├── repositories/ # Repositórios (interagem com o banco de dados)
│ └── taskRepository.ts
├── routes/ # Rotas (configuração das rotas da API)
│ └── taskRoutes.ts
├── services/ # Serviços (lógica de negócio)
│ └── taskService.ts
└── index.ts # Ponto de entrada da aplicação

## 📝 Como Funciona

### 1. Controller

- Responsável por lidar com as requisições HTTP (req, res, next). Ele chama os métodos do Service para executar a lógica de negócio.

### Exemplo de Método no Controller:

```js
async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, description, status } = req.body;
    const newTask = await this.taskService.createTask({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}
```

### 2. Service

- Contém a lógica de negócio e interage com o Repository para acessar o banco de dados.

### Exemplo de Método no Service:

```js
async createTask(taskData: { title: string; description: string; status?: string }): Promise<ITask> {
  try {
    if (!taskData.title || !taskData.description) {
      throw new Error("Title and description are required");
    }
    const newTask = await this.taskRepository.create(taskData);
    return newTask;
  } catch (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
}
```

### 3. Repository

- Responsável por interagir diretamente com o banco de dados. Ele implementa operações como criar, ler, atualizar e deletar tarefas.

### Exemplo de Método no Repository:

```js
async create(taskData: { title: string; description: string; status: string; userId: string }): Promise<ITask> {
  const newTask: ITask = {
    id: "1", // Gerar um ID único (ex: UUID)
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
    userId: taskData.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newTask;
}
```

### 4. Rotas

- Configura as rotas da API e associa cada rota a um método do Controller.

### Exemplo de Configuração de Rotas:

```js
const taskRoutes = (controller: TaskController) => {
  const router = Router();

  router.post("/tasks", controller.createTask.bind(controller));
  router.get("/tasks", controller.findAllTasks.bind(controller));
  router.get("/tasks/:id", controller.findTaskById.bind(controller));
  router.put("/tasks/:id", controller.updateTask.bind(controller));
  router.delete("/tasks/:id", controller.deleteTask.bind(controller));
  router.get("/tasks/status/:status", controller.findByStatus.bind(controller));
  router.patch(
    "/tasks/:id/complete",
    controller.updateToComplete.bind(controller)
  );

  return router;
};
```

## 🚀 Como Executar o Projeto

###Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- TypeScript instalado globalmente (npm install -g typescript)

### Passos

```
git clone https://github.com/seu-usuario/task-manager-api.git
cd task-manager-api
```

```
npm install
```

```
tsc
```

```
npm start
```

- Acesse a API:

- O servidor estará rodando em http://localhost:1999.

Use ferramentas como Postman ou Insomnia para testar as rotas.

## 📚 Lições Aprendidas Hoje

### Separação de Responsabilidades:

- Dividimos o código em Controller, Service e Repository para manter o projeto organizado e modular.

### Injeção de Dependência:

- O TaskController recebe uma instância de TaskService, e o TaskService recebe uma instância de TaskRepository. Isso facilita testes e manutenção.

### Uso de Interfaces:

- Criamos interfaces como ITask, ITaskService, ITaskRepository e ITaskController para garantir tipagem consistente.

### Rotas com Router do Express:

- Configuramos as rotas em um arquivo separado (taskRoutes.ts) e usamos bind para garantir o contexto correto nos métodos do controller.

### Tratamento de Erros:

- Usamos try-catch nos controllers e services para capturar erros e passar para o middleware de erro do Express.

### Validações:

- Adicionamos validações básicas nos services, como verificar se title e description estão presentes ao criar uma tarefa.

### Simulação de Banco de Dados:

- No TaskRepository, simulamos operações de banco de dados enquanto não conectamos a um banco real.

## 📄 Exemplo de Requisições

### Criar uma Tarefa

- Método: POST

- URL: /api/tasks

#### Body:

```json
{
  "title": "Fazer compras",
  "description": "Comprar itens essenciais no mercado",
  "status": "pending",
  "userId": "user123"
}
```

### Listar Todas as Tarefas

- Método: GET

- URL: /api/tasks

### Buscar Tarefa por ID

- Método: GET

- URL: /api/tasks/1

### Atualizar uma Tarefa

- Método: PUT

- URL: /api/tasks/1

#### Body:

```json
{
  "title": "Fazer compras atualizado",
  "status": "completed"
}
```

### Deletar uma Tarefa

- Método: DELETE

- URL: /api/tasks/1

## 📌 Próximos Passos

### Conectar ao Banco de Dados:

- Usar Prisma ou TypeORM para interagir com um banco de dados real.

### Implementar Autenticação:

- Adicionar autenticação com JWT e refresh tokens.

### Adicionar Testes:

- Escrever testes unitários e de integração com Jest.

### Documentar a API:

- Usar Swagger para gerar documentação automática da API.

## 🤝 Contribuição

### Contribuições são bem-vindas! Siga os passos abaixo:

- Faça um fork do projeto.

- Crie uma branch para sua feature (git checkout -b feature/nova-feature).

- Commit suas mudanças (git commit -m 'Adiciona nova feature').

- Push para a branch (git push origin feature/nova-feature).

- Abra um Pull Request.

## 📜 Licença

- Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

- Espero que este README ajude a consolidar tudo o que aprendemos hoje! Se precisar de mais alguma coisa, estou à disposição. 😊
