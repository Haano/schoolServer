module.exports = (mongoose) => {
  const students = mongoose.model(
    "students",
    mongoose.Schema(
      {
        classID: String,
        LastName: String,
        FirstName: String,
        Surname: String,
        Clubs: Array,
        // ReceiptDate: Date,
        Category: String,
        Order: Object,
      },
      { timestamps: true }
    )
  );

  return students;
};
