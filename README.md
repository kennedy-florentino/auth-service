# NodeJS Express Auth Service

![Badge](https://img.shields.io/badge/Language-Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Badge](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Badge](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Badge](https://img.shields.io/badge/Testing-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Badge](https://img.shields.io/badge/Containerization-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Descrição

Este é um serviço de autenticação e autorização desenvolvido como parte do meu portfólio. Ele fornece endpoints para registro de usuários, login e renovação de tokens de autenticação.

## Tecnologias

As seguintes tecnologias foram utilizadas na construção do projeto:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [Class Validator](https://github.com/typestack/class-validator)
- [TypeORM](https://typeorm.io/)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Funcionalidades

- [x] Cadastro de usuário (SignUp)
- [x] Login de usuário (SignIn)
- [x] Renovação de token (Refresh Token)

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [GIT](https://git-scm.com/downloads)
- [Postman](https://www.postman.com/)
- [Docker](https://docs.docker.com/get-docker/) ou [Node.js](https://nodejs.org/en/) versão 16 e [PostgreSQL](https://www.postgresql.org/)

## Instalação

### Docker

```bash
# Clone este repositório
$ git clone https://github.com/kennedy-florentino/nodejs-express-auth-service.git

# Acesse a pasta do projeto no terminal
$ cd nodejs-express-auth-service

# Construa a imagem do Docker
$ docker build --tag nodejs-express-auth-service --file Dockerfile .

# Copie o arquivo de exemplo de variáveis de ambiente
$ cp .env.docker .env

# Inicie o contêiner Docker
$ docker compose up

# O servidor será iniciado na porta 3000 exibindo a mensagem:
"App listening on port 3000!"
```

### NodeJS

Antes de executar o serviço de autenticação diretamente com Node.js, certifique-se de ter instalado o PostgreSQL e configurado as variáveis de ambiente no arquivo .env.node. Além disso, é necessário executar as migrações do banco de dados antes de iniciar o servidor.

Siga as etapas abaixo para iniciar o serviço:

```bash
# Clone este repositório
$ git clone https://github.com/kennedy-florentino/nodejs-express-auth-service.git

# Acesse a pasta do projeto no terminal
$ cd nodejs-express-auth-service

# Instale as dependências
$ npm install

# Execute as migrações do banco de dados
$ npm run migration:run

# Inicie o servidor
$ npm start

# O servidor será iniciado na porta 3000 exibindo a mensagem:
"App listening on port 3000!"
```

## Utilização

No seu workspace do Postman, abra a aba Collections e clique em Import. Em seguida, selecione o arquivo `nodejs-express-auth-service.postman_collection.json` que está na pasta `resources` do projeto.

Existem 3 endpoints na aplicação:

- **POST** - `/auth/sign-up`
- **POST** - `/auth/sign-in`
- **POST** - `/auth/refresh-token`

Na collection importada no Postman, haverá um modelo JSON para cada requisição. Agora, basta preencher os dados desejados e testar.

## Testes

O projeto inclui testes automatizados para garantir a qualidade do código e o bom funcionamento do serviço de autenticação. Os testes são implementados usando o framework de testes Jest e a biblioteca SuperTest para fazer requisições HTTP.

### Executando os testes

Para executar os testes, certifique-se de ter todas as dependências instaladas. Em seguida, execute o seguinte comando:

```bash
$ npm test

```

## Contribuição

Contribuições são bem-vindas! Se você quiser melhorar este projeto, sinta-se à vontade para fazer um pull request.

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

## Autor

- Nome: Kennedy Florentino
- E-mail: kennedyf2k@gmail.com
- GitHub: [kennedy-florentino](https://github.com/kennedy-florentino)
- LinkedIn: [kennedyf2k](https://www.linkedin.com/in/kennedyf2k/)