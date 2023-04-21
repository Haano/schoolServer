module.exports = (mongoose) => {
  const settings = mongoose.model(
    "settings",
    mongoose.Schema(
      {
        name: String,
        value: String,
      },
      { timestamps: true }
    )
  );
  return settings;
};
