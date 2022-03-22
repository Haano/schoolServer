const db = require("../models");
module.exports.ClassList = require("../models/classList.model");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Reciept = db.reciept;
const Tutorial = db.tutorials;
const ClassList = db.classList;
const Students = db.students;
const Categorys = db.category;
const Dates = db.dates;
const Causes = db.causes;
const Marks = db.marks;

let temp = [];
exports.getFile = (req, res) => {
  console.log(req.body); // the uploaded file object
  let file = req.files.file;
  let fs = require("fs");
  let dir = "uploads/" + req.body.studentID;
  fs.mkdir(dir, (err) => {
    if (err) {
      console.log("Папка не создана", err);
    } // не удалось создать папку
    else {
      console.log("Папка успешно создана");
    }
  });

  let date = new Date(req.body.date);
  let datePrint = date.toLocaleDateString();
  console.log(datePrint, req.body.date);
  let dirToFile =
    dir + "/" + req.body.date + "_" + req.body.id + "_" + req.files.file.name;

  // Use the mv() method to place the file somewhere on your server
  file.mv(
    dir + "/" + req.body.date + "_" + req.body.id + "_" + req.files.file.name,
    function (err) {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
    }
  );

  console.log("Файл можно найти по пути:", dirToFile);
};

exports.sendFile = (req, res) => {
  // //findRecieptByid(req.body.id);
  let a = req.body.date.slice(0, 10);
  Reciept.find({ identifier: req.body.id }, function (err, arr) {
    // const obj = Object.assign({}, arr);
    this.temp = arr;
    //   console.log(arr);
    let file = `${__dirname}/../../uploads/${req.body.studentID}/${a}_${req.body.id}_${this.temp[0].fileName}`;
    console.log(file);

    res.download(file);
  });
  console.log("TEMP:", this.temp);

  //console.log(temp);

  // .toLocaleDateString()

  // const
  //
  //
};

exports.createReciept = (req, res) => {
  console.log("createReciept", req.body, Reciept, Causes, Marks);

  if (!req.body.classID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const reciept = new Reciept({
    classID: req.body.classID,
    studentID: req.body.studentID,
    date: req.body.date,
    cat: req.body.cat,
    amount: req.body.amount,
    identifier: req.body.identifier,
    period: req.body.period,
    fileName: req.body.fileName,
  });

  console.log("createReciept", reciept);
  reciept
    .save(reciept)
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
exports.findReciept = (req, res) => {
  console.log("Find RECIEPT BY CLASS ID", req.body.classID);
  const id = req.body.classID;

  if (id != null) {
    Reciept.find({ classID: id }, function (err, arr) {
      const obj = Object.assign({}, arr);
      res.send(obj);
    });
  } else {
    Reciept.find(function (err, arr) {
      const obj = Object.assign({}, arr);
      res.send(obj);
    });
  }
  return;
};

exports.updateCat = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Students.findByIdAndUpdate(id, {
    Category: req.body[0],
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

exports.findMarks = (req, res) => {
  console.log("Find MARKS BY CLASS ID", req.body.classID, req.body.date);
  const id = req.body.classID;
  const date = req.body.date;
  console.log(date, id);
  if (id != null) {
    if (date) {
      Marks.find({ classID: id, date: date }, function (err, arr) {
        const obj = Object.assign({}, arr);
        console.log(obj);
        res.send(obj);
      });
    } else {
      console.log("АНЙТИ", id.classID);
      Marks.find({ classID: id.classID }, function (err, arr) {
        const obj = Object.assign({}, arr);
        console.log(obj);
        res.send(obj);
      });
    }
  } else {
    Marks.find({ date: date }, function (err, arr) {
      const obj = Object.assign({}, arr);
      res.send(obj);
    });
  }
};

exports.findStudentByClassID = (req, res) => {
  console.log("Find STUDENTS BY CLASS ID", req.body.classID);
  const id = req.body.classID;

  if (id != null) {
    Students.find({ classID: id }, function (err, arr) {
      const obj = Object.assign({}, arr);
      res.send(obj);
    });
  } else {
    Students.find(function (err, arr) {
      const obj = Object.assign({}, arr);
      res.send(obj);
    });
  }
  // Students.findById(id)
  //   .then((data) => {
  //     if (!data)
  //       res.status(404).send({ message: "Not found Tutorial with id " + id });
  //     else res.send(data);
  //   })
  //   .catch((err) => {
  //     res
  //       .status(500)
  //       .send({ message: "Error retrieving Tutorial with id=" + id });
  //   });
  return;
};

exports.findByClassID = (req, res) => {
  console.log("FindBY CLASS ID", req.body);
  const id = req.body.classID;

  ClassList.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
  return;
};

exports.createCauses = (req, res) => {
  console.log("createCauses", req.body);

  if (!req.body.causes) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const causes = new Causes({
    causes: req.body.causes,
  });

  causes
    .save(causes)
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

exports.createDate = (req, res) => {
  console.log("createDate", req.body);

  if (!req.body.date) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const date = new Dates({
    date: req.body.date,
  });

  date
    .save(date)
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

exports.test = (req, res) => {
  console.log(req.body);
  return;
};
///////////////

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.createCategory = (req, res) => {
  console.log("createCategory!!!!!!!!!!", req.body.Category);
  // Validate request
  if (!req.body.Category) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const categoryss = new Categorys({
    cat: req.body.Category,
  });
  // Save Tutorial in the database
  categoryss
    .save(categoryss)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.createMarks = (req, res) => {
  console.log("createMarks!!!!!!!!!!", req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  var arr = new Array();
  arr = req.body;
  // Create a Tutorial
  for (var i = 0; i < arr.length; i++) {
    const marks = new Marks({
      date: arr[i].date,
      classID: arr[i].classID,
      studentID: arr[i].studentID,
      causesID: arr[i].causesID,
      cat: arr[i].cat,
    });
    // Save Tutorial in the database
    marks.save(marks);
  }

  return;
};

exports.getCategorys = (req, res) => {
  const title = req.query.cat;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Categorys.find(condition)
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

exports.getAllCauses = (req, res) => {
  const title = req.query.causes;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Causes.find(condition)
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

exports.getAllClass = (req, res) => {
  const title = req.query.className;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  ClassList.find(condition)
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
//////////// Students ////////////////
exports.getAllStudents = (req, res) => {
  console.log("НАЙТИ ВСЕ");

  const title = req.query.className;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Students.find(condition)
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

exports.createStudent = (req, res) => {
  console.log("createStudent", req.body);

  if (!req.body.classID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const student = new Students({
    classID: req.body.classID,
    LastName: req.body.LastName,
    FirstName: req.body.FirstName,
    Surname: req.body.Surname,
    //ReceiptDate: req.body.ReceiptDate,
    Category: req.body.Category,
  });

  student
    .save(student)
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
exports.deleteStudent = (req, res) => {
  console.log("createStudent", req.body);
  if (!req.params.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const id = req.params.id;
  Students.findByIdAndRemove(id)
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
/////////// Students///////////
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

exports.updateMark = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  console.log("updateMark!!!!!!!!!!", req.body.causes, id);

  Marks.findByIdAndUpdate(id, {
    date: req.body.date,
    causesID: req.body.causes,
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

exports.createClass = (req, res) => {
  if (!req.body.className) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const sclass = new ClassList({
    className: req.body.className,
    classLider: req.body.classLider,
    shift: req.body.shiftSchool,
  });

  sclass
    .save(sclass)
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
exports.deleteCauses = (req, res) => {
  const id = req.params.id;
  Causes.findByIdAndRemove(id)
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
exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  Categorys.findByIdAndRemove(id)
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

exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        //потом оставить только это//
        ClassList.findByIdAndRemove(id)
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

        //** */
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

exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
