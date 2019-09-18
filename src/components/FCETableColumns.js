import dateFormat from 'date-fns/format';
import { textFilter } from 'react-bootstrap-table2-filter';

export default [
  {
    dataField: 'id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'nombre',
    text: 'Vendor Name',
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: 'vendor',
    text: 'Vendor Code',
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: 'ptovta',
    text: 'Ptovta',
    sort: true,
    headerStyle: { width: '90px' },
  },
  {
    dataField: 'nrocmp',
    text: 'Nrocmp',
    sort: true,
    headerStyle: { width: '90px' },
  },
  {
    dataField: 'invoices',
    text: 'Invoice',
    sort: true,
    headerStyle: { width: '90px' },
    formatter: (cell, row) => cell.length,
    sortValue: (cell, row) => cell.length,
    sortFunc: (a, b, order, dataField) => (order === 'asc') ? a - b : b - a,
  },
  {
    dataField: 'vims',
    text: 'VIM',
    sort: true,
    headerStyle: { width: '90px' },
    formatter: (cell, row) => cell.length,
    sortValue: (cell, row) => cell.length,
    sortFunc: (a, b, order, dataField) => (order === 'asc') ? a - b : b - a,
  },
  {
    dataField: 'paids',
    text: 'Paid',
    sort: true,
    headerStyle: { width: '90px' },
    formatter: (cell, row) => cell.length,
    sortValue: (cell, row) => cell.length,
    sortFunc: (a, b, order, dataField) => (order === 'asc') ? a - b : b - a,
  },
  {
    dataField: 'createdAt',
    text: 'Submitted At',
    sort: true,
    formatter: (cell, row) => dateFormat(new Date(cell), 'MMM d, YYYY HH:mm:ss', { useAdditionalWeekYearTokens: true }),
    sortValue: (cell, row) => new Date(cell),
    sortFunc: (a, b, order, dataField) => (order === 'asc') ? a - b : b - a,
  },
];
