const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(`${MONGO_URI}/${DB_NAME}`)
  .then(() => {
    console.log("Connected to MONGO DB");
  })
  .catch((e) => {
    console.log("Error While Connecting to DB", e);
  });
