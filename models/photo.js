const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    businessId: { type: mongoose.Types.ObjectId, required: true },
    photoUrl: { type: String, required: true },
    caption: { type: String, required: false }
});

exports.Photo = mongoose.model("Photo", photoSchema);