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
        pay: Boolean,
      },
      { timestamps: true }
    )
  );
  return reciept;
};
