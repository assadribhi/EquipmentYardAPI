const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "@$$@D@$$@d",
  database: "equipmentYard_db",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});
module.exports = db;
