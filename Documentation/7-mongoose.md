# Mongoose
Mongoose is an ODM (Object Document Mapper) for MongoDB. It helps us define
schemas, validate documents, and work with MongoDB using models.

# Installation
Install mongoose in the project that uses it:

```sh
npm install mongoose
```

# Schema and model
A schema describes the shape of a document. A model uses that schema to read
and write documents in a collection.

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
}, { collection: "users" });

const User = mongoose.model("User", userSchema);
```

Review `src/models/user-model.js` in `Supplementary snippets/example-api`.
The example also stores a password hash, a role, and timestamps. The explicit
`collection: "users"` option means this model reads and writes the `users`
collection. Without it, Mongoose would infer the same name by pluralizing the
`User` model name.

# Connect to MongoDB
Review `src/config/database.js`:

```js
await mongoose.connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_DATABASE,
});
```

Create one connection when the server starts and close it during graceful
shutdown. Keep the connection URL, database name, and collection name in
environment variables. Collection names are configuration, not secrets.

# CRUD with a model

```js
const user = await User.create({ name: "Ada", email: "ada@example.com" });
const foundUser = await User.findById(user.id).lean();
await User.findByIdAndUpdate(user.id, { name: "Ada Lovelace" }, { new: true });
await User.findByIdAndDelete(user.id);
```

Use `lean()` when you only need plain objects. Use `runValidators: true` on
updates when schema validation should also run for changed fields.

# Things to remember
- `unique: true` creates a unique index; it is not a request validator.
- Do not return `passwordHash` from an API response. The example excludes it
  by default and explicitly selects it only during login.
- Handle invalid IDs and duplicate email errors.
- Keep database models separate from controllers and business logic.
- Mongoose is an abstraction over MongoDB, so MongoDB indexes and query design
  still matter.