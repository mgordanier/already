import React from 'react'
import { useSelector } from 'react-redux'
import HabitCalendar from './HabitCalendar'

const Habit = () => {
  const habit = useSelector((state) => state.habit.selected)
  return (
    <div className="section">
      {habit ? (
        <div className="container ">
          <h1>{habit.name}</h1>
          <HabitCalendar />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Habit
