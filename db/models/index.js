const Equipment = require("./Equipment");
const User = require("./User");
const Yard = require("./Yard");

Yard.hasMany(Equipment, {
  as: "equipment",
  foreignKey: "yardId",
  allowNull: false,
});

Equipment.belongsTo(Yard, { as: "yard", foreignKey: "yardId" });

module.exports = { Equipment, User, Yard };
