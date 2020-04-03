const express = require('express');
const router = express.Router();
const models = require('../models');
const Option = models.Option;

router.get('/', async (req, res, next) => {
  try {
    const options = await Option.findAll({
      include: ['questions']
      // include: [models.Question] // another way to write this
    });
    res.status(200).json(options);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body, imageUrl } = req.body;
    if (body && imageUrl) {
      const newOption = await Option.create({
        body,
        imageUrl
      });
      res.status(200).json(newOption);
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
    const option = await Option.findByPk(id);
    if (option) {
      res.status(200).json(option);
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
    const optionToUpdate = await Option.findByPk(id);
    if (optionToUpdate) {
      const { body, imageUrl } = req.body;
      const updatedOption = await optionToUpdate.update({
        body,
        imageUrl
      });
      res.status(200).json(updatedOption);
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
    const optionToDelete = await Option.findByPk(id);
    if (optionToDelete) {
      const deletedOption = await optionToDelete.destroy();
      res.status(200).json(deletedOption);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;
