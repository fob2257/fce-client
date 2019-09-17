import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.style.css';

const HomePage = () => {
  return (
    <div className='home-page'>
      <div className='dark-overlay home-page-inner text-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-3 mb-4'>
                Electronic Credit Invoice
              </h1>
              <p className='lead'>
                Find something...
              </p>
              <hr />
              <Link to='/form' className='btn btn-lg btn-info mr-2'>
                Submit Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
