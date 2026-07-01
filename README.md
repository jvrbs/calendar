# 📅 Calendar App

Aplicação de agenda/calendário full-stack, com front-end em **Angular** e back-end em **Spring Boot**, permitindo criar, visualizar, editar e excluir eventos organizados por mês.

## ✨ Funcionalidades

- Visualização de calendário mensal com navegação entre meses (anterior/próximo)
- Destaque visual do dia atual
- Criação de eventos ao clicar em um dia do calendário
- Edição de eventos existentes ao clicar em um evento
- Exclusão de eventos
- Cada evento possui título, descrição, data/hora de início e fim, e cor personalizável
- Atualização automática da tela ao criar/editar/excluir eventos (sem necessidade de recarregar)

## 🏗️ Estrutura do projeto

```
calendar/
├── agenda-front/     # Front-end Angular (SPA)
└── calendar-api/     # Back-end Spring Boot (API REST)
```

## 🚀 Tecnologias

### Front-end (`agenda-front`)
- [Angular 21](https://angular.dev/) (standalone components, modo *zoneless* com Signals)
- TypeScript
- RxJS
- Vitest (testes unitários)

### Back-end (`calendar-api`)
- Java 17+
- [Spring Boot 4.1.0](https://spring.io/projects/spring-boot)
- Spring Web (API REST)
- Spring Data JPA / Hibernate
- MySQL
- Lombok

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19+ ou 22.12+
- [Angular CLI](https://angular.dev/tools/cli) `npm install -g @angular/cli`
- Java 17 ou superior
- Maven (ou usar o wrapper `mvnw` incluso)
- MySQL rodando localmente (ou acessível via rede)

## ⚙️ Configuração e execução

### 1. Banco de dados

Crie um banco de dados MySQL chamado `calendar_db`:

```sql
CREATE DATABASE calendar_db;
```

Ajuste as credenciais em `calendar-api/src/main/resources/application.properties` conforme seu ambiente:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/calendar_db
spring.datasource.username=root
spring.datasource.password=SUA_SENHA
```

> As tabelas são criadas/atualizadas automaticamente na inicialização (`spring.jpa.hibernate.ddl-auto=update`).

### 2. Back-end (API)

```bash
cd calendar-api
./mvnw spring-boot:run
```

A API sobe por padrão em **http://localhost:8080**.

### 3. Front-end

```bash
cd agenda-front
npm install
ng serve
```

A aplicação sobe por padrão em **http://localhost:4200**.

## 🔌 Endpoints da API

Base URL: `http://localhost:8080/api/events`

| Método | Rota              | Descrição                     |
|--------|-------------------|--------------------------------|
| GET    | `/api/events`      | Lista todos os eventos         |
| GET    | `/api/events/{id}` | Busca um evento pelo ID        |
| POST   | `/api/events`      | Cria um novo evento            |
| PUT    | `/api/events/{id}` | Atualiza um evento existente   |
| DELETE | `/api/events/{id}` | Remove um evento               |

### Modelo de evento

```json
{
  "id": 1,
  "title": "Reunião de equipe",
  "description": "Alinhamento semanal",
  "startDateTime": "2026-06-30T14:00:00",
  "endDateTime": "2026-06-30T15:00:00",
  "color": "#4285f4"
}
```

## 🧪 Testes

### Front-end

```bash
cd agenda-front
ng test
```

### Back-end

```bash
cd calendar-api
./mvnw test
```

## 📌 Observações

- O front-end está configurado para consumir a API em `http://localhost:8080`. Caso rode a API em outra porta/host, ajuste `apiUrl` em `agenda-front/src/app/services/event.ts`.
- O CORS na API está liberado especificamente para `http://localhost:4200` (ver `@CrossOrigin` em `EventController`).

## 👤 Autor

Projeto desenvolvido por **jvsim**.
