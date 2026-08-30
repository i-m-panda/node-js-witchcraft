# Appendix
This appendix contains additional resources for going deeper into the topics
covered in the curriculum. Start with the lesson and its example first, then use
these resources when you need more detail.

# Node.js and JavaScript
- [Node.js Learn](https://nodejs.org/en/learn) - official learning material for Node.js.
- [Node.js API documentation](https://nodejs.org/api/) - reference for built-in modules and runtime APIs.
- [How much JavaScript do you need to know to use Node.js?](https://nodejs.org/en/learn/getting-started/how-much-javascript-do-you-need-to-know) - JavaScript concepts useful for Node.js.
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - language fundamentals and modern JavaScript.
- [MDN JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) - ESM imports and exports.
- [npm documentation](https://docs.npmjs.com/) - packages, scripts, configuration, and publishing.

# HTTP, Express, and APIs
- [MDN HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) - requests, responses, headers, methods, and status codes.
- [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) - choosing useful response codes.
- [Express documentation](https://expressjs.com/) - routing, middleware, error handling, and security guidance.
- [Express middleware guide](https://expressjs.com/en/guide/using-middleware.html) - how middleware is composed and executed.
- [OpenAPI specification](https://spec.openapis.org/oas/latest.html) - describe and document HTTP APIs.
- [HTTP Semantics](https://httpwg.org/http-core/) - the current standards for HTTP behavior.

# MongoDB and Mongoose
- [MongoDB documentation](https://www.mongodb.com/docs/) - database concepts, queries, indexes, and operations.
- [MongoDB Node.js driver guide](https://www.mongodb.com/docs/drivers/node/current/) - using MongoDB directly from Node.js.
- [MongoDB data modeling](https://www.mongodb.com/docs/manual/data-modeling/) - choosing document shapes and relationships.
- [MongoDB indexes](https://www.mongodb.com/docs/manual/indexes/) - improving query performance.
- [Mongoose documentation](https://mongoosejs.com/docs/) - schemas, models, validation, and queries.
- [Mongoose validation](https://mongoosejs.com/docs/validation.html) - document and update validation.
- [Mongoose connections](https://mongoosejs.com/docs/connections.html) - connection options and lifecycle.

# Authentication and security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - common web application security risks.
- [OWASP API Security Top 10](https://owasp.org/API-Security/) - risks specific to APIs.
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) - password hashing recommendations.
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) - authentication design guidance.
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) - secure sessions and cookies.
- [Node.js security best practices](https://nodejs.org/en/learn/getting-started/security-best-practices) - security guidance for Node.js applications.
- [npm audit documentation](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities) - find known dependency vulnerabilities.

# Testing
- [Jest documentation](https://jestjs.io/docs/getting-started) - test setup, matchers, mocks, and coverage.
- [SuperTest](https://github.com/ladjs/supertest) - test HTTP servers without starting a public port.
- [Node.js test runner](https://nodejs.org/api/test.html) - the built-in alternative to Jest.
- [MongoDB Memory Server](https://github.com/typegoose/mongodb-memory-server) - run MongoDB integration tests locally.
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/) - test behavior instead of implementation details.

# File uploads and external services
- [Multer documentation](https://github.com/expressjs/multer) - multipart form-data handling for Express.
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) - safely validating and storing uploaded files.
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - making HTTP requests with `fetch`.
- [MDN AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) - canceling requests and applying timeouts.

# Middleware, processes, and streams
- [Node.js process API](https://nodejs.org/api/process.html) - environment, signals, exit codes, and runtime information.
- [Node.js graceful shutdown guide](https://nodejs.org/en/learn/getting-started/finding-your-way-around-nodejs) - useful runtime concepts for server lifecycle management.
- [Node.js stream API](https://nodejs.org/api/stream.html) - readable, writable, duplex, and transform streams.
- [Node.js stream promises API](https://nodejs.org/api/stream.html#streams-promises-api) - promise-based stream utilities including `pipeline`.
- [Node.js child processes](https://nodejs.org/api/child_process.html) - run external commands and programs.
- [Node.js worker threads](https://nodejs.org/api/worker_threads.html) - run CPU-heavy JavaScript away from the main thread.
- [Node.js cluster](https://nodejs.org/api/cluster.html) - create processes that can share a server port.

# WebSockets and distributed systems
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - browser-side WebSocket concepts.
- [ws](https://github.com/websockets/ws) - a widely used WebSocket implementation for Node.js.
- [Socket.IO documentation](https://socket.io/docs/v4/) - event-based real-time communication.
- [Redis documentation](https://redis.io/docs/latest/) - caching, shared state, and pub/sub concepts.
- [BullMQ documentation](https://docs.bullmq.io/) - background jobs and queue processing with Redis.

# Production and operations
- [Node.js diagnostics](https://nodejs.org/en/learn/diagnostics) - debugging and diagnosing running applications.
- [Node.js report documentation](https://nodejs.org/api/report.html) - diagnostic reports for crashes and performance problems.
- [Docker Node.js guide](https://docs.docker.com/guides/nodejs/) - containerizing Node.js applications.
- [12-factor app](https://12factor.net/) - principles for building deployable services.
- [OpenTelemetry documentation](https://opentelemetry.io/docs/) - logs, metrics, and distributed traces.
- [Prometheus documentation](https://prometheus.io/docs/introduction/overview/) - metrics collection and monitoring.
- [GitHub Actions documentation](https://docs.github.com/en/actions) - automate tests, checks, and deployment workflows.

# How to use these resources
- Prefer the official documentation when checking API behavior or configuration.
- Read the security cheat sheets before putting authentication or uploads into
  production.
- Pin and regularly update dependencies, then run the test suite and security
  audit after updates.
- Build a small example from each resource instead of reading everything at
  once.
