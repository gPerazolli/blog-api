# Blog API

Este projeto é uma API RESTful desenvolvida com Node.js e Express, utilizando MongoDB como banco de dados. A aplicação é containerizada com Docker para facilitar o desenvolvimento e a implementação.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração do Projeto](#configuração-do-projeto)
- [Executando a Aplicação](#executando-a-aplicação)
- [Testes](#testes)
- [Documentação](#Documentação)

## Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas em seu sistema:

- [Docker](https://www.docker.com/get-started) (versão 20.10 ou superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versão 1.27 ou superior)

## Configuração do Projeto

1. **Clone o repositório**

   Abra um terminal e execute o seguinte comando:

   ```bash
   git clone https://github.com/gPerazolli/blog-api
   cd blog-api

2. **Configuração do Ambiente**

   Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

   ```bash
    MONGO_URI=mongodb://usuario1:123456@mongo_db:27017/blog?authSource=admin
    JWT_SECRET=chaveSecreta1245Boa
   ````
     Observação: As credenciais do MongoDB e o segredo do JWT podem ser alterados conforme necessário.

## Executando a Aplicação

1. **Inicie os containers**

    No diretório raiz do projeto, execute:

    ```bash
       docker-compose up -d
    ```
    Este comando iniciará os containers do MongoDB e da API.

2. **Aguarde a Inicialização**

   Aguarde alguns instantes para garantir que todos os serviços estejam prontos. Você pode verificar os logs do container da aplicação para confirmar que a API está em execução:

     ```bash
     docker-compose logs app

3. **Acesse a API**

   A API estará disponível em http://localhost:3000.

  ## Testes

  Para executar os testes, use o seguinte comando:

    
    docker-compose exec app npm test

  Os testes serão executados dentro do container da aplicação.

  ## Documentação

  A documentação completa do projeto pode ser acessada [aqui](docs/Documentação-Técnica.pdf).
  


  



