'use strict'

const db = require('./db')
const { User, Habit, Activity } = require('./db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'sparky@email.com', password: '123' }),
    User.create({ email: 'jenny@email.com', password: '123' }),
  ])
  console.log(`seeded ${users.length} users`)

  const habits = await Promise.all([
    Habit.create({ name: 'fetch', color: 'red', userId: 1 }),
    Habit.create({ name: 'dig', color: 'blue', userId: 1 }),
    Habit.create({ name: 'chase tail', color: 'green', userId: 1 }),
    Habit.create({ name: 'exercise', color: 'purple', userId: 2 }),
    Habit.create({ name: 'garden', color: 'green', userId: 2 }),
  ])
  console.log(`seeded ${habits.length} habits`)

  const activities = await Promise.all([
    Activity.create({ date: new Date(2020, 5, 20), habitId: 1 }),
    Activity.create({ date: new Date(2020, 5, 11), habitId: 1 }),
    Activity.create({ date: new Date(2020, 5, 5), habitId: 1 }),
    Activity.create({ date: new Date(2020, 4, 21), habitId: 1 }),
    Activity.create({ date: new Date(2020, 5, 25), habitId: 2 }),
    Activity.create({ date: new Date(2020, 5, 6), habitId: 3 }),
    Activity.create({ date: new Date(2020, 5, 19), habitId: 3 }),
    Activity.create({ date: new Date(2020, 4, 15), habitId: 3 }),
    Activity.create({ date: new Date(2020, 5, 29), habitId: 4 }),
  ])
  console.log(`seeded ${activities.length} habits`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
