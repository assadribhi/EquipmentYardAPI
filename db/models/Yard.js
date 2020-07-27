const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const sequelizeSlugify = require("sequelize-slugify");

class Yard extends Model {}

Yard.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    yardImage: { type: DataTypes.STRING },
  },
  { sequelize: db }
);

sequelizeSlugify.slugifyModel(Yard, {
  source: ["name"],
});

module.exports = Yard;
