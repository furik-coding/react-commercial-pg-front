import { getConstructionSideCode } from '../../../../components/Logic/constructionSideCode';
import moment from 'moment';
import { fmtPercent, fmtPeriod, fmtPrice } from './utils';

export const getEstimateReservations = (data = [], sort = '', period = '') => {
  let modifiedData = data.searchSalesEstimateItogs?.edges[0].node.reservations.edges || [];
  modifiedData = modifiedData.map((reservation) => {
    let r = reservation.node;
    console.log(r)
    return {
      key: r.id,
      code: getConstructionSideCode(r.constructionSide),
      city: r.constructionSide?.construction?.location?.postcode.district.city.title || '' ,
      address: r.constructionSide?.construction?.location?.marketingAddress.address || '',
      format: r.constructionSide?.advertisingSide?.side?.format.title || '',
      side: r.constructionSide?.advertisingSide?.side.title || '',
      period: fmtPeriod(r.dateFrom, r.dateTo),
      branding: r.branding ? 'Да' : 'Нет',
      rentByPrice: fmtPrice(r.rentByPriceCalculated),
      discountByPrice: fmtPercent(r.discountPricePercentSelected),
      rentOnClient: fmtPrice(r.valueRentToClientSelected),
      discountOnClient: fmtPercent(r.discountClientPercentSelected),
      rentAfterDiscount:  fmtPrice(r.valueRentToClientAfterDiscountSelected),
      tax: fmtPrice(r.additionalStaticNalog),
      discountOnTax: fmtPercent(r.additionalStaticNalogDiscountPercentSelected),
      taxAfterDiscount: fmtPrice(r.additionalStaticNalogValueAfterDiscount),
      vat: '',
      mount: fmtPrice(r.additionalStaticMounting),
      print: fmtPrice(r.additionalStaticPrinting),
      additional: fmtPrice(r.additionalStaticAdditional),
      sum: fmtPrice(r.itogSummary),
      percentAK: fmtPercent(r.agencyCommissionPercentSelected),
      sumAK: fmtPrice(r.itogAgencyCommission),
      sumWithoutAK: fmtPrice(r.itogSummaryWithoutAgencyCommission),
      agencyCommission: r.agencyCommission
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
      modifiedData = modifiedData.sort((a, b) => {
        const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
        const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
        const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
        const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
        const duration = moment.duration(END.diff(START));
        const duration2 = moment.duration(END2.diff(START2));
        return duration._milliseconds - duration2._milliseconds;
      });
    case 'decrease':
      modifiedData = modifiedData.sort((a, b) => {
        const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
        const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
        const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
        const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
        const duration = moment.duration(END.diff(START));
        const duration2 = moment.duration(END2.diff(START2));
        return duration2._milliseconds - duration._milliseconds;
      });
  }

  return modifiedData;
};
