const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hospital_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "error in connecting with database: ")
);
db.once("open", function () {
  console.log("Connection to databse is successfull");
});

module.exports = db;
