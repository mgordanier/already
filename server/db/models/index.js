// models
const User = require('./user')
const Habit = require('./habit')

// model associations
User.hasMany(Habit)
Habit.belongsTo(User)

// export models
module.exports = {
  User,
  Habit,
}
