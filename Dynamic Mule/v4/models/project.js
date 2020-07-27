var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
    type: String,
    title: String,
    image: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    description: String,
    details: String,
    clientCompany: String,
    clientName: String,
    clientContactPhone: String,
    clientContactEmail: String,
    clientWebsite: String,
    primaryMaterial: String,
    secondaryMaterial: String,
    projAddressStreet: String,
    projAddressCity: String,
    projAddressState: String,
    projAddressZip: String,
    dateStarted: Date,
    dateCompleted: Date,
    customerReview: String,
    collaborators: String,
    price: Number,
    cost: Number,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);