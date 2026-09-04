# Projeto Biblioteca

Sistema web para gerenciamento de biblioteca escolar. Permite cadastro de usuários, empréstimo e devolução de livros, e painel administrativo para gestão do acervo.

## Tecnologias

**Backend**
- Java 21
- Spring Boot 4.1.1 (Web MVC + JDBC)
- H2 Database (banco em memória)
- Maven

**Frontend**
- React 19
- Vite 8
- CSS Modules

## Arquitetura

```
projeto-biblioteca/
├── projeto-biblioteca-back/     # API REST
│   └── src/main/java/school/sptech/projeto_biblioteca/
│       ├── controller/          # Endpoints HTTP
│       ├── service/             # Lógica de negócio
│       ├── repository/          # Acesso a dados (JDBC)
│       └── model/               # Entidades
│
└── projeto-biblioteca-front/    # Interface web
    └── src/
        ├── components/          # Componentes reutilizáveis (Botao, CardLivro, Modal...)
        ├── pages/               # Telas (Login, Catalogo, Perfil, AdminLivros)
        └── App.jsx              # Roteamento por estado
```

## Banco de Dados

Tabelas criadas automaticamente ao iniciar o backend:

- **usuario** — id, nome, email, senha
- **livro** — id, titulo, autor, ano_publicacao, genero, quantidade
- **usuario_livro** — relação N:N (empréstimos com data)

## Como Rodar

### Backend

```bash
cd projeto-biblioteca-back
./mvnw spring-boot:run
```

A API roda em `http://localhost:8080`. Console H2 disponível em `http://localhost:8080/h2-console`.

### Frontend

```bash
cd projeto-biblioteca-front/projeto-biblioteca
npm install
npm run dev
```

O frontend roda em `http://localhost:5173`.

## Funcionalidades

- Cadastro e login de usuários
- Catálogo de livros com busca
- Empréstimo e devolução de livros
- Painel admin para CRUD de livros
- Perfil do usuário com livros emprestados
