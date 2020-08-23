const Equipment = require("./Equipment");
const User = require("./User");
const Yard = require("./Yard");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

Yard.hasMany(Equipment, {
  as: "equipment",
  foreignKey: "yardId",
  allowNull: false,
});
Equipment.belongsTo(Yard, { as: "yard", foreignKey: "yardId" });

User.hasOne(Yard, { foreignKey: "userId" });
Yard.belongsTo(User, { as: "user", foreignKey: "userId" });

Order.belongsToMany(Equipment, { through: OrderItem, foreignKey: "orderId" });
Equipment.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "equipmentId",
});

User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

module.exports = { Equipment, Order, OrderItem, User, Yard };
