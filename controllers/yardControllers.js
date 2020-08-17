const { Yard, Equipment, User } = require("../db/models");
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
    const foundYard = await Yard.findOne({ where: { userId: req.user.id } });
    if (foundYard) {
      const err = new Error("You already have Yard");
      err.status = 403;
      next(err);
    } else {
      if (req.file) {
        req.body.yardImage = `${
          process.env.PORT ? "https" : "http"
        }://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.userId = req.user.id;
      const newYard = await Yard.create(req.body);
      res.status(201).json(newYard);
    }
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
        {
          model: User,
          as: "user",
          attributes: ["username"],
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
    if (req.user.role === "admin" || req.user.id === req.yard.userId) {
      if (req.file) {
        req.body.yardImage = `${
          process.env.PORT ? "https" : "http"
        }://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.yard.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.yardDelete = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.yard.userId) {
      await req.yard.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.equipmentCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.yard.userId) {
      if (req.file) {
        req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
          "host"
        )}/media/${req.file.filename}`;
      }
      req.body.yardId = req.yard.id;
      const newEquipment = await Equipment.create(req.body);
      res.status(201).json(newEquipment);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
