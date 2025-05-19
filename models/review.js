const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    businessId: { type: mongoose.Types.ObjectId, required: true },
    starRating: { type: Number, required: true },
    costRating: { type: Number, required: true },
    comment: { type: String, required: false }
});

exports.Review = mongoose.model("Review", reviewSchema);