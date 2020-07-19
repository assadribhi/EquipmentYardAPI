const express = require("express");
const cors = require("cors");

const equipment = require("./equipment");

const app = express();

app.use(cors());

app.get("/equipment", (req, res) => {
  res.json(equipment);
});

app.listen(8000, () => {
  console.log("This Works!!!!!");
});
