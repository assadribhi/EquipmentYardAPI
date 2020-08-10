const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signup, signIn } = require("../controllers/userControllers");

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
router.post("/signup", signup);

module.exports = router;
