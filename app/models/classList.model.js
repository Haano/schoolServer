module.exports = (mongoose) => {
  const classList = mongoose.model(
    "classList",
    mongoose.Schema(
      {
        className: String,
        classLider: String,
        shift: String,
      },
      { timestamps: true }
    )
  );

  return classList;
};
