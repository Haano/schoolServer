//change 10.02.2022 22:08

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

var corsOptions = {
  //   origin: "*",
  //   methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  // =======
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // origin: true,
  // credentials: true,
};

app.use(fileUpload());
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "ngrok-skip-browser-warning"
    // "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
require("./app/routes/tutorial.routes")(app, {});

const PORT = process.env.PORT || 8081;

let count = 0;
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("connection", function (socket) {
    count++;
    console.log("Активные подключения ", count);
    socket.on("close", function () {
      count--;
      console.log("Активные подключения ", count);
    });
  });
