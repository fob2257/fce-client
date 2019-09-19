import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import BootstrapTablePagination from 'react-bootstrap-table2-paginator';
import BootstrapTableFilter from 'react-bootstrap-table2-filter';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import Context from '../Context';
import constants from '../Constants';

import columns from './common/FCETableColumns';

const FCERowOptions = ({ data }) => {
  const { dispatch } = useContext(Context);

  const onClickDelete = () => {
    dispatch({ type: constants.REMOVE_FCE, payload: data });
  };

  return (
    <div>
      <Link to={`/details/${data.id}`} className='btn btn-primary'>
        <i className='fas fa-info-circle' />
      </Link>
      <button type='button' className='btn btn-danger ml-2' onClick={() => onClickDelete()}>
        <i className='fas fa-trash' />
      </button>
    </div>
  );
};

const FCETableFeed = () => {
  const { state } = useContext(Context);

  // const tableValues = (page, size) => {
  //   setLoading(true);

  //   const offset = size * (page - 1) * -1;
  //   const total = page * size * -1;
  //   const stateData = state.fces.slice(total, (offset) ? offset : undefined).reverse();

  //   setLoading(false);
  // };

  return (
    <div className='fce-table-feed'>
      <BootstrapTable
        bootstrap4={true}
        keyField='id'
        striped={true}
        bordered={true}
        condensed={true}
        data={state.fces}
        columns={[
          ...columns,
          {
            dataField: 'ayyylmao-options',
            text: 'Options',
            isDummyField: true,
            formatter: (cell, row) => <FCERowOptions data={row} />,
          }
        ]}
        defaultSorted={[{
          dataField: 'createdAt',
          order: 'desc'
        }]}
        // selectRow={{
        //   mode: 'checkbox',
        //   style: { background: '#A9A9A9' },
        // }}
        pagination={BootstrapTablePagination({
          paginationSize: 5,
          showTotal: true,
          sizePerPageList: [10, 25, 30, 50, 100],
        })}
        filter={BootstrapTableFilter()}
      />
    </div>
  );
};

export default FCETableFeed;
