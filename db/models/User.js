const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: "Username already exists" },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "customer" },
  },
  { sequelize: db }
);

module.exports = User;
