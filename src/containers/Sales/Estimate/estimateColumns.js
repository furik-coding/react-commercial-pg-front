import { column, column_sorter, notnull, column_num, null2str, null2strKey, null2bool } from '../../../components/Table/utils'
import { CityFilterDropdown } from './utils/CityFiterDropdown';
import { PeriodFilterDropdown } from './utils/PeriodFilterDropdown';


const filterCity = {
  filterDropdown: CityFilterDropdown,
  onFilter: (val, record) => record.city === val,
}

const filterPeriod = {
  filterDropdown: PeriodFilterDropdown,
  onFilter: (a, b) => {
    const start = new Date(b.period.split(' - ')[0].split('.').reverse().join('-')).setHours(0, 0, 0, 0);
    const end = new Date(b.period.split(' - ')[1].split('.').reverse().join('-')).setHours(0, 0, 0, 0);
    return start <= a && end >= a;
  },
}

const sorterQuantity = (a, b) => notnull(a) ? (notnull(b) ? Number(a.quantity) - Number(b.quantity) : 1) : -1;

let defaultShow = true;
let defaultHide = false;

export const initColumnsForPopupBookedSides = [
  column('Код стороны', 'code', 130, defaultShow),
  column('Город', 'city', 130, defaultShow, true, filterCity),
  column('Адрес', 'address', 130, defaultShow),
  column('Формат', 'format', 130, defaultShow),
  column('Сторона', 'side', 130, defaultShow),
  column('Период', 'period', 130, defaultShow, true, filterPeriod),
  column('Брендинг (да/нет)', 'branding', 130, defaultShow, true),
  {
    title: 'АРЕНДА',
    children: [
      column('Аренда по прайсу', 'rentByPrice', 130, defaultHide),
      column('Скидка по прайсу', 'discountByPrice', 130, defaultHide),
      column('Аренда на клиента', 'rentOnClient', 130, defaultHide),
      column('Скидка на клиента', 'discountOnClient', 130, defaultHide),
      column('Аренда после скидки', 'rentAfterDiscount', 130, defaultHide),
    ],
  },
  {
    title: 'НАЛОГ',
    children: [
      column('Налог', 'tax', 130, defaultHide),
      column('Скидка на налог', 'discountOnTax', 130, defaultHide),
      column('Налог после скидки', 'taxAfterDiscount', 130, defaultHide),
      column('НДС/ без НДС', 'vat', 130, defaultHide),
    ],
  },
  {
    title: 'ДОП. РАБОТЫ',
    children: [
        column('Монтаж', 'mount', 130, defaultHide),
        column('Печать', 'print', 130, defaultHide),
        column('Доп. расходы', 'additional', 130, defaultHide),
    ],
  },
  column('Итого', 'sum', 130, defaultHide),
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      column('Процент АК', 'percentAK', 130, defaultHide),
      column('Сумма АК', 'sumAK', 130, defaultHide),
      column('Итого за вычетом АК', 'sumWithoutAK', 130, defaultHide),
    ],
  },
];


export const initColumnsForPopupExtraCharge = [
  column('Наименование услуги', 'nameOfService', 130, defaultShow, true),
  column('Город', 'city', 130, defaultShow, true, filterCity),
  column('Период', 'period', 130, defaultShow, true, filterPeriod),
  column_sorter('Кол-во', 'quantity', 130, defaultShow, sorterQuantity),
  column_num('Цена', 'price', 130, defaultShow),
  column_num('Скидка', 'discount', 130, defaultShow),
  column_num('Стоимость после скидки', 'priceAfterDiscount', 130, defaultShow),
  column_num('Сумма', 'sum', 130, defaultShow),
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      column_num('Процент АК', 'percentAK', 130, defaultHide),
      column_num('Сумма АК', 'sumAK', 130, defaultHide),
      column_num('Сумма за вычетом АК', 'sumWithoutAK', 130, defaultHide),
    ],
  },
];

defaultShow = true;
defaultHide = false;

export const initColumnsForPopupHotPtc = [
  column('Тип', 'code', 130, defaultShow),
  column('Город', 'city', 130, defaultShow, true, filterCity),
  column('Период', 'period', 130, defaultShow, true, filterPeriod),
  column_num('Кол-во', 'quantity', 130, defaultShow),
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      column_num('Аренда', 'rentInput', 130, defaultShow),
      column_num('Налог', 'taxInput', 130, defaultShow),
      column_num('Печать', 'printInput', 130, defaultShow),
      column_num('Монтаж', 'mountInput', 130, defaultShow),
      column_num('Производсто', 'manufactureInput', 130, defaultShow),
      column_num('Доп. расходы', 'costsInput', 100, defaultShow),
      column_num('Сумма', 'sumInput', 100, defaultShow),
    ],
  },
  {
    title: 'СУММА ПРОДАЖИ',
    children: [
      column_num('Аренда', 'rentSell', 130, defaultHide),
      column_num('Налог', 'taxSell', 130, defaultHide),
      column_num('Печать', 'printSell', 130, defaultHide),
      column_num('Монтаж', 'mountSell', 130, defaultHide),
      column_num('Производство', 'manufactureSell', 130, defaultHide),
      column_num('Доп. расходы', 'costsSell', 130, defaultHide),
      column_num('Сумма', 'sumSell', 130, defaultHide),
    ],
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      column_num('Процент АК', 'percentAK', 130, defaultHide),
      column_num('Сумма АК', 'sumAK', 130, defaultHide),
      column_num('Маржа за вычетом АК', 'sumWithoutAK', 130, defaultHide),
    ],
  },
  column_num('Маржа', 'margin', 130, defaultHide),
];


