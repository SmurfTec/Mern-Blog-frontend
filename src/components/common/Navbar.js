import React from 'react';

const Navbar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark p-0'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          Blogen
        </a>
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
              <a href='/' className='nav-link'>
                Dashboard
              </a>
            </li>
            <li className='nav-item px-2'>
              <a href='/posts' className='nav-link'>
                Posts
              </a>
            </li>
            <li className='nav-item px-2'>
              <a href='/categories' className='nav-link'>
                Categories
              </a>
            </li>
            <li className='nav-item px-2'>
              <a href='/users' className='nav-link'>
                Users
              </a>
            </li>
          </ul>

          <ul className='navbar-nav ml-auto'>
            <li className='nav-item dropdown mr-3'>
              <a
                href='/'
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
              </a>
              <div className='dropdown-menu'>
                <a href='/profile' className='dropdown-item'>
                  <i className='fas fa-user-circle'></i> Profile
                </a>
                <a href='/settings' className='dropdown-item'>
                  <i className='fas fa-cog'></i> Settings
                </a>
              </div>
            </li>
            <li className='nav-item'>
              <a href='/logout' className='nav-link'>
                <i className='fas fa-user-times'></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
