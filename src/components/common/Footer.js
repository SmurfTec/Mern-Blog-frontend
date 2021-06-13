import React from 'react';

const Footer = () => {
  return (
    <footer id='main-footer' className='bg-dark text-white p-1 %>'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p className='lead text-center'>
              Copyright &copy;
              <span id='year'></span>
              Blogen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
