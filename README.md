usar melhor as interfaces, vi que você criou as interfaces, mas não implementou elas nem no repository, service ou controller. As interfaces ao serem implementadas em uma classe como class TaskService, essa classe se tornaria do tipo ITaskService:

exemplo de uso:

class TaskService implements ITaskService - aqui isso é uma classe do tipo ITaskService
class TaskService - aqui isso é uma classe do tipo TaskService ( porém o crontoller ele tem o taskService do tipo ITaskService, e não do TaskService

foi um detalhe apenas feito no create do controller:

const { title, description, status } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "A tarefa precisa ter um título/descrição!" });
      }

nesse codigo acima você está fazendo um if para validação, ele é até certo, porém validações de regras de negocio não vão em controllers, isso deveria está no service. Não sei se você quis dizer que a task precisa tanto de title como description, se foi, era pra ser usado um &&, mas se não foi, ok.
