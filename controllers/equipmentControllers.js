const { Equipment, Yard } = require("../db/models");
const slugify = require("slugify");

exports.fetchEquipment = async (equipmentId, next) => {
  try {
    const equipment = await Equipment.findByPk(equipmentId);
    return equipment;
  } catch (error) {
    next(error);
  }
};

exports.equipmentList = async (req, res, next) => {
  try {
    const equipment = await Equipment.findAll({
      attributes: { exclude: ["yardId", "createdAt", "updatedAt"] },
      include: { as: "yard", model: Yard, attributes: ["name"] },
    });
    res.json(equipment);
  } catch (error) {
    next(error);
  }
};

exports.equipmentUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.equipment.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.equipmentDelete = async (req, res, next) => {
  try {
    await req.equipment.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
