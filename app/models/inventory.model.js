module.exports = (mongoose) => {
  const inventory = mongoose.model(
    "inventory",
    mongoose.Schema(
      {
        name: String,
        schoolID: String,
        serialNumber: String,
        comment: String,
        group: String,
        location: String,
        school: String,
        quantity: Number,
        used: Boolean,
        federalProgram: String,
        status: String,
      },
      { timestamps: true }
    )
  );

  return inventory;
};
