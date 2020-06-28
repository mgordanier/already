import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import './Navbar.css'
import logo from '../logo.png'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav
    className="navbar is-white"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <div className="navbar-item">
        <img src={logo} alt="already app logo" id="logo" />
      </div>
      <div className="navbar-item">
        <h1 className="logotype">already</h1>
      </div>

      <label
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        htmlFor="nav-toggle-state"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </label>
    </div>
    <input type="checkbox" id="nav-toggle-state" />
    <div id="navbarOptions" className="navbar-menu">
      <div className="navbar-start"></div>
      {isLoggedIn ? (
        <div className="navbar-end">
          {/* The navbar will show these links after you log in */}
          <div className="navbar-item">
            <Link to="/home" className="button is-light">
              Home
            </Link>
          </div>

          <div className="navbar-item">
            <button
              type="button"
              className="button is-light"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          {/* The navbar will show these links before you log in */}

          <div className="navbar-item">
            <Link to="/login" className="button is-light">
              Login
            </Link>
          </div>

          <div className="navbar-item">
            <Link to="/signup" className="button is-light ">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
