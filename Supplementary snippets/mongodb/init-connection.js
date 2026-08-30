import "dotenv/config";
import { MongoClient } from "mongodb";

class Database {
    constructor() {
        this.connectionURL = process.env.MONGODB_URL;
        this.databaseName = process.env.MONGODB_DATABASE;
        if (!this.connectionURL || !this.databaseName) {
            throw new Error("MONGODB_URL and MONGODB_DATABASE are required");
        }
        this.client = new MongoClient(this.connectionURL);
        this.db = null;
    }

    async connect() {
        if (this.db) return;

        await this.client.connect();
        this.db = this.client.db(this.databaseName);
        console.log("MongoDB connected");
    }

    getDBInstance() {
        if (!this.db) throw new Error("Database is not connected");
        return this.db;
    }

    async close() {
        await this.client.close();
        this.db = null;
    }
}

export default Database;