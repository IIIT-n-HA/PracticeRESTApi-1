const express = require("express");
const app = express();
const mongoose = require("mongoose");
const subscribersRouter = require("./routes/subscriber");
require("dotenv").config();

// middleware
app.use(express.json());

// routes
app.use("/subscribers", subscribersRouter);

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true, // This option is no longer needed and can be removed
      //   useFindAndModify: false, // This option is no longer needed and can be removed
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// module.exports = connectDB;
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.url);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
