const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    name: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    email: { type: String, required: false },
    website: { type: String, required: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }]
});

exports.Business = mongoose.model("Business", businessSchema);