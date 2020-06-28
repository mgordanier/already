const router = require('express').Router()
const { Habit } = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const habit = await Habit.findByPk(req.params.id)
    res.send(habit)
  } catch (error) {
    next(error)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userHabits = await Habit.findAll({ where: { userId: req.params.userId } })
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
