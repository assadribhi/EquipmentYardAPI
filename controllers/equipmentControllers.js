const { Equipment } = require("../db/models");
const slugify = require("slugify");

exports.fetchEquipment = async (equipmentId, next) => {
  try {
    const equipment = await Equipment.findByPk(equipmentId);
    return equipment;
  } catch (error) {
    next(error);
  }
};

exports.equipmentCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newEquipment = await Equipment.create(req.body);
    res.status(201).json(newEquipment);
  } catch (error) {
    next(error);
  }
};

exports.equipmentList = async (req, res, next) => {
  try {
    const equipment = await Equipment.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
