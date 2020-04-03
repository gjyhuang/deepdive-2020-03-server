const express = require('express');
const router = express.Router();
const models = require('../models');
const Question = models.Question;
const Option = models.Option;
const QuestionOption = models.QuestionOption;

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
      if (options) {
        // if the user is also making 4 options - to validate whether all of the options are unique or not, and before saving a new question to the db
        const optionsSet = new Set(options);
        if (optionsSet.size !== 4) {
          res.sendStatus(400);
          return;
        }
      }

      const newQuestion = await Question.create({
        body,
        instructions
      });

      if (options) {
        // make all four options
        // note that map is synchronous, so you need Promise.all to resolve the promises
        const newOptionsArr = await Promise.all(
          options.map(async (o) => {
            const optionBody = o.body;
            const { imageUrl, isAnswer } = o;
            const newOption = await Option.create({
              body: optionBody,
              imageUrl
            });

            // and associate the question to the current option
            const newAssociation = await QuestionOption.create({
              questionId: newQuestion.id,
              optionId: newOption.id,
              isAnswer
            })
            return { option: newOption, association: newAssociation };
          }));
        res.status(200).json({question: newQuestion, options: newOptionsArr});
      } else {
        res.status(200).json(newQuestion);
      }
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
