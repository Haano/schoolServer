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
        telegram: Array,
      },
      { timestamps: true }
    )
  );

  return students;
};
