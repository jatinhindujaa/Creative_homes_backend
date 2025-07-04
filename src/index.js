import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log("App is running on port: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed!!! ", err);
  });
