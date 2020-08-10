const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var projectSchema = new Schema({
    type: String,
    title: String,
    images: [String],
    description: String,
    details: String,
    clientCompany: String,
    clientName: String,
    clientContactPhone: String,
    clientContactEmail: String,
    clientWebsite: String,
    // primaryMaterial: String,
    // secondaryMaterial: String,
    projLocation: String,
    projLat: Number,
    projLon: Number,
    // projAddressCity: String,
    // projAddressState: String,
    // projAddressZip: String,
    dateStarted: Date,
    dateCompleted: Date,
    customerReview: String,
    collaborators: String,
    collaboratorWebsite: String,
    revenue: Number,
    expenses: {
        labor: Number,
        materials: Number,
        overhead: Number,
        total: Number,
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);