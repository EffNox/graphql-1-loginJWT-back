import { MongoClient } from "mongodb";

class Database {
    async init(url: string) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = await client.db()
        // if (client.isConnected()) {
            // console.log('==DB==', db.databaseName);
        // }
        return db
    }
}

export default Database
