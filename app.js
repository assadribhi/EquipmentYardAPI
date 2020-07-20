const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

let equipment = require("./equipment");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/equipment", (req, res) => {
  res.json(equipment);
});

app.post("/equipment", (req, res) => {
  const id = equipment[equipment.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newEquipment = { id, slug, ...req.body };
  equipment.push(newEquipment);
  res.status(201).json(newEquipment);
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
