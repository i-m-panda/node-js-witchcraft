import "dotenv/config";

const required = ["MONGODB_URL", "MONGODB_DATABASE", "MONGODB_COLLECTION", "JWT_SECRET"];

export function loadConfig(environment = process.env) {
    for (const name of required) {
        if (!environment[name]) {
            throw new Error(`${name} is required`);
        }
    }

    return {
        port: Number(environment.PORT || 3000),
        mongodbUrl: environment.MONGODB_URL,
        databaseName: environment.MONGODB_DATABASE,
        collectionName: environment.MONGODB_COLLECTION,
        jwtSecret: environment.JWT_SECRET,
    };
}
