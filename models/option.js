'use strict';
module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    body: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Option.associate = function(models) {
    Question.belongsToMany(models.Option, {
      through: 'QuestionOption',
      as: 'questions',
      foreignKey: 'optionId',
      otherKey: 'questionId'
    });
  };
  return Option;
};
