const { Yard, Equipment } = require("../db/models");
const slugify = require("slugify");

exports.fetchYards = async (yardId, next) => {
  try {
    const yard = await Yard.findByPk(yardId);
    return yard;
  } catch (error) {
    next(error);
  }
};

exports.yardCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.yardImage = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newYard = await Yard.create(req.body);
    res.status(201).json(newYard);
  } catch (error) {
    next(error);
  }
};

exports.yardList = async (req, res, next) => {
  try {
    const yard = await Yard.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Equipment,
          as: "equipment",
          attributes: ["id"],
        },
      ],
    });
    res.json(yard);
  } catch (error) {
    next(error);
  }
};

exports.yardUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.yardImage = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.yard.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.yardDelete = async (req, res, next) => {
  try {
    await req.yard.destroy();
    res.status(204).end();
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
    req.body.yardId = req.yard.id;
    const newEquipment = await Equipment.create(req.body);
    res.status(201).json(newEquipment);
  } catch (error) {
    next(error);
  }
};
