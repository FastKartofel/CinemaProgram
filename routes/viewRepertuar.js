var express = require('express');
var router = express.Router();

const FilmSchedule = require('../models/FilmSchedule'); // Adjust the path as needed


router.get('/all-films', async (req, res) => {
    try {
        // Accessing the 'filmName' query parameter
        const filmName = req.query.filmName;
        // Creating a query object to filter results based on the film name, if provided
        const query = filmName ? { filmName: new RegExp(filmName, 'i') } : {};
        // Fetching data from the database based on the query
        const schedules = await FilmSchedule.find(query);
        // Rendering the 'allFilms' template with the fetched data
        res.render('allFilms', { schedules });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;