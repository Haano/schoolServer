module.exports = (mongoose) => {
  const weekMenu = mongoose.model(
    "weekMenu",
    mongoose.Schema(
      {
        date: Date,
        bludo1: Object,
        bludo2: Object,
        bludo3: Object,
        bludo4: Object,
        day: String,
      },
      { timestamps: true }
    )
  );
  return weekMenu;
};
