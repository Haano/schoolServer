module.exports = (mongoose) => {
  const Causes = mongoose.model(
    "causes",
    mongoose.Schema(
      {
        causes: String,
      },
      { timestamps: true }
    )
  );

  return Causes;
};
