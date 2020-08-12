const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const { Yard } = require("../db/models");

const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signIn = async (req, res) => {
  const { user } = req;
  const yard = await Yard.findOne({ where: { userId: user.id } });
  const payload = {
    id: user.id,
    username: user.username,
    yardSlug: yard ? yard.slug : null,
    role: user.role,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: user.id,
      username: user.username,
      yardSlug: null,
      role: user.role,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
