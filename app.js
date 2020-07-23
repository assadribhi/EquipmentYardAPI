const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");

const equipmentRouters = require("./routes/equipment");
const { Equipment } = require("./db/models");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/equipment", equipmentRouters);

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to DB Successful");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("This Works!!!!!");
  });
};

run();
