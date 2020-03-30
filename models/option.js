'use strict';
module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    body: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Option.associate = function(models) {
    Option.belongsToMany(models.Question, {
      through: 'QuestionOption',
      as: 'questions',
      foreignKey: 'optionId',
      otherKey: 'questionId'
    });
  };
  return Option;
};
