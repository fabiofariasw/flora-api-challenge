# Back Flora Challenge

## Descrição

Este é um projeto de backend desenvolvido como parte do desafio Flora. Ele utiliza o framework NestJS e outras tecnologias modernas para fornecer uma API robusta e escalável.

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework:** NestJS
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Token)
- **Validação:** Zod
- **Testes:** Vitest
- **Documentação:** Swagger
- **Outras:** Axios, bcryptjs, RxJS

## Instalação e Uso

### Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- Docker

### Usando Docker

1. Inicie os serviços do Docker:
  ```sh
    docker-compose up -d
  ```

### Passos para Instalação

1. Clone o repositório:
  ```sh
   git clone https://github.com/seu-usuario/back-flora-challenge.git
   cd back-flora-challenge

  ```
2. Instale as dependências:
  ```sh
    npm install
  ```
3. Execute as migrações do Prisma para configurar o banco de dados:
  ```sh
    npx prisma migrate dev
  ```
4. Popule o banco de dados com dados iniciais:
  ```sh
    npm run prisma:seed
  ```
5. Inicie o servidor de desenvolvimento:
  ```sh
    npm run start:dev
  ```

### Executando Testes

Para executar os testes, utilize o comando:
```sh
  npm run test
```