module.exports = (mongoose) => {
  const dates = mongoose.model(
    "dates",
    mongoose.Schema(
      {
        date: Date,
      },
      { timestamps: true }
    )
  );

  return dates;
};
