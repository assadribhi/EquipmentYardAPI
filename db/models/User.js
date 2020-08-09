const { Datatype, Model, DataTypes } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: db }
);

module.exports = User;
