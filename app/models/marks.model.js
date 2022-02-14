module.exports = (mongoose) => {
    const marks = mongoose.model(
        "marks",
        mongoose.Schema({
            date: Date,
            classID: String,
            studentID: String,
            cat: String,
            causesID: String,
        }, { timestamps: true }, ),
    );

    return marks;
};