const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDb;