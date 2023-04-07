const db = require("../models");
module.exports.ClassList = require("../models/classList.model");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
const { time } = require("console");

const Reciept = db.reciept;
const Tutorial = db.tutorials;
const ClassList = db.classList;
const Students = db.students;
const Categorys = db.category;
const Dates = db.dates;
const Causes = db.causes;
const Marks = db.marks;

let temp = [];

exports.getDateWorld = (req, res) => {
  console.log("запрос даты");
  let date;
  date = new Date();
  date.setHours(date.getHours() + 3);

  let tempDate = new Date(date);
  console.log(date, tempDate);
  res.send(tempDate);
};

exports.deleteDublecateMarks = (req, res) => {
  console.log("Dublicate DEL", req.body.date);

  const date = req.body.date;

  Marks.find({ date: date }, function (err, arr) {
    let duble = [];
    let students = [];
    console.log(arr.length);

    for (let i = 0; i < arr.length; i++) {
      students.push(arr[i].studentID);
    }

    let uniqueArray = [...new Set(students)];

    console.log(uniqueArray.length);

    for (let i = 0; i < uniqueArray.length; i++) {
      Marks.find(
        { date: date, studentID: uniqueArray[i] },
        function (err, arr2) {
          if (arr2.length > 1) {
            console.log("нашел!", arr2.length);
            for (let j = 1; j < arr2.length; j++) {
              console.log("попытка удаления", arr2[j]._id);
              Marks.findByIdAndRemove(arr2[j]._id).then((data) => {
                if (!data) {
                  console.log("Неудачно");
                } else {
                  console.log("Удачно");
                }
              });
            }
          }
        }
      );
    }

    //const obj = Object.assign({}, arr);
  });
};

exports.loadImportStudentsTemplates = (req, res) => {
  // //findRecieptByid(req.body.id);
  let filename = "import_students.xlsx";
  let file = `${__dirname}/../../Templates/${filename}`;

  console.log(file);
  res.download(file);
  // let file = `${__dirname}/../../Templates/import_students.xlsx`;

  //   console.log(file);
  //   // res.send(file);
  //   res.download(file, (err) => {
  //       console.log(err);
  //   });
};
exports.loadImportClassTemplates = (req, res) => {
  let filename = "import_class.xlsx";
  let file = `${__dirname}/../../Templates/${filename}`;

  console.log(file);
  res.download(file);
};
exports.getFile = (req, res) => {
  console.log("getfile(), CREATE FILE", req.body);

  Reciept.find({ identifier: req.body.id }, function (err, arr) {
    console.log(arr, err);
    if (arr.length == 0) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    } else {
      console.log("попытка создания папки");
      // the uploaded file object
      let file = req.files.file;
      let fs = require("fs");
      let dir = "uploads/" + req.body.className + "_" + req.body.classID;
      fs.mkdir(dir, (err) => {
        if (err) {
          console.log("Папка не создана", err);
        } // не удалось создать папку
        else {
          console.log("Папка успешно создана");
        }
      });
      dir = dir + "/" + req.body.studentID;
      fs.mkdir(dir, (err) => {
        if (err) {
          console.log("Папка не создана", err);
        } // не удалось создать папку
        else {
          console.log("Папка успешно создана");
        }
      });

      // let date = new Date(req.body.date);
      // let datePrint = date.toLocaleDateString();
      // console.log(datePrint, req.body.date);
      let dirToFile =
        dir +
        "/" +
        req.body.date +
        "_" +
        req.body.id +
        "_" +
        req.files.file.name;

      // Use the mv() method to place the file somewhere on your server
      file.mv(
        dir +
          "/" +
          req.body.date +
          "_" +
          req.body.id +
          "_" +
          req.files.file.name,
        function (err) {
          if (err) return res.status(500).send(err);

          res.send("File uploaded!");
        }
      );

      console.log("Файл можно найти по пути:", dirToFile);
    }
  });
};

exports.sendFile = (req, res) => {
  // //findRecieptByid(req.body.id);
  let a = req.body.date.slice(0, 10);
  Reciept.find({ identifier: req.body.id }, function (err, arr) {
    // const obj = Object.assign({}, arr);
    this.temp = arr;
    //   console.log(arr);
    let file = `${__dirname}/../../uploads/${req.body.className}_${req.body.classID}/${req.body.studentID}/${a}_${req.body.id}_${this.temp[0].fileName}`;

    res.download(file, "213");
  });
};

exports.createReciept = (req, res) => {
  console.log("Create Reciept");
  if (!req.body.classID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Reciept.find({ identifier: req.body.identifier }, function (err, arr) {
    if (arr.length != 0) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    } else {
      const reciept = new Reciept({
        classID: req.body.classID,
        studentID: req.body.studentID,
        date: req.body.date,
        cat: req.body.cat,
        amount: req.body.amount,
        identifier: req.body.identifier,
        period: req.body.period,
        fileName: req.body.fileName,
        pay: false,
      });

      reciept
        .save(reciept)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the ClassList.",
          });
        });
    }
  });
};

exports.createRecieptNotCheck = (req, res) => {
  console.log("Create Reciept");
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
    pay: false,
  });
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

exports.findRecieptByDateRange = (req, res) => {
  console.log("Find RECIEPT BY CLASS ID");
  const id = req.body.classID;
  const studentID = req.body.studentID;
  if (id != null) {
    if (studentID != null) {
      Reciept.find(
        {
          classID: id,
          studentID: studentID,
          date: { $gte: req.body.dateFrom, $lte: req.body.dateBefore },
        },
        function (err, arr) {
          const obj = Object.assign({}, arr);
          res.send(obj);
        }
      );
    } else {
      Reciept.find(
        {
          classID: id,
          date: { $gte: req.body.dateFrom, $lte: req.body.dateBefore },
        },
        function (err, arr) {
          const obj = Object.assign({}, arr);
          res.send(obj);
        }
      );
    }
  } else {
    Reciept.find(function (err, arr) {
      const obj = Object.assign({}, arr);
      res.send(obj);
    });
  }
  return;
};

exports.deleteReciept = (req, res) => {
  const id = req.params.id;
  console.log("delete RECIEPT ID = ", id);

  //найти квитанцию
  Reciept.find({ _id: id }, function (err, arr) {
    let a = new Date(arr[0].date).toISOString().slice(0, 10);
    //для пути к файлу: найти класс(находит все классы сразу, т.к. при экспорте в БД не нормально делает _id для класса..)
    ClassList.find({}, function (err, arrClass) {
      for (let i = 0; i < arrClass.length; i++) {
        let objectId = mongoose.Types.ObjectId(arr[0].classID);

        if (arrClass[i]._id.toString() === objectId.toString()) {
          let file = `${__dirname}/../../uploads/${
            arrClass[i].className
          }_${arrClass[i]._id.toString()}/${arr[0].studentID}/${a}_${
            arr[0].identifier
          }_${arr[0].fileName}`;

          let fs = require("fs");
          fs.unlink(file, (err) => {
            if (err) console.log(err); // не удалось удалить файл
            console.log("Файл успешно удалён");
          });

          Reciept.findByIdAndRemove(id)
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
        }
      }
    });

    //   });
  });
};

exports.PayReciept = (req, res) => {
  console.log("PAY Reciept", req.body.recieptList);
  if (!req.body.recieptList) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Reciept.updateMany({ _id: { $in: req.body.recieptList } }, { pay: true })
    .then((data) => {
      if (!data) {
        console.log("Ошибка!");
      } else {
        console.log("Обновил статус квитанции!");
        res.send({ message: "Успешно" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
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

exports.updateCatOrderStudent = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Students.findByIdAndUpdate(id, {
    Order: req.body[0],
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
  if (id != null) {
    if (date) {
      Marks.find({ classID: id, date: date }, function (err, arr) {
        const obj = Object.assign({}, arr);

        res.send(obj);
      });
    } else {
      Marks.find({ classID: id.classID }, function (err, arr) {
        const obj = Object.assign({}, arr);

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
exports.findMarksByDateRange = (req, res) => {
  console.log("Find MARKS BY CLASS ID", req.body.classID);
  const id = req.body.classID;

  if (id != null) {
    if (req.body.studentID == null) {
      Marks.find(
        {
          classID: id.classID,
          date: { $gte: req.body.dateFrom, $lte: req.body.dateBefore },
        },
        function (err, arr) {
          const obj = Object.assign({}, arr);

          res.send(obj);
        }
      );
    } else {
      Marks.find(
        {
          classID: id.classID,
          date: { $gte: req.body.dateFrom, $lte: req.body.dateBefore },
          studentID: req.body.studentID,
        },
        function (err, arr) {
          const obj = Object.assign({}, arr);

          res.send(obj);
        }
      );
    }
  } else {
    Marks.find(
      { date: { $gte: req.body.dateFrom, $lte: req.body.dateBefore } },
      function (err, arr) {
        const obj = Object.assign({}, arr);
        res.send(obj);
      }
    );
  }
};

exports.findStudentByClassID = (req, res) => {
  console.log("Find STUDENTS BY CLASS ID", req.body.classID);
  const id = req.body.classID;

  Students;

  if (id != null) {
    Students.find(
      { classID: id },
      null,
      { sort: "FirstName" },
      function (err, arr) {
        const obj = Object.assign({}, arr);
        res.send(obj);
      }
    );
  } else {
    Students.find({}, null, { sort: "FirstName" }, function (err, arr) {
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
  console.log("FindBY CLASS ID");
  const id = req.body.classID;

  ClassList.findById(id, null, { sort: "className" })
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
  console.log("createCauses");

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
  console.log("createDate");

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
  res.send("Hello, test OK");
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

exports.createMarks = async (req, res) => {
  console.log("createMarks!!!!!!!!!!");
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  var arr = new Array();
  arr = req.body;
  // Create a Tutorial
  // for (var i = 0; i < arr.length; i++) {
  //   let tempCountEating = 0;
  //   if (arr[i].countEating != undefined && arr[i].countEating != null) {
  //     tempCountEating = arr[i].countEating;
  //   }
  //   const marks = new Marks({
  //     date: arr[i].date,
  //     classID: arr[i].classID,
  //     studentID: arr[i].studentID,
  //     causesID: arr[i].causesID,
  //     cat: arr[i].cat,
  //     countEating: tempCountEating,
  //   });
  //   // Save Tutorial in the database
  //   // await Marks.find({
  //   //   classID: arr[i].classID,
  //   //   studentID: arr[i].studentID,
  //   //   date: arr[i].date,
  //   // }).then((data) => {
  //   //   if (data.length === 0) {
  //   //     marks.save(marks);
  //   //   }
  //   // });
  // }

  // фильтруем
  const allIds = arr.map((item) => {
    return {
      classID: item.classID,
      studentID: item.studentID,
      date: item.date,
    };
  });

  let arrClassID = [];
  let arrStudentID = [];
  let arrDate = [];
  for (let i = 0; i < allIds.length; i++) {
    arrClassID.push(allIds[i].classID);
    arrStudentID.push(allIds[i].studentID);
    arrDate.push(allIds[i].date);
  }
  console.log(
    "отправка на ",
    arrDate[0],
    arrClassID[0],
    "количество:",
    arrStudentID.length
  );
  const existingRecords = await Marks.find({
    classID: arrClassID[0],
    studentID: { $in: arrStudentID },
    date: arrDate[0],
  });
  const existingIds = existingRecords.map((r) => r.studentID);
  const missingItems = arr.filter(
    (item) => !existingIds.includes(item.studentID)
  );

  // console.log("ALL:", allIds.length);
  //console.log("2:", existingRecords);
  //console.log("missingItems", missingItems);
  // пишем
  const result = await db.marks
    .insertMany(
      missingItems.map((item) => ({
        classID: item.classID,
        studentID: item.studentID,
        date: item.date,
        causesID: item.causesID,
        cat: item.cat,
        countEating: item.countEating,
      }))
    )
    .then((data) => {
      console.log("создано:", data.length);
      res.send({ message: "OK!", countMarks: data.length });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
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

  ClassList.find(condition, { password: 0 }, { sort: "className" })
    .then((data) => {
      // Website you wish to allow to connect
      res.header(
        "ngrok-skip-browser-warning"
        // "Origin, X-Requested-With, Content-Type, Accept",
      );
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
  console.log("createStudent");

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
  console.log("deleteStudent");
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
    countEating: req.body.countEating,
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
exports.updateMarkAdmin = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  console.log("updateMarkADMIN!!!!!!!!!!", req.body, id);

  Marks.findByIdAndUpdate(id, {
    date: req.body.date,
    causesID: req.body.causes,
    countEating: req.body.countEating,
    cat: req.body.cat,
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

exports.createMarksEating = (req, res) => {
  Marks.updateMany(
    { causesID: { $eq: "Питался" } },
    { $set: { countEating: 1 } }
  )
    .then((data) => {
      if (!data) {
        console.log("Ошибка!");
      } else {
        console.log("Обновил все марки");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.createClass = (req, res) => {
  if (!req.body.className) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  console.log(req.body);

  const sclass = new ClassList({
    className: req.body.className,
    classLider: req.body.classLider,
    shift: req.body.shiftSchool,
    password: req.body.password,
    level: req.body.level,
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

exports.updateLevelEduClass = (req, res) => {
  console.log("смена уровня образования", req.body);
  if (!req.body.level) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  ClassList.findByIdAndUpdate(req.body.id, {
    level: req.body.level,
  })
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(404).send({
          message: `Cannot updatePassword with id=${req.body.id}. Maybe class was not found!`,
        });
      } else res.send({ message: "Password was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + req.body.id,
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
