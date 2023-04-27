const db = require("../models");

const weekMenu = db.weekMenu;

exports.createDay = (req, res) => {
  console.log("createDayPostMenu");

  if (!req.body.date) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  console.log(req.body);
  const day = new weekMenu({
    date: req.body.date,
    bludo1: req.body.bludo1,
    bludo2: req.body.bludo2,
    bludo3: req.body.bludo3,
    bludo4: req.body.bludo4,
    day: req.body.day,
  });

  weekMenu
    .find({ date: req.body.date })
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        day
          .save(day)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some error occurred ",
            });
          });
      } else {
        res.status(500).send({
          message: err.message || "Some error occurred ",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.updateDayWeekMenu = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  console.log(req.params.id, req.body);

  const id = req.params.id;

  weekMenu
    .findByIdAndUpdate(id, {
      bludo1: req.body.bludo1,
      bludo2: req.body.bludo2,
      bludo3: req.body.bludo3,
      bludo4: req.body.bludo4,
      day: req.body.day,
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
exports.deleteDayWeekMenu = (req, res) => {
  console.log("deleteMenu", console.log(req.body));
  if (!req.body._id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const id = req.body._id;
  weekMenu
    .findByIdAndRemove(id)
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

exports.findDayWeekMenuByDateRange = (req, res) => {
  console.log("findDayWeekMenuByDateRange");
  console.log(req.body);
  weekMenu.find(
    {
      date: {
        $gte: new Date(req.body.dateFrom),
        $lte: new Date(req.body.dateBefore),
      },
    },
    function (err, arr) {
      const obj = Object.assign({}, arr);
      console.log(obj);
      res.send(obj);
    }
  );
};

exports.addclassDayWeekMenu = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  console.log("Попытка добавления ", req.body);
  const id = req.body.dayID;
  let check = false;
  weekMenu
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else {
        console.log(data);

        for (let i = 0; i < data.bludo1.class.length; i++) {
          if (data.bludo1.class[i].className === req.body.className) {
            check = true;

            console.log("ПРОХОД");

            weekMenu
              .updateOne(
                { _id: id, "bludo1.class.className": req.body.className },
                { $set: { "bludo1.class.$.count": req.body.bludo1 } }
              )
              .then(() => {
                weekMenu
                  .updateOne(
                    { _id: id, "bludo2.class.className": req.body.className },
                    { $set: { "bludo2.class.$.count": req.body.bludo2 } }
                  )
                  .then(() => {
                    weekMenu
                      .updateOne(
                        {
                          _id: id,
                          "bludo3.class.className": req.body.className,
                        },
                        { $set: { "bludo3.class.$.count": req.body.bludo3 } }
                      )
                      .then(() => {
                        weekMenu
                          .updateOne(
                            {
                              _id: id,
                              "bludo4.class.className": req.body.className,
                            },
                            {
                              $set: { "bludo4.class.$.count": req.body.bludo4 },
                            }
                          )
                          .then((data) => {
                            if (!data) {
                              res.status(404).send({
                                message: `Cannot update Telegram with id=${id}. Ошибка`,
                              });
                            } else res.send({ message: "Успешно" });
                          })
                          .catch((err) => {
                            res.status(500).send({
                              message: "Error updating Telegram with id=" + id,
                            });
                          });
                      });
                  });
              });
          }
        }

        if (!check) {
          weekMenu
            .findByIdAndUpdate(id, {
              $push: {
                "bludo1.class": {
                  count: req.body.bludo1,
                  className: req.body.className,
                },
                "bludo2.class": {
                  count: req.body.bludo2,
                  className: req.body.className,
                },
                "bludo3.class": {
                  count: req.body.bludo3,
                  className: req.body.className,
                },
                "bludo4.class": {
                  count: req.body.bludo4,
                  className: req.body.className,
                },
              },
            })
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Telegram with id=${id}. Ошибка`,
                });
              } else res.send({ message: "Успешно" });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating Telegram with id=" + id,
              });
            });
        }
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};
