const slugify = require("slugify");

let equipment = require("../equipment");

exports.equipmentCreate = (req, res) => {
  const id = equipment[equipment.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newEquipment = { id, slug, ...req.body };
  equipment.push(newEquipment);
  res.status(201).json(newEquipment);
};

exports.equipmentList = (req, res) => {
  res.json(equipment);
};

exports.equipmentUpdate = (req, res) => {
  const { equipmentId } = req.params;
  const foundEquipment = equipment.find(
    (equipment) => equipment.id === +equipmentId
  );

  if (foundEquipment) {
    for (const key in req.body) foundEquipment[key] = req.body[key];
    res.status(204).end();
  } else res.status(404).json({ message: "Equipment Not Found" });
};

exports.equipmentDelete = (req, res) => {
  const { equipmentId } = req.params;
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
