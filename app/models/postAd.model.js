module.exports = (mongoose) => {
  const postAd = mongoose.model(
    "postAd",
    mongoose.Schema(
      {
        title: String,
        text: String,
        privated: Boolean,
        link: String,
      },
      { timestamps: true }
    )
  );
  return postAd;
};
