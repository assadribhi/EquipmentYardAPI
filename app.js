const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const db = require("./db");
const { localStrategy, jwtStrategy } = require("./middleWare/passport");

const equipmentRoutes = require("./routes/equipment");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const yardRoutes = require("./routes/yards");

const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/equipment", equipmentRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use("/yards", yardRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  res.status(404).json("Path Not Found");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to DB Successful");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  const PORT = process.env.PORT || 8000;

  await app.listen(PORT, () => {
    console.log(`This Works!!!!! on ${PORT}`);
  });
};

run();
