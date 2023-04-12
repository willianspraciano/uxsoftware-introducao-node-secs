<h1 align="center">
  🟢 Introdução ao Node.js
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-sobre-o-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-uso">Uso</a>&nbsp;&nbsp;&nbsp;
</p>

<br>

## 🌐 Tecnologias

O projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma ORM](https://www.prisma.io/)

## 💻 Sobre o Projeto

Este é o projeto desenvolvido ao longo do curso de back-end da III SECS na UFC de Sobral-CE

## ✨ Funcionalidades

- [x] Hello world inicial;
- [x] CRUD de usuários;
- [ ] CRUD das atividades do usuários;
- [ ] Autenticação do usuário.

## 📦 Instalação

Para clonar o projeto, com o [Git](https://git-scm.com/) já instalado no seu computador, execute o comando abaixo:

```bash
git clone https://github.com/willianspraciano/introducao-node-secs.git
```

Em seguida, abra seu editor de código na pasta do seu projeto.

Para instalar as dependências execute o comando abaixo na pasta do projeto:

```bash
npm install
```

## 🔨 Uso

A primeira coisa a ser feita é configurar o Banco de Dados com o Prisma. Rode o seguinte comando:
```bash
npx prisma migrate dev
```

Para visualizar as tabelas do banco de dados, execute o comando abaixo:
```bash
npx prisma studio
```

Agora, para rodar o projeto basta executar o comando abaixo com o terminar aberto na pasta do seu projeto:
```bash
npm run dev
```

Com o projeto rodando, agora você pode acessar a seguintes rotas pelo seu navegador:
```bash
http://localhost:3333/hello-world
```

Usando o [Insomnia](https://insomnia.rest/download), você poderá acessar as seguintes rotas de usuários:
```bash
GET http://localhost:3333/users/list
GET http://localhost:3333/users/show/coloque-aqui-o-id-do-usuario
DELETE http://localhost:3333/users/delete/coloque-aqui-o-id-do-usuario

POST http://localhost:3333/users/create
  body (não copie a palavra "body", só o objeto abaixo):
  {
    "name": "Willian",
    "email": "willian@gmail.com"
  }

PUT http://localhost:3333/users/update/coloque-aqui-o-id-do-usuario
  body (não copie a palavra "body", só o objeto abaixo):
  {
    "name": "Willian Praciano",
    "email": "willian.s.praciano@gmail.com"
  }
```

<br/>
<br/>
<h3 align="center">
Feito com 💚 por <a href="https://www.uxsoftware.com.br/" target="_blank">UX Software</a>
<br/>
<br/>
</h3>
