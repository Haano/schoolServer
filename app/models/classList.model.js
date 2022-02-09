module.exports = (mongoose) => {
  const classList = mongoose.model(
    "classList",
    mongoose.Schema(
      {
        className: String,
        classLider: String,
      },
      { timestamps: true }
    )
  );

  return classList;
};
