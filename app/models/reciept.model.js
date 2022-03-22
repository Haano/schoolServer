module.exports = (mongoose) => {
  const reciept = mongoose.model(
    "reciept",
    mongoose.Schema(
      {
        classID: String,
        studentID: String,
        date: Date,
        cat: String,
        amount: Number,
        identifier: String,
        period: String,
        fileName: String,
      },
      { timestamps: true }
    )
  );
  return reciept;
};
