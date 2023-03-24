# social-world

Social-world is Minimal Viable Social network

## Main features

- Authentication(login/register)
- CRUD User 
- CRUD posts, leave comments
- "real-time" chat by WebSockets(socket.io)

## Stack:

#### Back-end:

- Environment
  1.  NodeJS
  2.  TypeScript
  3.  dotenv
- Database
  1.  PostgreSQL - SQL Database
  2.  pg - nodejs driver for postgres
  3.  knex - sql querybuilder
- Server
  1.  Express
      - cors
      - body-parser
      - cookie-parser
      - express-validator
      - express-fileupload
  2.  socket.io
  - Auth: jsonwebtoken
  - encrypt: bcrypt
  - Log: pino
  - API: try to use [JSON:API](https://jsonapi.org/format/)
- Deployment
  1.  Nginx

#### Front-end:

- Architecture: try to use [Feature-Sliced Design](https://feature-sliced.design/)
- TypeScript
- Framework
  1. React
  2. Redux & Redux-Toolkit
  3. react-router-dom
  4. react-hook-form
- styles
  1. Material-UI
  2. css modules
- bundle:
  1.  webpack 5 & babel
- linter: eslint
- formatter: prettier

## Database schema

https://dbdiagram.io/d/63be44726afaa541e5d1ad8f
