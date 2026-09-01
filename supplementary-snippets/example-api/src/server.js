import { createApp } from "./app.js";
import { loadConfig } from "./config/env.js";
import { closeDatabase, connectDatabase } from "./config/database.js";
import { createMongoUserRepository } from "./repositories/user-repository.js";

const config = loadConfig();
await connectDatabase(config.mongodbUrl, config.databaseName);
const app = createApp({ userRepository: createMongoUserRepository(), jwtSecret: config.jwtSecret });
const server = app.listen(config.port, () => console.log(`API running on http://localhost:${config.port}`));

for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, async () => {
        server.close();
        await closeDatabase();
        process.exit(0);
    });
}
