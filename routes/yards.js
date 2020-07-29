const express = require("express");

const {
  fetchYards,
  yardCreate,
  yardDelete,
  yardList,
  yardUpdate,
  equipmentCreate,
} = require("../controllers/yardControllers");

const upload = require("../middleware/multer");

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

router.post("/", upload.single("yardImage"), yardCreate);

router.put("/:yardId", upload.single("yardImage"), yardUpdate);

router.delete("/:yardId", upload.single("yardImage"), yardDelete);

router.post("/:yardId/equipment", upload.single("image"), equipmentCreate);

module.exports = router;
