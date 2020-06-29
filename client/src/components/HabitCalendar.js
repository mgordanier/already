import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendar from 'react-calendar'

const isSameDay = (first, second) => {
  first = new Date(first)
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

const HabitCalendar = (props) => {
  const [value, onChange] = useState(new Date())
  const habit = useSelector((state) => state.habit.selected)

  // if (habit.id) {
  //   habit.activities.map((activity) => {})
  // }
  const tileClassName = ({ date, view }) => {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (habit.activities.find((activity) => isSameDay(activity.date, date))) {
        return `${habit.color}-background`
      }
    }
  }

  // const addActivity = (value, event) => {
  //   console.log('Clicked day: ', value)
  //   event.target.classList.add(`${habit.color}-background`)
  //   event.target.parentElement.classList.add(`${habit.color}-background`)
  // }

  return (
    <div>
      {habit.id ? (
        <Calendar
          className="container"
          onChange={onChange}
          value={value}
          // onClickDay={addActivity}
          tileClassName={tileClassName}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default HabitCalendar
