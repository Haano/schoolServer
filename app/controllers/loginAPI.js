const db = require("../models");

const ClassList = db.classList;

exports.userLogin = (req, res) => {
  console.log("LOGIN ", req.body);
  if (!req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let passwordString = req.body.password.toString();
  if (req.body.className === "АДМИНИСТРАТОР") {
    console.log("попытка входа", req.body.password);
    if (req.body.password === "01091867")
      res.send({ auth: true, accessRights: 2 });
    else res.send({ auth: false });
  } else {
    ClassList.find({ className: req.body.className }, function (err, result) {
      let obj = Object.assign({}, result);
      console.log("попытка входа", obj[0].password, " ", req.body.password);
      if (passwordString === obj[0].password)
        res.send({ auth: true, accessRights: 1 });
      else res.send({ auth: false });
    });
  }
};

exports.updatePassword = (req, res) => {
  console.log("смена пароля", req.body);
  if (!req.body.passwordChange) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  ClassList.updateMany({ shift: "2 смена" }, { $set: { password: 1 } }).then(
    (data) => {
      console.log(data);
    }
  );

  //   ClassList.findByIdAndUpdate(id, {
  //     password: pas,
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       if (!data) {
  //         res.status(404).send({
  //           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
  //         });
  //       } else res.send({ message: "Tutorial was updated successfully." });
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: "Error updating Tutorial with id=" + id,
  //       });
  //     });
};
