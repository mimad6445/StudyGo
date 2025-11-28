const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to the database -->",process.env.MONGODB_URI);
    } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
    }
};

module.exports = connectDB;