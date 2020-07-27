const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Equipment extends Model {}

Equipment.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
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

SequelizeSlugify.slugifyModel(Equipment, {
  source: ["name"],
});

module.exports = Equipment;
