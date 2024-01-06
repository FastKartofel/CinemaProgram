const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    filmName: String,
    reviewText: String,
    createdAt: String
});

module.exports = mongoose.model('Review', reviewSchema);