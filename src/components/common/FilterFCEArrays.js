const filterReference = (data = []) =>
  data.filter(d => d.reference
    && d.reference.length >= 13
    && d.reference.length <= 14
    && ['A', 'C'].some(letter => d.reference.startsWith(letter)));

const checkReference = (reference = '', ptovta = '', nrocmp = '') => {
  try {
    const refLength = reference.length;
    const sliceNum = refLength >= 14 ? 6 : 5;

    const result = ptovta
      && nrocmp
      && Number.parseInt(reference.slice(sliceNum - ptovta.length).substring(0, ptovta.length)) === Number.parseInt(ptovta)
      && Number.parseInt(reference.slice(sliceNum)) === Number.parseInt(nrocmp);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default (fceData = [], invoiceData = [], vimData = [], paidData = []) =>
  fceData.map((fce) => {
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
    });
  });
