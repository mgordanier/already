import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './AllHabits.css'
import { getHabit } from '../store'

const AllHabits = () => {
  const habits = useSelector((state) => state.habit.all)
  const dispatch = useDispatch()
  return (
    <div className="section">
      {habits
        ? habits.map((habit) => {
            return (
              <div
                key={habit.id}
                className="box container level is-mobile  default-max-width"
              >
                <h2 className={`${habit.color}-text`}>{habit.name}</h2>
                <Link
                  to={`/habit/${habit.id}`}
                  onClick={() => dispatch(getHabit(habit.id))}
                >
                  <div className="icon is-medium">
                    <i className={`${habit.color}-text fas fa-arrow-alt-circle-right`}></i>
                  </div>
                </Link>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default AllHabits
