require('dotenv').config();
const mongoose = require("mongoose");

// Connect 
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected To Database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

dbConnect(); //Call The Function To Connect To Database
