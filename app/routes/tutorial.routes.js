module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  router.post("/findByClassID/:id", tutorials.findByClassID);
  router.post("/findStudentByClassID/:id", tutorials.findStudentByClassID);

  router.post("/findMarks/:id", tutorials.findMarks);
  router.put("/updateMark/:id", tutorials.updateMark);

  router.post("/test", tutorials.test);
  router.get("/getAllClass", tutorials.getAllClass);

  router.get("/getAllCauses", tutorials.getAllCauses);

  router.get("/getCategory", tutorials.getCategorys);
  router.post("/createClass", tutorials.createClass);

  router.post("/createDate", tutorials.createDate);
  router.post("/createCauses", tutorials.createCauses);
  router.post("/createMarks", tutorials.createMarks);

  router.post("/createStudent", tutorials.createStudent);

  router.post("/createCategory", tutorials.createCategory);
  // Create a new Tutorial
  router.post("/tutorials", tutorials.create);

  // Retrieve all Tutorials
  router.get("/tutorials", tutorials.findAll);

  // Retrieve all published Tutorials
  //router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/tutorials/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/tutorials/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/tutorials/:id", tutorials.delete);
  router.delete("/causes/:id", tutorials.deleteCauses);
  router.delete("/category/:id", tutorials.deleteCategory);

  // Create a new Tutorial
  router.delete("/tutorials", tutorials.deleteAll);

  app.use("/tutorials", router);
};
