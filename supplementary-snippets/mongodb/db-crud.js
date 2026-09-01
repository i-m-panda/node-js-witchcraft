import "dotenv/config"; // not a good practice, only for example purposes
import Database from "./init-connection.js";

const database = new Database();

async function main() {
    try {
        await database.connect();

        // Insert a document into the collection
        const insertedDoc = await database.getDBInstance().collection(process.env.MONGODB_COLLECTION).insertOne({
            name: "Abhishek",
            age: 32,
        });
        console.log("Document inserted", insertedDoc);

        // Insert multiple documents into the collection
        const insertedDocs = await database.getDBInstance().collection(process.env.MONGODB_COLLECTION).insertMany([
            {
                name: "John",
                age: 45,
                city: "New York",
            },
            {
                name: "Jane",
                age: 25,
                city: "London",
            },
        ]);
        console.log("Documents inserted", insertedDocs);

        // Find a document in the collection
        const foundDoc = await database.getDBInstance().collection(process.env.MONGODB_COLLECTION).findOne({
            name: "Abhishek",
        });
        console.log("Document found", foundDoc);

        // Update a document in the collection
        const updatedDoc = await database
            .getDBInstance()
            .collection(process.env.MONGODB_COLLECTION)
            .updateOne(
                {
                    name: "Abhishek",
                },
                {
                    $set: {
                        age: 33,
                    },
                },
            );
        console.log("Document updated", updatedDoc);

        // Delete a document in the collection
        const deletedDoc = await database.getDBInstance().collection(process.env.MONGODB_COLLECTION).deleteOne({
            name: "Abhishek",
        });
        console.log("Document deleted", deletedDoc);


        // Delete multiple documents in the collection
        const deletedDocs = await database.getDBInstance().collection(process.env.MONGODB_COLLECTION).deleteMany({
            city: "New York",
        });
        console.log("Documents deleted", deletedDocs);

        // Find all documents in the collection
        const foundDocs = await database.getDBInstance().collection(process.env.MONGODB_COLLECTION).find({}).toArray();
        console.log("Documents found", foundDocs);
    } finally {
        await database.close();
    }
}

main().catch((error) => {
    console.error("Error:", error);
});
