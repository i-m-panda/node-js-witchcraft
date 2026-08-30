# Next steps
You now have enough knowledge to build a small Node.js API. The topics below
are useful when the application needs more performance, real-time behavior, or
production reliability.

## Process and runtime
Review Node's `process` object and learn how an application starts, receives
configuration, handles signals, and exits.

- Read values from `process.env` and validate them at startup.
- Handle `SIGINT` and `SIGTERM` for graceful shutdown.
- Send logs to standard output and standard error.
- Use exit codes for command-line programs.
- Inspect memory and CPU with `process.memoryUsage()` and `process.cpuUsage()`.

The example API already uses environment configuration and graceful shutdown.
Extend it with a health check that reports whether required dependencies are
available.

## Streams
Streams process data piece by piece instead of loading everything into memory.
They are useful for large files, uploads, downloads, and network responses.

```js
import { createReadStream } from "node:fs";

createReadStream("large-file.txt").pipe(response);
```

Learn readable, writable, duplex, and transform streams. Handle `error` and
`close` events, and use `pipeline()` when connecting several streams safely.

## WebSockets
Use WebSockets when the server and client need a long-lived, two-way connection.
Typical examples are chat, notifications, live dashboards, and collaboration.

- Learn the connection, message, error, and close events.
- Authenticate the connection during its handshake.
- Validate every incoming message.
- Decide how reconnects and missed messages work.
- Keep shared connection state outside one process when scaling horizontally.

A normal REST API and WebSockets can live in the same application, but they
solve different communication problems.

## Clustering and worker threads
Node.js runs JavaScript on one main thread. The event loop handles I/O well,
but CPU-heavy work can block requests.

- Clustering starts multiple Node.js processes so the application can use more
  than one CPU core.
- Worker threads move CPU-heavy JavaScript work away from the main event loop.
- Child processes are useful for running an independent command or program.

Start with multiple application instances behind a load balancer. Use shared
sessions, a shared cache, and external storage instead of relying on memory in
one process. WebSockets may also need sticky sessions or a pub/sub adapter.

## Background jobs and queues
Do not make a user wait for slow work such as email, video processing, reports,
or large file processing. Put the work in a queue and let a worker process it.
Learn retries, backoff, idempotency, dead-letter queues, and job monitoring.

## Caching and rate limiting
Add a cache for data that is expensive to calculate or rarely changes. Define
when cached data expires and how it is invalidated. Add rate limits to protect
login, uploads, and expensive endpoints from abuse.

## Observability
Production systems need more than `console.log`:

- Use structured logs with request IDs.
- Track latency, error rate, throughput, and resource usage.
- Add health and readiness endpoints.
- Use traces when a request crosses multiple services.
- Alert on symptoms users experience, not only server exceptions.

## Deployment and reliability
Learn how to run the API in a container, configure it with environment
variables, and deploy it behind HTTPS and a reverse proxy. Add database backup
and restore procedures, dependency scanning, CI checks, and a rollback plan.

## Suggested order
1. Process, signals, and graceful shutdown.
2. Streams and safe large-file handling.
3. WebSockets and real-time messages.
4. Worker threads for CPU-heavy tasks.
5. Multiple processes, containers, and load balancing.
6. Queues, caching, observability, and deployment.

Choose the next topic based on a real problem in the application. Do not
add clustering or WebSockets until the application needs them.
