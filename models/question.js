'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    body: DataTypes.STRING,
    instructions: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    Question.belongsToMany(models.Option, {
      through: 'QuestionOption',
      as: 'options',
      foreignKey: 'questionId',
      otherKey: 'optionId'
    })
  };
  return Question;
};
