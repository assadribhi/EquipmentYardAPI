const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username },
    });

    let passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    passwordsMatch ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});
