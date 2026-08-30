# Middleware
Middleware is a function that runs between receiving a request and sending a
response. It can read or change the request, read or change the response, end
the request, or pass control to the next middleware.

The usual middleware function looks like this:

```js
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
```

Calling `next()` continues the request. Calling `next(error)` sends the error
to the error-handling middleware. If middleware sends a response, it should not
call `next()` afterwards.

# Adding middleware
Middleware added with `app.use()` can run for every request:

```js
app.use(express.json({ limit: "1mb" }));
```

Middleware can also be added to one route:

```js
router.patch(
    "/users/:id",
    requireAuth(userService, jwtSecret),
    requireOwnerOrAdmin,
    validateUpdate,
    controller.update,
);
```

The functions run from left to right. A middleware function must call `next()`
for the next function to run.

# Validation middleware
Validation checks input before the controller or service receives it. Review
`src/middleware/validate.js` in `Supplementary snippets/example-api`.

```js
export function validateUser(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
        return res.status(400).json({ error: "Invalid user input" });
    }
    next();
}
```

Validation middleware should reject invalid input and return immediately. It
should not contain business rules or database calls.

# Authentication middleware
Authentication middleware checks credentials and attaches the current user to
the request:

```js
const token = req.get("authorization");
req.user = await userService.getById(userId);
next();
```

Review `src/middleware/auth.js`. `requireAuth` returns `401` when credentials
are missing or invalid. `requireOwnerOrAdmin` returns `403` when the signed-in
user is not allowed to access the resource.

# Error-handling middleware
Error middleware has four parameters. The four parameters are how Express
recognizes it as an error handler:

```js
function errorHandler(error, req, res, next) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: "Request failed" });
}

app.use(errorHandler);
```

Place error middleware after the routes. Controllers can call
`next(error)` instead of duplicating error responses.

# Things to remember
- Middleware order matters.
- Always return after sending an error response.
- Keep authentication, validation, logging, and error handling separate.
- Do not expose stack traces or database details to API clients.
- Test both the path that calls `next()` and the path that ends the request.