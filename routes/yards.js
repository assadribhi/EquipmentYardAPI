const express = require("express");

const {
  fetchYards,
  yardCreate,
  yardDelete,
  yardList,
  yardUpdate,
  equipmentCreate,
} = require("../controllers/yardControllers");

const upload = require("../middleWare/multer");
const passport = require("passport");

const router = express.Router();

router.param("yardId", async (req, res, next, yardId) => {
  const yard = await fetchYards(yardId, next);

  if (yard) {
    req.yard = yard;
    next();
  } else {
    const err = new Error("Yard Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", yardList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("yardImage"),
  yardCreate
);

router.put(
  "/:yardId",
  passport.authenticate("jwt", { session: false }),
  upload.single("yardImage"),
  yardUpdate
);

router.delete(
  "/:yardId",
  passport.authenticate("jwt", { session: false }),
  upload.single("yardImage"),
  yardDelete
);

router.post(
  "/:yardId/equipment",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  equipmentCreate
);

module.exports = router;
