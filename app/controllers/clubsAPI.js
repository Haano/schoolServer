const db = require("../models");

const Clubs = db.clubs;

exports.createClub = (req, res) => {
  console.log("createCauses", req.body);

  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const club = new Clubs({
    name: req.body.name,
    level: req.body.level,
    profile: req.body.profile,
    location: req.body.location,
    students: [],
  });

  club
    .save(club)
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

exports.getAllClubs = (req, res) => {
  console.log("НАЙТИ ВСЕ Clubs");

  Clubs.find()
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
