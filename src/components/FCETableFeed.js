import React, { useContext, useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
import dateFormat from 'date-fns/format';

import Context from '../Context';
import constants from '../Constants';

import Spinner from './Spinner';

const FCETableItem = ({ data }) => {
  const { dispatch } = useContext(Context);

  const onClickDelete = () => {
    dispatch({ type: constants.SET_CURRENT_FCE, payload: data });
    dispatch({ type: constants.REMOVE_FCE, payload: data });
  };

  return (
    <tr>
      <td>
        <div className='form-check'>
          <input className='form-check-input' type='checkbox' />
        </div>
      </td>
      <td>{data.nombre}</td>
      <td>{data.vendor}</td>
      <td>{data.ptovta}</td>
      <td>{data.nrocmp}</td>
      <td>{dateFormat(new Date(data.createdAt), 'MMM d, YYYY HH:mm:ss', { useAdditionalWeekYearTokens: true })}</td>
    </tr>
  );
};

const FCETableFeed = () => {
  const { state } = useContext(Context);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const changePage = (pageNum = 1) => setPage(pageNum);

  const changeLimit = (limitNum = 25) => setLimit(limitNum);

  // offset = limit * (page - 1)

  useEffect(() => {
    // todo
  }, [page, limit]);

// useState(() => {
//   setLoading(true);
//   return () => {
//     setLoading(false);
//   }
// }, []);

return (
  <div className='fce-table-feed'>
    {
      (loading) ? <Spinner />
        : (
          <div className='container table-responsive'>
            <table className='table table-striped table-hover table-sm'>
              <thead>
                <tr>
                  <th scope='col'></th>
                  <th scope='col'>Vendor name</th>
                  <th scope='col'>Vendor code</th>
                  <th scope='col'>ptovta</th>
                  <th scope='col'>nrocmp</th>
                  <th scope='col'>Submitted at</th>
                </tr>
              </thead>
              <tbody>
                {
                  state.fces.slice(-25).reverse().map((fce, i) => (
                    <FCETableItem key={i} data={fce} />
                  ))
                }
              </tbody>
            </table>
          </div>
        )
    }
  </div>
);
};

export default FCETableFeed;
