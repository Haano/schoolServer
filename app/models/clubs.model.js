module.exports = (mongoose) => {
  const clubs = mongoose.model(
    "clubs",
    mongoose.Schema(
      {
        name: String,
        level: String,
        profile: String,
        location: String,
        students: [Object],
      },
      { timestamps: true }
    )
  );

  return clubs;
};
