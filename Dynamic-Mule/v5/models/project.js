const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var projectSchema = new Schema({
    type: String,
    title: String,
    images: [{
        url: String,
        public_id: String
    }],
    description: String,
    details: String,
    clientCompany: String,
    clientName: String,
    clientContactPhone: String,
    clientContactEmail: String,
    clientWebsite: String,
    projLocation: String,
    projLat: Number,
    projLon: Number,
    dateStarted: Date,
    dateCompleted: Date,
    customerReview: String,
    collaborators: String,
    collaboratorWebsite: String,
    revenue: Number,
    expenses: Number,
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