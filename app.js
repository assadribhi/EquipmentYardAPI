const express = require("express");
const cors = require("cors");

let equipment = require("./equipment");

const app = express();

app.use(cors());

app.get("/equipment", (req, res) => {
  res.json(equipment);
});

app.delete("/equipment/:equipmentId", async (req, res) => {
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
});

app.listen(8000, () => {
  console.log("This Works!!!!!");
});
