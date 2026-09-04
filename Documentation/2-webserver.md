A major use case of node js is to create web server. And it's extremely easy to create one with node js.

## Example of a simple server
See [simple-server.js](../supplementary-snippets/webserver/simple-server.js)

## Use express
> Fast, unopinionated, minimalist web framework for Node.js
Review [express-server.js](../supplementary-snippets/webserver/express-server.js) for a simple Express server.
Review [simple-server.js](../supplementary-snippets/webserver/simple-server.js) for the same idea using Node's built-in `node:http` module.
You can serve more than text, review [serve-html-json.js](../supplementary-snippets/webserver/serve-html-json.js)

## Serving static assets
you can serve up a whole folder containing HTML,CSS,JS and what not using node js and it's fairly easy to do\
review [serve-static.js](../supplementary-snippets/webserver/serve-static.js) to get understanding on how to do that

## Dynamic rendring
for dynamic rendring you can use server side rendring solutions like EJS or Pug or more Sophisticated next.js

## REST APIs using node
So with node js REST API can be easily build and scaled

### REST architecture 👇
GET    to fetch a resource\
POST   to create a resource\
PUT    to update a resource\
DELETE to delete a resource

To be able to perform above action API needs data from the user, and there are several ways to get data in API endpoint

| Source          | Express API                 | Typical purpose                  | Examples                     | Remarks                                                 |
| --------------- | --------------------------- | -------------------------------- | ---------------------------- | ------------------------------------------------------- |
| URL path        | `req.params`                | Identify resource                | /products/789/reviews        |                                                         |
| Query string    | `req.query`                 | Filter/search/pagination/options | GET /products?category=books |                                                         |
| JSON/form body  | `req.body`                  | Create/update data               |                              | for JSON:  app.use(express.json()); for form data:      |
|                 |                             |                                  |                              | app.use(express.urlencoded({ extended: true }))         |
| HTTP headers    | `req.headers` / `req.get()` | Metadata/authentication          |                              | Authorization: Bearer eyJ..                             |
| Cookies         | `req.cookies`               | Browser state/session            |                              | Cookie: sessionId=abc123                                |
| Signed cookies  | `req.signedCookies`         | Tamper-resistant cookie values   |                              |                                                         |
| File upload     | `req.file` / `req.files`    | Uploaded files                   |                              | multipart/form-data, multer like middleware can be used |
| Middleware      | Custom `req.x`              | Auth/context/validated data      |                              | middlewares can add data to req                         |
| Raw HTTP stream | `req.on('data')`            | Low-level body handling          |                              |                                                         |

Typical mental model you can use:

```
HTTP Request
     │
     ├── URL
     │    ├── /users/:id  → req.params
     │    └── ?page=2     → req.query
     │
     ├── Headers          → req.headers
     │
     ├── Cookies          → req.cookies
     │
     ├── Body             → req.body
     │    ├── JSON
     │    ├── URL encoded
     │    └── multipart/form-data
     │
     └── Middleware
          └── req.user / req.context / req.validatedData / req.x // can be any key
```

Basic Folder Structure for an API might look something like this:
```
src/
├── app.js
├── server.js
│
├── config/
│   ├── database.js
│   └── env.js
│
├── routes/
│   ├── user.routes.js
│   └── auth.routes.js
│
├── controllers/
│   ├── user.controller.js
│   └── auth.controller.js
│
├── services/
│   ├── user.service.js
│   └── auth.service.js
│
├── repositories/
│   └── user.repository.js
│
├── models/
│   └── user.model.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validation.middleware.js
│
├── validators/
│   └── user.validator.js
│
├── utils/
│   ├── ApiError.js
│   └── response.js
│
└── tests/
    └── user.test.js
```

Typical request flow may look like this:
```
HTTP Request
     ↓
   Route
     ↓
 Middleware
     ↓
 Controller
     ↓
  Service
     ↓
 Repository
     ↓
 Database
```

- Route       → Only defines endpoints
    ```
    router.post(
        "/users",
        validate(createUserSchema),
        userController.create
    );
    ```
- Middleware  → Cross-cutting concerns
    ```
    function logger(req, res, next) {
        console.log(`${req.method} ${req.url}`);
        next(); // Pass control to the next middleware/route handler
    }
    ```
- Controller  → Deals with HTTP
    ```
    const create = async (req, res) => {
        try {
            const user = await userService.create(req.body);
            res.status(201).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.log(error);
        }
    };
    ```
- Service     → Business logic
    ```
    const create = async (data) => {
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        const passwordHash = await hashPassword(data.password);

        return userRepository.create({
            ...data,
            password: passwordHash
        });
    };
    ```
- Repository  → Database
    ```
    const findByEmail = (email) => {
        return User.findOne({ email });
    };

    const create = (data) => {
        return User.create(data);
    };
    ```
- Model       → Database schema
    ```
    // barebone User Model
    const users = [
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" }
    ];

    function getAllUsers() {
        return users;
    }

    function getUserById(id) {
        return users.find(user => user.id === Number(id));
    }

    export {
        getAllUsers,
        getUserById
    }
    ```

### Minimal location API
See [location-api](../supplementary-snippets/webserver/location-api/) for a
small API that accepts a city and returns its latitude and longitude. Its
request flow is:

```
HTTP Request -> Route -> Middleware -> Controller -> Service -> Repository -> API
```

Try it with:

```sh
cd supplementary-snippets/webserver/location-api
npm install
npm start
curl "http://localhost:3000/location?city=Berlin"
```

The repository calls the OpenStreetMap Nominatim API, keeping the external API
details out of the controller.

### Import the location API into Postman

The standalone location API is in
[supplementary-snippets/webserver/location-api](../supplementary-snippets/webserver/location-api/).
Start it with `npm install` and `npm start`, then import its
[openapi.json](../supplementary-snippets/webserver/location-api/openapi.json)
in Postman using **Import > File**. The generated request uses
`GET http://localhost:3000/location?city=Berlin` as its example.

The combined user API has a separate OpenAPI document at
[supplementary-snippets/user-api/openapi.json](../supplementary-snippets/user-api/openapi.json).
