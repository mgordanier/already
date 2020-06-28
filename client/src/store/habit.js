import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_MY_HABITS = 'GET_MY_HABITS'
const GET_HABIT = 'GET_HABIT'

// INITIAL STATE

const defaultHabit = {
  all: [],
  selected: {},
}

// ACTION CREATORS

const gotMyHabits = (myHabits) => {
  return {
    type: GET_MY_HABITS,
    myHabits,
  }
}
const gotHabit = (habit) => {
  return {
    type: GET_HABIT,
    habit,
  }
}

// THUNK CREATORS
export const getMyHabits = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/habits/user/${userId}`)
    dispatch(gotMyHabits(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getHabit = (habitId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/habits/${habitId}`)
    dispatch(gotHabit(res.data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function (state = defaultHabit, action) {
  switch (action.type) {
    case GET_MY_HABITS:
      return { ...state, all: action.allHabits }
    case GET_HABIT:
      return { ...state, selected: action.habit }
    default:
      return state
  }
}
