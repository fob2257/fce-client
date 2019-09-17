import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance, subSeconds } from 'date-fns';

import Context from '../Context';
import constants from '../Constants';

const FCECard = ({ data }) => {
  const { dispatch } = useContext(Context);

  const onClickDelete = () => {
    dispatch({ type: constants.SET_CURRENT_FCE, payload: data });
    dispatch({ type: constants.REMOVE_FCE, payload: data });
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>
          Vendor: {data.nombre}
        </h5>
        <h6 className='card-subtitle mb-2 text-muted'>
          {data.vendor}
        </h6>
        <p className='card-text'>
          <b>ptovta:</b> {data.ptovta} & <b>nrocmp:</b> {data.nrocmp}
        </p>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            {data.invoices.length} match(es) with Invoice
          </li>
          <li className='list-group-item'>
            {data.vims.length} match(es) with VIM
          </li>
          <li className='list-group-item'>
            {data.paids.length} match(es) with Paid (Pagada)
          </li>
        </ul>
      </div>
      <div className='card-footer'>
        <div className='row mb-2'>
          <div className='col'>
            <Link to={`/details/${data.id}`} className='btn btn-primary btn-sm'>
              See details
            </Link>
          </div>
          <div className='col'>
            <button type='button' className='btn btn-danger btn-sm' onClick={() => onClickDelete()}>
              Delete
            </button>
          </div>
        </div>
        <p className='card-text'>
          <small className='text-muted'>
            {
              formatDistance(subSeconds(new Date(data.createdAt), 5), new Date())
            }
          </small>
        </p>
      </div>
    </div>
  );
};

const FCEFeed = () => {
  const { state } = useContext(Context);

  return (
    <div className='fce-feed'>
      <div className='card-deck mb-4'>
        {
          state.fces.slice(-4).reverse().map((fce, i) => (
            <FCECard key={i} data={fce} />
          ))
        }
      </div>
    </div>
  );
};

export default FCEFeed;
