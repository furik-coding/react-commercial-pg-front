import { getConstructionSideCode } from '../../../../components/Logic/constructionSideCode';
import { fmtPercent, fmtPeriod, fmtPrice } from './utils';

export const getNonRts = (data = [], sort = '') => {
  let nonRtsAdditionals = data.searchSalesEstimateItogs?.edges[0].node.additionalNonrts.edges || [];
  nonRtsAdditionals = nonRtsAdditionals.map((item) => {
    let node = item.node;
    let quantity = node.count || 0;
    let agValue = node.agencyCommissionCalculated ?? 0;
    let agPercent = node.margin && node.agencyCommissionCalculated ? (agValue / node.margin) * 100.0 : null;
    if (agPercent === null && node.agencyCommission?.toNonrts)
      agPercent = node.agencyCommission.percent;
    let sumWithoutAk = (node.margin ?? 0) - agValue;

    return {
      key: node.id,
      code: node.name,
      city: node?.city?.title ||  '',
      cityId: node?.city?.id || '',
      period: fmtPeriod(node.startPeriod, node.endPeriod),
      quantity: quantity,
      rentInput: fmtPrice(node.incomingRent),
      taxInput: fmtPrice(node.incomingTax),
      printInput: fmtPrice(node.incomingPrinting),
      mountInput: fmtPrice(node.incomingInstallation),
      manufactureInput: fmtPrice(node.incomingManufacturing),
      costsInput: fmtPrice(node.incomingAdditional),
      sumInput: fmtPrice(node.pay),
      rentSell: fmtPrice(node.saleRent),
      taxSell: fmtPrice(node.saleTax),
      printSell: fmtPrice(node.salePrinting),
      mountSell: fmtPrice(node.saleInstallation),
      manufactureSell: fmtPrice(node.saleManufacturing),
      sumSell: fmtPrice(node.sale),
      costsSell: fmtPrice(node.saleAdditional),
      percentAK: fmtPercent(agPercent),
      sumAK: fmtPrice(agValue),
      margin: fmtPrice(node.margin),
      agencyCommission: node.agencyCommission,
      sumWithoutAK: fmtPrice(sumWithoutAk),
      category: 'nonrtsAdditional',
    };
  });
  let reservationsNonRts = data.searchSalesEstimateItogs?.edges[0].node.reservationsNonrts.edges || [];
  reservationsNonRts = reservationsNonRts.map((item) => {
    let node = item.node;
    let agValue = node.agencyCommissionValue ?? 0;
    let agPercent = node.margin ? (agValue / node.margin) * 100.0 : null;
    if (agPercent === null && node.agencyCommission?.toNonrts)
      agPercent = node.agencyCommission.percent;

    return {
      key: node.id,
      code: getConstructionSideCode(node.constructionSide),
      city: node?.constructionSide?.construction?.location?.postcode?.district?.city.title || null,
      cityId: node?.constructionSide?.construction?.location?.postcode?.district?.city.id || null,
      period: fmtPeriod(node.dateFrom, node.dateTo) + ' ' + node.reservationType?.title,
      dateFrom: node.dateFrom,
      dateTo: node.dateTo,
      quantity: 1,
      rentInput: fmtPrice(node.nonrtsPart?.incomingRent),
      taxInput: fmtPrice(node.nonrtsPart?.incomingTax),
      printInput: fmtPrice(node.nonrtsPart?.incomingPrinting),
      mountInput: fmtPrice(node.nonrtsPart?.incomingInstallation),
      manufactureInput: fmtPrice(node.nonrtsPart?.incomingManufacturing),
      costsInput: fmtPrice(node.nonrtsPart?.incomingAdditional),
      rentSell: fmtPrice(node.nonrtsPart?.saleRent),
      taxSell: fmtPrice(node.nonrtsPart?.saleTax),
      printSell: fmtPrice(node.nonrtsPart?.salePrinting),
      mountSell: fmtPrice(node.nonrtsPart?.saleInstallation),
      manufactureSell: fmtPrice(node.nonrtsPart?.saleManufacturing),
      costsSell: fmtPrice(node.nonrtsPart?.saleAdditional),
      sumInput: fmtPrice(node.pay),
      sumSell: fmtPrice(node.sale),
      percentAK: fmtPercent(agPercent),
      sumAK: fmtPrice(agValue),
      margin: fmtPrice(node.margin),
      agencyCommission: node.agencyCommission,
      sumWithoutAK: fmtPrice((node.margin ?? 0) - agValue),
      category: 'nonrtsReservation',
    };
  });
  let modifiedData = [...reservationsNonRts, ...nonRtsAdditionals];

  switch (sort) {
    case 'abc':
      return modifiedData.sort((a, b) => {
        if (a.city < b.city) {
          return -1;
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      });
    default:
      return modifiedData;
  }
}
