//IN THIS FILE CONNECTING THE DATABASE WITH MONGODB WITH THE HELP OF MONGGOOSE AND AND ATLAS 

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME, 
    });

    console.log(`MongoDB connected! Database: ${DB_NAME}`);
    // await Comment.deleteMany({}); 
    // await Reply.deleteMany({});

    // console.log("All comments deleted from the database.");
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;