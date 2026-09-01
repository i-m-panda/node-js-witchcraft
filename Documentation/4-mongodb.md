# MongoDB
MongoDB is a popular non relational database with easy integration with Node.js.

# Installation
- Install mongosh(mongo shell) following instructions from here: https://www.mongodb.com/docs/mongodb-shell/install/?operating-system=macos&macos-installation-method=zip
- Install mongodb community edition following instructions from here: https://www.mongodb.com/docs/manual/administration/install-community/?operating-system=macos&macos-installation-method=tarball
  - Get it up and running (CLI: `nohup mongod --dbpath ~/path/to/dbdir --logpath ~/path/to/mongodb.log >/dev/null &`)
- Install MongoDB Compass GUI from here: https://www.mongodb.com/try/download/compass
  - If you prefer CLI then here is the documentation for mongo shell: https://www.mongodb.com/docs/mongodb-shell/
Now we are good to start experimenting with mongodb locally

# Connect to DB
- Install the `mongodb` npm package.
- Create a `.env` file. Do not commit this file.

```env
MONGODB_URL=mongodb://localhost:27017
MONGODB_DATABASE=<DATABASE_NAME>
MONGODB_COLLECTION=<COLLECTION_NAME>
```

- Review [init-connection.js](../supplementary-snippets/mongodb/init-connection.js).

```js
import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
await client.connect();

const database = client.db(process.env.MONGODB_DATABASE);
const users = database.collection("users");
```

The client should normally be created once and shared by the application. Add a
health check and close the client during graceful shutdown.

# CRUD operations
Review [db-crud.js](../supplementary-snippets/mongodb/db-crud.js) for the basic operations:

- `insertOne` and `insertMany` create documents.
- `findOne` and `find({}).toArray()` read documents.
- `updateOne` changes a document with operators such as `$set`.
- `deleteOne` and `deleteMany` remove documents.

Always check the result returned by an update or delete. For example,
`matchedCount` tells you whether an update found a document and `deletedCount`
tells you whether a document was removed.

# Things to remember
- Use indexes for fields that are frequently searched, such as email.
- Use projections to return only the fields the API needs.
- Use `limit` and `skip` for basic pagination and validate their values.
- Never store passwords in plain text.
- Keep database URLs and credentials in environment variables.
- Catch database errors and return a useful API error instead of exposing the
  database error to the user.