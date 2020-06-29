import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import './AuthForm.css'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <section className="section">
      <div className="container box default-max-width">
        <form onSubmit={handleSubmit} name={name}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                name="email"
                type="text"
                autoComplete="current-email"
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-medium is-light">
                {displayName}
              </button>
            </div>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </section>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
