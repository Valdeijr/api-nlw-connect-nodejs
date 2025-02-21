# API de Cadastro de Usuários, Link de indicação e Ranking

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Este projeto é uma API desenvolvida em Node.js com TypeScript utilizando o framework Fastify. Ele permite o cadastro de usuários e gera um link de compartilhamento exclusivo para cada um. A API rastreia os cliques nesses links e calcula quantos novos cadastros foram convertidos a partir deles. Além disso, há um sistema de ranking que exibe os três primeiros usuários com mais conversões.

## Tecnologias Utilizadas

- **Node.js + TypeScript**: Ambiente de execução e linguagem principal.
- **Fastify**: Framework leve e rápido para construção de APIs.
- **Drizzle ORM**: Integração com PostgreSQL para gerenciamento de banco de dados.
- **Redis**: Armazenamento de cliques e ranking.
- **Zod**: Validação de dados.
- **Swagger**: Documentação da API.
- **Docker + Docker Compose**: Gerenciamento dos serviços de PostgreSQL e Redis.
- **pnpm**: Gerenciador de pacotes eficiente.

## Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/Valdeijr/api-nlw-connect-nodejs
   cd api-nlw-connect-nodejs

2. Instale as dependências com **pnpm**:
   ```bash
   pnpm install

3. Inicie os serviços do PostgreSQL e Redis via **Docker Compose**:
   ```bash
   docker-compose up -d

4. Execute o projeto em modo de desenvolvimento:
   ```bash
   pnpm run dev

## Rotas da API

### Cadastro de Usuários
- **POST** `/subscribers`
  - Registra um novo usuário.

### Compartilhamento e Cliques
- **GET** `/invites/:subscriberId`
  - Gera um link de compartilhamento para um usuário.

### Rankings Individuais
- **GET** `/subscribers/:subscriberId/ranking/clicks`
  - Retorna o número de cliques no link do usuário.

- **GET** `/subscribers/:subscriberId/ranking/count`
  - Retorna o número de cadastros convertidos a partir do link do usuário.

- **GET** `/subscribers/:subscriberId/ranking/position`
  - Retorna a posição do usuário no ranking geral.

### Ranking Geral
- **GET** `/ranking`
  - Retorna os três usuários com mais conversões.

## Como Funciona o Redis na API

- Para contar os **cliques** nos links, utilizamos `HINCRBY`.
- Para o **ranking de conversões**, utilizamos `ZADD` e `ZREVRANGE` para ordenar os dados.

## Documentação da API

A API conta com documentação gerada automaticamente pelo **Swagger**. Para acessá-la, inicie a API e acesse:

http://localhost:3330/docs

As seções disponíveis na documentação são:
- **Subscriber**
- **Referral Link**
- **Referral Data**
- **Ranking**

## Certificado de Conclusão e Considerações Finais

Este projeto foi desenvolvido durante um curso da [Rocketseat](https://app.rocketseat.com.br) de **Desenvolvimento Back-end com Node.js**. O certificado de conclusão pode ser acessado no seguinte link:

[Certificado de Conclusão](https://app.rocketseat.com.br/certificates/00d67c6b-d65f-40bf-b281-09109261b926)

Ele abrange conceitos de API REST, banco de dados, validação de dados e armazenamento em cache, buscando aplicar boas práticas no desenvolvimento.
