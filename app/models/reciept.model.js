// 17.03.2022
module.exports = (mongoose) => {
  const reciept = mongoose.model(
    "marks",
    mongoose.Schema(
      {
        classID: String,
        studentID: String,
        date: Date,
        cat: String,
        amount: Float32Array,
        identifier: String,
        period: String,
      },
      { timestamps: true }
    )
  );

  return receipt;
};
