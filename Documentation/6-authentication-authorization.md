# Authentication and authorization
Authentication answers: "Who is this user?" Authorization answers: "What is
this user allowed to do?"

# Passwords
Never store a user's password. Store a slow, one-way password hash using a
well-known library such as `bcrypt` or `argon2`.

Install the library, for example `npm install argon2`.

```js
import argon2 from "argon2";

const passwordHash = await argon2.hash(password);
const passwordIsValid = await argon2.verify(passwordHash, password);
```

The API should return the same login error whether the email or password is
wrong. This avoids revealing which email addresses exist.

# Sessions and tokens
Two common approaches are:

- Sessions: the server stores session state and the browser stores a secure,
  httpOnly cookie.
- Access tokens: the client sends a short-lived token in the `Authorization`
  header, usually as `Bearer <token>`.

Choose one approach for your project and use important approaches like token expiry, logout, refresh,
and revocation to keep everything safe and secure. Do not put secrets in source control or in browser-readable storage when a secure cookie is appropriate.

# Authorization middleware
Authentication middleware can attach the current user to `req.user`.\

Check ownership as well as roles. A signed-in user should not automatically be\
able to read or change another user's data.

```js
function requireRole(role) {
	return (req, res, next) => {
		if (!req.user || req.user.role !== role) {
			return res.status(403).json({ error: "Forbidden" });
		}
		next();
	};
}
```

# Security checklist
- Validate and limit every request body, query, and path parameter.
- Add rate limiting to login and other sensitive endpoints.
- Configure CORS for known clients instead of allowing every origin.
- Use HTTPS in production and secure cookies.
- Return safe error messages and log the detailed error on the server.
- Keep dependencies updated and scan them for known vulnerabilities.
