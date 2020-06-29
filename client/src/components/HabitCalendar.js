import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendar from 'react-calendar'
import { addActivity, removeActivity } from '../store'

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
  const dispatch = useDispatch()

  const tileClassName = ({ date, view }) => {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar cycling over matches an activity date
      if (habit.activities.find((activity) => isSameDay(activity.date, date))) {
        return `${habit.color}-background`
      }
    }
  }

  const toggleDay = (value, event) => {
    console.log('Clicked day: ', value)
    //check if value date matches habit activities
    const [matchingActivity] = habit.activities.filter((activity) =>
      isSameDay(activity.date, value)
    )
    if (matchingActivity) {
      dispatch(removeActivity(matchingActivity.id))
    } else {
      dispatch(addActivity(habit.id, value))
    }
  }

  return (
    <div>
      {habit.id ? (
        <Calendar
          className="container"
          onChange={onChange}
          value={value}
          onClickDay={toggleDay}
          tileClassName={tileClassName}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default HabitCalendar
