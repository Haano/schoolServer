const db = require("../models");

const Clubs = db.clubs;
const Students = db.students;

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

exports.addClubStudent = (req, res) => {
  let clubsStudentNow = req.body.clubsNow;
  const idStudent = req.body.idStudent;

  let tempClubsID = [];

  for (let i = 0; i < clubsStudentNow.length; i++) {
    tempClubsID.push(clubsStudentNow[i]._id);
  }
  console.log(tempClubsID, " Попытка добавить клубы");

  Students.findByIdAndUpdate(idStudent, {
    Clubs: tempClubsID,
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

  // Students.updateOne({ _id: idStudent }, { $set: { Сlubs: ["tempClubsID"] } })
  //   .then((data) => {
  //     console.log(data);
  //     if (!data) {
  //       console.log("Ошибка!");
  //     } else console.log("Я обновил у студента ", idStudent, " список клубов");
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating Tutorial with id=",
  //     });
  //   });

  Clubs.updateMany({}, { $pull: { students: idStudent } })
    .then((data) => {
      if (!data) {
        console.log("Ошибка!");
      } else console.log("Удалил везде студента!");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });

  for (let i = 0; i < clubsStudentNow.length; i++) {
    Clubs.updateOne(
      { _id: clubsStudentNow[i] },
      { $addToSet: { students: idStudent } }
    )
      .then((data) => {
        if (!data) {
          console.log("Ошибка");
        } else console.log("Успешно добавил студента");
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  }
};
