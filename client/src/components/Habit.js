import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'react-calendar/dist/Calendar.css'
import './Habit.css'
import { getHabit } from '../store'
import HabitCalendar from './HabitCalendar'

const Habit = (props) => {
  const habit = useSelector((state) => state.habit.selected)
  const dispatch = useDispatch()

  if (!habit.id) dispatch(getHabit(props.match.params.id))

  useEffect(() => {
    
  })

  return (
    <div className="section ">
      {habit ? (
        <div className="container habit default-max-width">
          <h1 className={`title ${habit.color}-text`}>{habit.name}</h1>
          <HabitCalendar  />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Habit
