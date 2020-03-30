const express = require('express');
const router = express.Router();
const models = require('../models');
const Question = models.Question;

/* three ways of passing in info
- req.body - request
- req.params - path variable
- req.query - query string


router.post('/', async (req, res, next) => {
  try {
    // .get('/:id')
      // console.log(req.params);
      // /api/questions/12 -> { id: '12' }
    // console.log(req.query)
      // /api/questions/?name=lin -> { name: 'lin' }
    console.log(req.body);
      // this one can't be logged with the URL
  } catch (error) {
    next(error)
  }
});

*/

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
});

router.post('/', async (req, res, next) => {
  try {
    const { body, instructions, options } = req.body;
    if (body && instructions) {
      const newQuestion = await Question.create({
        body,
        instructions
      });

      res.status(200).json(newQuestion);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const questionToUpdate = await Question.findByPk(id);
    if (questionToUpdate) {
      const { body, instructions } = req.body;
      const updatedQuestion = await questionToUpdate.update({
        body,
        instructions
      });
      res.status(200).json(updatedQuestion);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // another method:
    // Question.destroy({
    //   where: { id }
    // });
    // res.status(200).json({ status: "Deleted successfully" });
    const questionToDelete = await Question.findByPk(id);
    if (questionToDelete) {
      const deletedQuestion = await questionToDelete.destroy();
      res.status(200).json(deletedQuestion);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;
