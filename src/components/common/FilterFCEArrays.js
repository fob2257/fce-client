import { v4 } from 'uuid';

const filterReference = (data = []) =>
  data.filter(d => d.reference
    && d.reference.length >= 13
    && d.reference.length <= 14
    && ['A', 'C'].some(letter => d.reference.startsWith(letter)));

const checkReference = (reference = '', ptovta = '', nrocmp = '') => {
  try {
    const refLength = reference.length;
    const sliceNum = refLength >= 14 ? 6 : 5;

    const refFirstPart = Number.parseInt(reference.slice(sliceNum - `${ptovta}`.length).substring(0, `${ptovta}`.length));
    const refSecondPart = Number.parseInt(reference.slice(sliceNum));

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

export default (fceData = [], invoiceData = [], vimData = [], paidData = []) =>
  new Promise((resolve, reject) => {
    try {
      const res = fceData.map((fce) => {
        const ptovta = fce['ptovta'];
        const nrocmp = fce['nrocmp'];

        const invoices = filterReference([...invoiceData])
          .filter(invoice =>
            `${fce['cuitemisor']}`.toLowerCase() === `${invoice['cuit']}`.toLowerCase()
            && checkReference(invoice.reference, ptovta, nrocmp));
        const vims = filterReference([...vimData])
          .filter(vim =>
            `${fce['vendor']}`.toLowerCase() === `${vim['vendor']}`.toLowerCase()
            && checkReference(vim.reference, ptovta, nrocmp));
        const paids = filterReference([...paidData])
          .filter(paid =>
            `${fce['vendor']}`.toLowerCase() === `${paid['account']}`.toLowerCase()
            && checkReference(paid.reference, ptovta, nrocmp));

        return ({
          ...fce,
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
