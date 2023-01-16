const { Int32 } = require("mongodb");

module.exports = (mongoose) => {
  const marks = mongoose.model(
    "marks",
    mongoose.Schema(
      {
        date: Date,
        classID: String,
        studentID: String,
        cat: String,
        causesID: String,
        countEating: Number,
      },
      { timestamps: true }
    )
  );

  return marks;
};
