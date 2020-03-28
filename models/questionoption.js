'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionOption = sequelize.define('QuestionOption', {
    questionId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER,
    isAnswer: DataTypes.BOOLEAN
  }, {});
  QuestionOption.associate = function(models) {
    // associations can be defined here
  };
  return QuestionOption;
};