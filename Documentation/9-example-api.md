# Let's create an example API using what we have learned so far
The goal is a small users API. Build it one step at a time and keep each layer
responsible for one kind of work. The database layer uses Mongoose models and a
repository so the HTTP layer does not depend directly on MongoDB.

The complete runnable example is in `supplementary-snippets/example-api`. Read
the lesson first, then run `npm install` and `npm test` from that folder.

### Folder Structure:
```
example-api/
│
├── src/
│   ├── app.js
│   │
│   ├── routes/
│   │   ├── user-routes.js
│   │   └── location-routes.js
│   │
│   ├── controllers/
│   │   ├── user-controller.js
│   │   └── location-controller.js
│   │
│   ├── services/
│   │   ├── user-service.js
│   │   └── location-service.js
│   │
│   ├── middleware/
│   │   ├── validate.js
│   │   ├── auth.js
│   │   └── error-handler.js
│   │
│   ├── models/
│   │   └── user-model.js
│   │
│   └── config/
│       └── db.js
│
└── package.json
└── .env.example
```

# Request flow
The request should move through the application in this order:

```text
Request -> Route -> Middleware -> Controller -> Service -> Database
```

- Route defines the URL and HTTP method.
- Middleware parses, validates, authenticates, or logs the request.
- Controller deals with `req` and `res`, calls the service, and returns the
	status code.
- Service contains business rules and external API integration.
- Database code reads and writes data through the Mongoose model. User
	documents are stored in the collection configured by `MONGODB_COLLECTION`
	(usually `users`).

# API endpoints
- `GET /location/:city` calls the external location service and returns the
	location details.
- `POST /users` creates a user after validating the body and hashing the
	password.
- `GET /users/:id` returns one user after checking authorization.
- `PATCH /users/:id` updates allowed fields only.
- `DELETE /users/:id` deletes a user after checking authorization.

Use `201` for a successful create, `200` for a successful read or update

# Definition of done
The API is complete when it has environment configuration, centralized error
handling, validation, authentication, authorization, database indexes, a health
endpoint, tests, and an `.env.example` file. Do not commit real credentials.