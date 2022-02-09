module.exports = (mongoose) => {
  const students = mongoose.model(
    "students",
    mongoose.Schema(
      {
        classID: String,
        LastName: String,
        FirstName: String,
        Surname: String,
        // ReceiptDate: Date,
        Category: String,
      },
      { timestamps: true }
    )
  );

  return students;
};
