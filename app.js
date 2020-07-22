const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db/db");

const equipmentRouters = require("./routes/equipment");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/equipment", equipmentRouters);

const run = async () => {
  try {
    await db.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("This Works!!!!!");
  });
};

run();
