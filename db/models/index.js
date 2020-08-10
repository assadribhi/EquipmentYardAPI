const Equipment = require("./Equipment");
const User = require("./User");
const Yard = require("./Yard");

Yard.hasMany(Equipment, {
  as: "equipment",
  foreignKey: "yardId",
  allowNull: false,
});

Equipment.belongsTo(Yard, { as: "yard", foreignKey: "yardId" });

Yard.belongsTo(User, { as: "user", foreignKey: "username" });

module.exports = { Equipment, User, Yard };
