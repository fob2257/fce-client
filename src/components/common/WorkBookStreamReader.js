const ExcelStreamReader = require('xlsx-stream-reader');

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

export const workBookStreamReader = (readStream = new ReadableStream(), doc = {}) =>
  new Promise((resolve, reject) => {
    const sheetData = [];
    const { sheetIndex = 0, columnIndex = null, headerIndex = 0 } = doc;
    const wbReader = new ExcelStreamReader({ verbose: false, formatting: false });

    wbReader.on('error', (error) => reject(error));

    wbReader.on('worksheet', (wsReader) => {
      if (wsReader.id !== `${sheetIndex + 1}`) {
        return wsReader.skip();
      }

      // if we do not listen for rows we will only get end event
      // and have infor about the sheet like row count
      let keys = [];
      wsReader.on('row', (row) => {
        if (row.attributes.r == (headerIndex + 1)) {
          // do something with row 1 like save as column names
          return keys = row.values.filter(v => v !== undefined).map(v => v.toLowerCase());
        }

        // row.values.forEach((rowVal, colNum) => {
        //   console.log({ rowVal, colNum });
        // });
        // sheetData.push(row.values.filter(v => v !== undefined).join(','));
        if (keys.length > 0) {
          sheetData.push(row.values.filter(v => v !== undefined).reduce((acc, val, i) => ({
            ...acc,
            [keys[i]]: val,
            reference: (columnIndex !== null && i === columnIndex) ? val
              : (acc.reference) ? acc.reference
                : undefined,
          }), {}));
        }
      });
      // wsReader.on('end', () => console.log(wsReader.rowCount));

      wsReader.process();
    });

    wbReader.on('end', () => {
      resolve(sheetData);
    });

    readStream.pipe(wbReader);
  });
