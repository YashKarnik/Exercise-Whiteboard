import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../Logos/github.svg'

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <div className='collpase navbar-collapse'>
          <ul className='navbar-nav mr-auto'>
            <a href='https://github.com/YashKarnik/MERN-pract'>
              <Logo
                style={{
                  height: '45px',
                  width: '45px',
                  padding: '0px 15px 0px 0px',
                }}
              />
            </a>

            <li className='navbar-item'>
              <Link to='/' className='navbar-brand'>
                Exercises
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/create' className='nav-link'>
                Create Exercise Log
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/user' className='nav-link'>
                Create User
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/delete' className='nav-link'>
                Delete User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
