const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rahul9572:rahul9572@cluster0.lb1n4qf.mongodb.net/test?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind("error!!"));

db.once("open", function () {
  console.log("Successfully connected to database :: MongoDB");
});

module.exports = db;
