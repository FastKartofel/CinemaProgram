var express = require('express');
const FilmSchedule = require('../models/FilmSchedule');
const Review = require("../models/Review");

var router = express.Router();

/* GET  */
router.get('/',async (req,res) => {
  res.render('start');
});


/* GET  */
router.get('/reviews', async (req, res ) => {
  const reviews = await Review.find({});
  res.render('reviews', {reviews : reviews});
});

/* POST  */
router.post('/all-films', async (req, res) => {
  try {
    const filmName = req.body.filmName;
    const query = { filmName: new RegExp(filmName, 'i') };
    const schedules = await FilmSchedule.find(query);

    if (schedules.length > 0) {
      res.render('allFilms', { schedules });
    } else {
      res.send('Film not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

/* POST  */
router.post('/reviews', async (req, res) => {
  try {
    const newReview = new Review({
      filmName: req.body.filmName,
      reviewText: req.body.reviewText,
      createdAt: req.body.createdAt
    });

    await newReview.save();

    // Respond with the submitted review (or redirect if preferred)
    res.json({ message: 'Review submitted successfully', review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;