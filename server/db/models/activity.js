const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})

module.exports = Activity
