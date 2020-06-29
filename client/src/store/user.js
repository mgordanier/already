import axios from 'axios'
import history from '../history'
import { getMyHabits, clearHabits } from './habit'

// ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// INITIAL STATE
const defaultUser = {}

//ACTION CREATORS
const gotUser = (user) => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

// THUNK CREATORS
export const getUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/user')
    const user = res.data
    dispatch(gotUser(user || defaultUser))
    if (user.id) dispatch(getMyHabits(user.id))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(gotUser({ error: authError }))
  }

  try {
    const user = res.data
    dispatch(gotUser(user || defaultUser))
    if (user.id) dispatch(getMyHabits(user.id))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(clearHabits())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
