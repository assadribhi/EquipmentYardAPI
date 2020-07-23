const { Equipment } = require("../db/models");
const slugify = require("slugify");

let equipment = require("../equipment");

exports.equipmentCreate = async (req, res) => {
  try {
    const newEquipment = await Equipment.create(req.body);
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.equipmentList = async (req, res) => {
  try {
    const equipment = await Equipment.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.equipmentUpdate = async (req, res) => {
  const { equipmentId } = req.params;
  try {
    const foundEquipment = await Equipment.findByPk(equipmentId);
    if (foundEquipment) {
      await foundEquipment.update(req.body);
      res.status(204).end();
    } else res.status(404).json({ message: "Equipment Not Found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.equipmentDelete = async (req, res) => {
  const { equipmentId } = req.params;
  try {
    const foundEquipment = await Equipment.findByPk(equipmentId);
    if (foundEquipment) {
      await foundEquipment.destroy();
      res.status(204).end();
    } else res.status(404).json({ message: "Equipment Not Found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  const foundEquipment = equipment.find(
    (equipment) => equipment.id === +equipmentId
  );

  if (foundEquipment) {
    equipment = equipment.filter((equipment) => equipment !== foundEquipment);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Equipment Not Found" });
  }
};
