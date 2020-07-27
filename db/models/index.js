const Equipment = require("./Equipment");
const Yard = require("./Yard");

Yard.hasMany(Equipment, {
  as: "equipment",
  foreignKey: { allowNull: false, fieldName: "yardId" },
});

Equipment.belongsTo(Yard);

module.exports = { Equipment, Yard };
