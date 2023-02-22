const db = require("../models");

const AD = db.postAd;

exports.createAD = (req, res) => {
  console.log("создать объявление", req.body);

  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const adNew = new AD({
    title: req.body.title,
    text: req.body.text,
    privated: req.body.privated,
    link: req.body.link,
  });

  console.log(adNew);
  adNew
    .save(adNew)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ClassList.",
      });
    });
};

exports.getAllAD = (req, res) => {
  console.log("Получить объявления");

  AD.find()
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

exports.deleteAD = (req, res) => {
  console.log("deleteAD");
  if (!req.params.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const id = req.params.id;
  AD.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
