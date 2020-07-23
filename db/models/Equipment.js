const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Equipment extends Model {}

Equipment.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING, allowNull: false },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      validate: {
        min: 25,
      },
    },
    image: { type: DataTypes.STRING },
  },
  { sequelize: db }
);
module.exports = Equipment;
