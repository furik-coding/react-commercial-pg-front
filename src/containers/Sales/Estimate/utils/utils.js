export const fmtPercent = (item) => {
  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toString() + ' %' : ' 0 %';
  // return item ? (Math.round(item).toString()) + ' %' : ' 0 %';
}

export const fmtPercentNull = (item) => {
  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toString() + ' %' : '';
  // return item ? (Math.round(item).toString()) + ' %' : '';
}

export const fmtPrice = (item) => {
  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toLocaleString() + ' тг.' : '';
//   return item ? (Math.round(item).toLocaleString()) + ' тг.' : '';
}

export const fmtPrice0 = (item) => {
  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toLocaleString() + ' тг.' : '0 тг.';
  // return item ? (Math.round(item).toLocaleString()) + ' тг.' : '0 тг.';
}

export const fmtPriceNum0 = (item) => {
  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toLocaleString() + ' тг.' : '0 тг.';
  // return item ? (Math.round(item).toLocaleString()) : '0';
}

export const fmtPeriod = (startDate, endDate) => {
  return startDate && endDate ? (
    new Date(startDate).toLocaleDateString() +
    ' - ' +
    new Date(endDate).toLocaleDateString()
  ) : '';
}

export const agencyComissionDistributed = (ak, cat) => {
  return (ak && cat && (
    ((cat === 'A_0') && ak.toNalog)
    || ((cat === 'A_1') && ak.toMount)
    || ((cat === 'A_2') && ak.toPrint)
    || ((cat === 'A_3') && ak.toRent)
    || ((cat === 'A_4') && ak.toAdditional)));
}

export const capitalize = (s) => s ? s[0].toUpperCase() + s.substring(1) : s
