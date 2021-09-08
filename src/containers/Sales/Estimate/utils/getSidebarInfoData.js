import collapseIcon from '../../../../img/collapse-icon.svg';
import { fmtPercent, fmtPrice, fmtPrice0, capitalize } from './utils';

export const getSidebarInfoData = (data) => {
  let node = data?.searchSalesEstimateItogs?.edges.length ? data.searchSalesEstimateItogs.edges[0].node : null;
  return [
    {
      id: 1, title: 'Аренда', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Аренда по прайсу:',            value: fmtPrice0(node?.rentByPrice) },
        { title: 'Скидка на аренду по прайсу:',  value: fmtPercent(node?.rentByPriceDiscountPercent) },
        { title: 'Аренда на клиента:',           value: fmtPrice0(node?.rentToClent) },
        { title: 'Скидка на аренду на клиента:', value: fmtPercent(node?.rentToClentDiscountPercent) }
      ]
    },
    {
      id: 2, title: 'Доп. работы', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Монтаж:',      value: fmtPrice0(node?.staticMounting) },
        { title: 'Печать:',      value: fmtPrice0(node?.staticPrinting) },
        { title: 'Доп. работы:', value: fmtPrice0(node?.staticAdditional) },
      ]
    },
    {
      id: 3, title: 'Доп. расходы', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: (
        node?.additionalRtsByTitle?.edges?.map((item, index) => ({
            title: capitalize(item.node.name),
            value: fmtPrice(item.node.summaAfterDiscount),
          })
        ) || [])
    },
    {
      id: 4, title: 'Агентская комиссия', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Процент АК:',          value: fmtPercent(node?.agencyCommissionPercent) },
        { title: 'Сумма АК:',            value: fmtPrice0(node?.agencyCommissionValue) },
        { title: 'Сумма за вычетом АК:', value: fmtPrice0(node?.summaryEstimateValueWithoutAgencyComission) }
      ]
    },
    {
      id: 5, title: 'Налоги', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Налог:',               value: fmtPrice0(node?.nalogBeforeDiscount) },
        { title: 'Скидка на налог:',     value: fmtPercent(node?.nalogDiscountPercent) },
        { title: 'Налога после скидки:', value: fmtPrice0(node?.nalogAfterDiscount) }
      ]
    },
    {
      id: 6,
      title: 'НОН РТС',
      icon: collapseIcon,
      isShowed: true,
      sumBlock: false,
      content: (
        node?.additionalNonrtsByTitle?.edges?.map((item, index) => ({
            title: capitalize(item.node.name),
            value: fmtPrice0(item.node.sale),
          })
        ) || [])
    },
    {
      id: 7,
      title: 'ИТОГО',
      icon: collapseIcon,
      isShowed: false,
      sumBlock: true,
      value: fmtPrice0(node?.summaryEstimateValue)
    }
  ];
};
