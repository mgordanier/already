const router = require('express').Router()
const { Habit, Activity } = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const habit = await Habit.findOne({
      where: { id: req.params.id },
      include: Activity,
    })
    res.send(habit)
  } catch (error) {
    next(error)
  }
})
router.put('/:id/add-activity', async (req, res, next) => {
  try {
    const habitId = req.params.id
    const { activityDate } = req.body

    await Activity.create({ date: activityDate, habitId })
    const habit = await Habit.findOne({
      where: { id: habitId },
      include: Activity,
    })
    res.send(habit)
  } catch (error) {
    next(error)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userHabits = await Habit.findAll({
      where: { userId: req.params.userId },
    })
    res.send(userHabits)
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
