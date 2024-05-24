## API REST de Tarefas com Node.js e Docker

Este projeto implementa uma API REST simples para gerenciar uma lista de tarefas utilizando Node.js, Express e Docker. A API permite listar, adicionar, atualizar e excluir tarefas.

## Funcionalidades

* Listar todas as tarefas
* Adicionar uma nova tarefa
* Atualizar o status de uma tarefa (concluída ou não concluída)
* Excluir uma tarefa


## Pré-requisitos

* Node.js instalado
* Docker instalado
* Banco de dados MongoDB
## Instalação

1. Instale as Dependências

```bash
npm install
```

2. Crie um arquivo .env na raiz do projeto
Defina a variável de ambiente MONGODB_URI com a sua string de conexão do MongoDB
```bash
PORT = 3000
MONGODB_URI=<sua_conexao_mongodb>
```

3. Execute o servidor
```bash
docker-compose up -d
```
## Docker

Este projeto utiliza Docker para containerizar a aplicação. Você pode construir a imagem e executar o contêiner usando os seguintes comandos:

```bash
docker build -t api-lista-tarefas .
docker run -d -p 3000:3000 api-lista-tarefas
```

##Endpoints

* GET /tasks: Lista todas as tarefas
* POST /tasks: Adiciona uma nova tarefa
* PUT /tasks/:id: Atualiza o status de uma tarefa
* DELETE /tasks/:id: Exclui uma tarefa