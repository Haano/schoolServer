const db = require("../models");

const Settings = db.settings;

exports.getTelegramToken = (req, res) => {
  console.log("Get Token Telegram ");
  Settings.find({ name: "TelegramBotToken" }, {}, function (err, result) {
    if (result.length > 0) {
      let token = result[0].value;
      console.log(token);
      res.send(token);
    } else {
      let token = "";
      res.send(token);
    }
  });
};

exports.createTelegramToken = (req, res) => {
  console.log("Create Token Telegram ", req.body.token);

  const newToken = req.body.token;

  const token = new Settings({
    name: "TelegramBotToken",
    value: newToken,
  });

  Settings.find({}, { name: "TelegramBotToken" }, function (err, result) {
    console.log(result.length);
    if (result.length == 0) {
      token.save(token).then((data) => {
        res.send(data);
      });
    }
  });
};

exports.updateTelegramToken = (req, res) => {
  console.log("Update Token Telegram ");

  let newToken = req.body.token;
  Settings.updateOne(
    { name: "TelegramBotToken" },
    { $set: { value: newToken } },
  )
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
