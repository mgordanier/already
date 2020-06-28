// models
const User = require('./user')
const Habit = require('./habit')
const Activity = require('./activity')

// model associations
User.hasMany(Habit)
Habit.belongsTo(User)

Habit.hasMany(Activity)
Activity.belongsTo(Habit)

// export models
module.exports = {
  User,
  Habit,
  Activity,
}
