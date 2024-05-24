## API REST de Tarefas com Node.js e Docker

Este projeto implementa uma API REST simples para gerenciar uma lista de tarefas utilizando Node.js, Express e Docker. A API permite listar, adicionar, atualizar e excluir tarefas.

## Funcionalidades

* Listar todas as tarefas
* Adicionar uma nova tarefa
* Atualizar uma tarefa
* Excluir uma tarefa


## Pré-requisitos

* Node.js instalado
* Docker instalado

## Instalação de Dependêcias

```bash
cd api-lista-tarefas
npm install
```

## Sobre o arquivo .env na raiz do projeto
Mesmo sendo **não sendo recomendado ter o arquivo no repostório**, acabei optando por deixa-lo, para que haja uma conexão a um banco já populado com alguns registros. Sinta-se a vontade para manipulá-los.


## Executando o servidor
É possível executá-lo de duas maneiras:

**Nodemon**

    npm run dev

**Docker**

    docker-compose build
    docker-compose run

## Endpoints

* GET /tasks         - Lista todas as tarefas
* POST /tasks        - Adiciona uma nova tarefa
* PUT /tasks/:id     - Atualiza o status de uma tarefa
* DELETE /tasks/:id  - Exclui uma tarefa


## Documentação

A documentação da API é gerada automaticamente usando Swagger quando o servidor estiver rodando, e pode ser acessada pela URL:

```plaintext
http://localhost:3000/doc
```

## FAQ

### O que é Nodemon e por que usá-lo?

Nodemon é uma ferramenta que reinicia automaticamente o servidor Node.js sempre que arquivos do projeto são modificados. Isso agiliza o desenvolvimento, eliminando a necessidade de reiniciar manualmente o servidor após cada alteração no código.

### Por que usar Docker Compose?

Docker Compose simplifica a orquestração de múltiplos contêineres, permitindo configurar e iniciar facilmente todos os serviços necessários para a aplicação. Isso garante ambientes consistentes e facilita a comunicação entre contêineres.

### O que é Swagger e por que usá-lo?

Swagger é uma ferramenta de código aberto que permite documentar, desenvolver, testar e visualizar APIs de forma fácil e eficiente. Ao usar o Swagger para documentar sua API, você fornece uma interface interativa onde os desenvolvedores podem explorar endpoints, parâmetros e respostas da API de forma intuitiva. Isso facilita a compreensão e o uso da API, além de melhorar a comunicação entre equipes de desenvolvimento.


### Como a documentação é gerada?
Utilizando as bibliotecas `swagger-autogen` e `swagger-ui-express` é possível fazer o mapeamento dos paths registrados na API. Esse mapeamento é feito pelo algorítimo `.docs/swagger.js`, executado pelo comando `npm run swagger` que, por sua vez, é roda toda vez que o servidor é iniciado, seja pelo Docker ou pelo Nodemon.
