import mongoose from "mongoose";

const connection: any = {};

async function dbConnect() {
    if (connection.isConnected) {
        return connection;
    }

    try {
        const db: any = await mongoose.connect(process.env.MONGO_URI, {});
        connection.isConnected = db.connections[0].readyState;
        connection.DBConnect = db.connections[0];
        // console.log("connection", connection);
        return connection;
    } catch (err) {
        return null;
    }
}

export default dbConnect;
