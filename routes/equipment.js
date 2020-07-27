const express = require("express");

const {
  equipmentList,
  equipmentUpdate,
  equipmentDelete,
  fetchEquipment,
} = require("../controllers/equipmentControllers");

const upload = require("../middleWare/multer");

const router = express.Router();

router.param("equipmentId", async (req, res, next, equipmentId) => {
  const equipment = await fetchEquipment(equipmentId, next);

  if (equipment) {
    req.equipment = equipment;
  } else {
    const err = new Error("Equipment Not Found");
    err.status = 404;
    next(err);
  }
  next();
});

router.get("/yards/:yardId/equipment", equipmentList);

router.put("/:equipmentId", upload.single("image"), equipmentUpdate);

router.delete("/:equipmentId", equipmentDelete);

module.exports = router;
