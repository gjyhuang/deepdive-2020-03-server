const express = require('express');
const router = express.Router();
const models = require('../models');
const QuestionOption = models.QuestionOption;

router.get('/', async (req, res, next) => {
  try {
    const questionOptions = await QuestionOption.findAll();
    res.status(200).json(questionOptions);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { questionId, optionId, isAnswer } = req.body;
    const newPair = await QuestionOption.create({
        questionId,
        optionId,
        isAnswer
    });
    res.status(200).json(newPair);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const pair = await QuestionOption.findByPk(id);
    if (pair) {
      res.status(200).json(pair);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    // version 1:
    const { id } = req.params;
    const pairToUpdate = await QuestionOption.findByPk(id);
    if (pairToUpdate) {
      const { questionId, optionId, isAnswer } = req.body;
      const updatedPair = await pairToUpdate.update({
        questionId,
        optionId,
        isAnswer
      });
      res.status(200).json(updatedPair);
    } else {
      res.sendStatus(400);
    }

    // // version 2:
    // const { id } = req.params;
    // const { questionId, optionId, isAnswer } = req.body;
    // const pairToUpdate = await QuestionOption.update({
    //   questionId,
    //   optionId,
    //   isAnswer
    // },{
    //   where: {
    //     id
    //   }
    // });
    // res.status(200).json(pairToUpdate);
  } catch (error) {
    next(error)
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { questionId, optionId } = req.body;
    const pairToDelete = await QuestionOption.destroy({
      where: {
        questionId,
        optionId
      }
    });
    res.status(200).json(pairToDelete);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
