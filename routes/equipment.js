const express = require("express");

const {
  equipmentCreate,
  equipmentList,
  equipmentUpdate,
  equipmentDelete,
} = require("../controllers/equipmentControllers");

const router = express.Router();

router.get("/", equipmentList);

router.post("/", equipmentCreate);

router.put("/:equipmentId", equipmentUpdate);

router.delete("/:equipmentId", equipmentDelete);

module.exports = router;
