import { v4 } from 'uuid';

const filterReference = (data = []) =>
  data.filter(d => d.customReference
    && d.customReference.length >= 13
    && d.customReference.length <= 14
    && ['A', 'C'].some(letter => d.customReference.startsWith(letter)));

const checkReference = (customReference = '', ptovta = '', nrocmp = '') => {
  try {
    const refLength = customReference.length;
    const sliceNum = refLength >= 14 ? 6 : 5;

    const refFirstPart = Number.parseInt(customReference.slice(sliceNum - `${ptovta}`.length).substring(0, `${ptovta}`.length));
    const refSecondPart = Number.parseInt(customReference.slice(sliceNum));

    const result = ptovta
      && nrocmp
      && refFirstPart === Number.parseInt(ptovta)
      && refSecondPart === Number.parseInt(nrocmp);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default ({
  fceFileName = '',
  invoiceFileName = '',
  vimFileName = '',
  paidFileName = '',
  fceData = [],
  invoiceData = [],
  vimData = [],
  paidData = [],
}) =>
  new Promise((resolve, reject) => {
    try {
      const res = fceData.map((fce) => {
        const ptovta = fce['ptovta'];
        const nrocmp = fce['nrocmp'];

        const invoices = filterReference([...invoiceData])
          .filter(invoice =>
            `${fce['cuitemisor']}`.toLowerCase() === `${invoice['cuit']}`.toLowerCase()
            && checkReference(invoice.customReference, ptovta, nrocmp));
        const vims = filterReference([...vimData])
          .filter(vim =>
            `${fce['vendor']}`.toLowerCase() === `${vim['vendor']}`.toLowerCase()
            && checkReference(vim.customReference, ptovta, nrocmp));
        const paids = filterReference([...paidData])
          .filter(paid =>
            `${fce['vendor']}`.toLowerCase() === `${paid['account']}`.toLowerCase()
            && checkReference(paid.customReference, ptovta, nrocmp));

        return ({
          ...fce,
          fceFileName,
          invoiceFileName,
          vimFileName,
          paidFileName,
          invoices,
          vims,
          paids,
          createdAt: new Date(),
          id: v4(),
        });
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
