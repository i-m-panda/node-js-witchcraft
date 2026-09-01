# Example API

This is a small users API that combines the Node.js curriculum into one
independent project.

## Topics covered

- Node.js ESM modules and npm scripts
- Express routes and middleware
- Environment variables with dotenv
- MongoDB connection and CRUD operations with Mongoose
- Password hashing with bcryptjs
- JWT authentication and role-based authorization
- Request validation and centralized error handling
- Multipart file uploads with Multer
- Native `fetch` with a timeout
- Jest unit and request tests
- Health checks and graceful shutdown

## Run the API

1. Copy `.env.example` to `.env` and set `JWT_SECRET`.
2. Start MongoDB locally.
3. Install dependencies and start the server:

```sh
npm install
npm start
```

The API is available at `http://localhost:3000`.

## Run tests

```sh
npm test
npm run test:coverage
```

Tests use an in-memory repository, so MongoDB is not needed for the test suite.
The repository unit tests use a mocked Mongoose model, so they also run without
MongoDB.

## Endpoints

- `GET /health`
- `POST /users`
- `POST /auth/login`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`
- `POST /users/:id/avatar`
- `GET /location/:city`

Use the token returned by login as `Authorization: Bearer <token>`.
