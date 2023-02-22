const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.classList = require("./classList.model.js")(mongoose);
db.students = require("./students.model.js")(mongoose);
db.category = require("./category.model.js")(mongoose);
db.dates = require("./dates.model.js")(mongoose);
db.causes = require("./causes.model.js")(mongoose);
db.marks = require("./marks.model.js")(mongoose);
db.reciept = require("./reciept.model.js")(mongoose);
db.clubs = require("./clubs.model.js")(mongoose);
db.postAd = require("./postAd.model.js")(mongoose);
module.exports = db;
