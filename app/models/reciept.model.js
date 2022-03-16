module.exports = (mongoose) => {
  const reciept = mongoose.model(
    "marks",
    mongoose.Schema(
      {
        classID: String,
        studentID: String,
        date: Date,
        cat: String,
        causesID: String,
        amount: Float32Array,
        ID: String,
        period: String,
      },
      { timestamps: true }
    )
  );

  return receipt;
};
