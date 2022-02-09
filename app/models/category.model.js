module.exports = (mongoose) => {
  const category = mongoose.model(
    "category",
    mongoose.Schema(
      {
        cat: String,
      },
      { timestamps: true }
    )
  );

  return category;
};
