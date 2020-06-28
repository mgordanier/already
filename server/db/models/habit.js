const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  color: {
    type: Sequelize.ENUM('red', 'yellow', 'green', 'blue', 'purple'),
    allowNull: false,
  },
})

module.exports = Habit
