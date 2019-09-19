import * as XLSX from 'xlsx';

export const docs = {
  invoice: {
    sheetIndex: 0,
    columnIndex: 4,
    headerIndex: 6,
  },
  vim: {
    sheetIndex: 0,
    columnIndex: 7,
  },
  paid: {
    sheetIndex: 0,
    columnIndex: 8,
  },
};

const parseXlsxData = (data, headerIndex, columnIndex) => {
  let keys = [];
  const sheetData = [];

  for (let index = 0; index < data.length; index += 1) {
    const row = data[index];
    if (index === headerIndex) {
      keys = row.map(v => v.toLowerCase()
        // remove spaces
        .trim()
        // replace accented characters
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        // replace special characters
        .replace(/\W+(?!$)/g, '-').replace(/\W$/, ''));
      // .replace(/\s+/g, '-')
      continue;
    }

    if (keys.length) {
      // eslint-disable-next-line no-loop-func
      sheetData.push(row.reduce((acc, val, i) => ({
        ...acc,
        [keys[i]]: (val) ? val : '',
        customReference: (columnIndex !== null && i === columnIndex) ? val
          : (acc.customReference) ? acc.customReference
            : undefined,
      }), {}));
    }
  }

  return sheetData;
};

export default (file, doc = {}) =>
  new Promise((resolve, reject) => {
    const { sheetIndex = 0, columnIndex = null, headerIndex = 0 } = doc;

    const reader = new FileReader();

    reader.onerror = event => reject(event);

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workBook = XLSX.read(binaryString, { type: 'binary', cellDates: true });

      const workSheetName = workBook.SheetNames[sheetIndex];
      const workSheet = workBook.Sheets[workSheetName];

      const data = XLSX.utils.sheet_to_json(workSheet, { header: 1, raw: true });

      resolve(parseXlsxData([...data], headerIndex, columnIndex));
    };

    // reader.onloadend = () => { };

    reader.readAsBinaryString(file);
  });
