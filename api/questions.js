const express = require('express');
const router = express.Router();
const models = require('../models');
const Question = models.Question;

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      include: ['options']
      // include: [models.Option] // another way to write this
    });
    res.status(200).json(questions);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
