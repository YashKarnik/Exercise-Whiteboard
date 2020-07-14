import React from 'react'
import { ReactComponent as Logo } from '../Logos/github.svg'

export default function footer() {
  return (
    <div>
      <div className='navbar-item my-2 my-lg-0'>
        <a href='https://github.com/YashKarnik/MERN-pract'>
          <Logo
            style={{
              height: '45px',
              width: '45px',
              margin: '0px 0px 0px 500px',
            }}
          />
        </a>
      </div>
    </div>
  )
}
