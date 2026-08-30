import mongoose from "mongoose";

export async function connectDatabase(url, databaseName) {
    await mongoose.connect(url, { dbName: databaseName });

    return {
        connection: mongoose.connection,
    };
}

export function closeDatabase() {
    return mongoose.disconnect();
}
