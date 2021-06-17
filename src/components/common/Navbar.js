import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark p-0'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Blogen
        </Link>
        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarCollapse'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav'>
            <li className='nav-item px-2'>
              <Link to='/' className='nav-link'>
                Dashboard
              </Link>
            </li>
            <li className='nav-item px-2'>
              <Link to='/posts' className='nav-link'>
                Posts
              </Link>
            </li>
          </ul>

          <ul className='navbar-nav ml-auto'>
            <li className='nav-item dropdown mr-3'>
              <Link
                to='/'
                className='nav-link dropdown-toggle'
                data-toggle='dropdown'
              >
                {/* <!-- <i className="fas fa-user"></i> <%= userName %> --> */}
                <img
                  src={`${user.image}`}
                  className='img-responsive rounded-circle'
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                  }}
                  alt=''
                />
              </Link>
              <div className='dropdown-menu'>
                <Link to='/profile' className='dropdown-item'>
                  <i className='fas fa-user-circle'></i> Profile
                </Link>
              </div>
            </li>
            <li className='nav-item'>
              <Link to='/logout' className='nav-link'>
                <i className='fas fa-user-times'></i> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
