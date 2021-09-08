import moment from 'moment';
import { fmtPercent, fmtPeriod, fmtPrice } from './utils';

export const getExtraCosts = (data = [], sort = '', period = '') => {
  let modifiedData = data.searchSalesEstimateItogs?.edges[0].node.additionalRts.edges || [];
  modifiedData = modifiedData.map((charge) => {
    let node = charge.node
    return {
      id: node?.id  || '',
      key: node?.id || '',
      nameOfService: node?.title || '',
      city: node?.city.title || '',
      cityId: node?.city.id || '',
      period: fmtPeriod(node.startPeriod, node.endPeriod),
      quantity: node?.count || '',
      price: fmtPrice(node.price),
      discount: fmtPercent(node.discountPercent),
      priceAfterDiscount: fmtPrice(node.priceAfterDiscount),
      sum: fmtPrice(node.summaAfterDiscount),
      percentAK: fmtPercent(node.agencyCommissionPercent),
      sumAK: fmtPrice(node.agencyCommissionValue),
      sumWithoutAK: fmtPrice(node.valueWithoutAgencyCommission),
      agencyCommission: node.agencyCommission,
      category: node.category,
    };
  });
  switch (sort) {
    case 'abc':
      modifiedData = modifiedData.sort((a, b) => {
        if (a.city < b.city) {
          return -1;
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      });
  }
  switch (period) {
    case 'increase':
      modifiedData = modifiedData
        .sort((a, b) => {
          const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
          const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
          const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
          const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
          const duration = moment.duration(END.diff(START)).asDays();
          const duration2 = moment.duration(END2.diff(START2)).asDays();
          return duration - duration2;
        })
        .reverse();
    case 'decrease':
      modifiedData = modifiedData.sort((a, b) => {
        const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
        const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
        const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
        const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
        const duration = moment.duration(END.diff(START)).asDays();
        const duration2 = moment.duration(END2.diff(START2)).asDays();
        return duration - duration2;
      });
  }

  return modifiedData;
};
