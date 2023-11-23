const db = require("../models");

const INV = db.inventory;

exports.createINV = (req, res) => {
  console.log("создать позицию инвентаря", req.body);

  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const invNew = new INV({
    name: req.body.name,
    schoolID: req.body.schoolID,
    serialNumber: req.body.serialNumber,
    group: req.body.group,
    quantity: req.body.quantity,
    used: req.body.used,
    location: req.body.location,
    federalProgram: req.body.federalProgram,
  });

  console.log(invNew);
  invNew
    .save(invNew)
    .then((data) => {
      console.log("Успешно");
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ClassList.",
      });
    });
};

exports.getAllINV = (req, res) => {
  console.log("НАЙТИ весь инвентарь");

  INV.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.updateINV = (req, res) => {
  console.log("Обновить инвентарь", req.body, req.params.id);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  INV.findByIdAndUpdate(id, {
    name: req.body.name,
    schoolID: req.body.schoolID,
    serialNumber: req.body.serialNumber,
    group: req.body.group,
    quantity: req.body.quantity,
    used: true,
    location: req.body.location,
    federalProgram: req.body.federalProgram,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
