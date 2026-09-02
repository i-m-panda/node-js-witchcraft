# Node.js Witchcraft

A short, practical Node.js curriculum for upskilling.

## Before you start

- Install the current Node.js LTS release.
- Clone this repository and run `npm install`.
- Use a terminal from the repository root when running snippets.
- Install and start MongoDB before working through the database lesson.

## Lessons

1. [Exploring Node.js](Documentation/1-exploring-node-js.md) - Node.js, npm, ESM, files, command-line arguments, and external requests.
2. [Web servers and REST APIs](Documentation/2-webserver.md) - native HTTP, Express, routing, middleware, and API structure.
3. [Middleware](Documentation/3-middleware.md) - request processing, validation, authentication, and errors.
4. [MongoDB](Documentation/4-mongodb.md) - connection setup and CRUD operations.
5. [Mongoose](Documentation/5-mongoose.md) - schemas, models, validation, indexes, and MongoDB queries.
6. [Authentication and authorization](Documentation/6-authentication-authorization.md) - passwords, sessions, tokens, roles, and security.
7. [File upload](Documentation/7-file-upload.md) - multipart requests, limits, validation, and storage.
8. [Testing with Jest](Documentation/8-testing.md) - unit, request, database, authentication, and authorization tests
9. [User API](Documentation/9-user-api.md) - combine the lessons into a small users API.
10. [Next steps](Documentation/10-next-steps.md) - process, streams, WebSockets, scaling, queues, observability, and deployment.
11. [Appendix](Documentation/appendix.md) - supplementary documentation, guides, tools, and standards.

## Useful commands

```sh
npm test
npm run test:watch
```

The supplementary snippets are deliberately small. Read the matching lesson
first, run the snippet, then change one thing and run it again. The user API
is complete when it has environment configuration, validation, error handling,
authentication, tests, and a health endpoint.

Never commit `.env` files or real credentials.

## After the curriculum

Complete the user API first, then use [Next steps](Documentation/10-next-steps.md)
to choose the next topic based on a real problem in the application.
