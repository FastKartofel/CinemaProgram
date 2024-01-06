const mongoose = require('mongoose');

const filmScheduleSchema = new mongoose.Schema({
    filmName: String,
    schedule: [{
        date: Date,
        times: [String]
    }]
});

module.exports = mongoose.model('FilmSchedule', filmScheduleSchema);