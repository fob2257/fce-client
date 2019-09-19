import React from 'react';
import FCETableFeed from '../components/FCETableFeed';
import FCEDetail from '../components/FCEDetail';

const DetailsPage = ({ match }) => {
  const Component = (match.params.id) ? FCEDetail : FCETableFeed;

  return (
    <div className='details-page'>
      <Component />
    </div>
  );
};

export default DetailsPage;
