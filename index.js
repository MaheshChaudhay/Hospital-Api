const express = require("express");
const db = require("./config/mongoose");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(port, (err) => {
  if (err) {
    console.log("error in running the app", err);
    return;
  }
  console.log("server is listening on port : ", port);
});
