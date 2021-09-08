import collapseIcon from '../../../img/collapse-icon.svg';

export const sidebarInfoData = [
  {
    id: 1,
    title: 'Аренда',
    icon: collapseIcon,
    isShowed: true,
    sumBlock: false,
    content: [
      {
        title: 'Аренда по прайсу:',
        value: '99 999 тг.'
      },
      {
        title: 'Скидка на аренду по прайсу:',
        value: '10%'
      },
      {
        title: 'Аренда на клиента:',
        value: '9 999 тг.'
      },
      {
        title: 'Скидка на аренду на клиента:',
        value: '5%'
      }
    ]
  },
  {
    id: 2,
    title: 'Доп. работы',
    icon: collapseIcon,
    isShowed: false,
    sumBlock: false,
    content: [
      {
        title: 'Монтаж:',
        value: '83 782.47 тг.'
      },
      {
        title: 'Печать:',
        value: '73 639.76 тг.'
      }
    ]
  },
  {
    id: 3,
    title: 'Доп. расходы',
    icon: collapseIcon,
    isShowed: true,
    sumBlock: false,
    content: [
      {
        title: 'Согласование эскизов:',
        value: '71 841.67 тг.'
      },
      {
        title: 'Доп. печать:',
        value: '10 399.84 тг.'
      },
      {
        title: 'Доп. монтаж:',
        value: '14 892.96 тг.'
      },
      {
        title: 'Размещение в регионах:',
        value: '81 964.85 тг.'
      },
      {
        title: 'Оформление брендированных конструкций:',
        value: '45 649.72 тг.'
      },
      {
        title: 'Дополнительный фотоотчет:',
        value: '36 406.35 тг.'
      }
    ]
  },
  {
    id: 4,
    title: 'Агентская комиссия',
    icon: collapseIcon,
    isShowed: true,
    sumBlock: false,
    content: [
      {
        title: 'Процент АК:',
        value: '5%'
      },
      {
        title: 'Сумма АК:',
        value: '30 000 тг.'
      },
      {
        title: 'Сумма за вычетом АК:',
        value: '150 000 тг.'
      }
    ]
  },
  {
    id: 5,
    title: 'Налоги',
    icon: collapseIcon,
    isShowed: true,
    sumBlock: false,
    content: [
      {
        title: 'Налог:',
        value: '79 597.85 тг.'
      },
      {
        title: 'Скидка на налог:',
        value: '10%'
      },
      {
        title: 'Налога после скидки:',
        value: '81 872.03 тг.'
      }
    ]
  },
  {
    id: 6,
    title: 'НОН РТС',
    icon: collapseIcon,
    isShowed: true,
    sumBlock: false,
    content: [
      {
        title: 'Наружная реклама Актау:',
        value: '35 000 тг.'
      },
      {
        title: 'Радио Алматы:',
        value: '20 000 тг.'
      }
    ]
  },
  {
    id: 7,
    title: 'ИТОГО',
    icon: collapseIcon,
    isShowed: false,
    sumBlock: true,
    value: '1 124 888 тг.'
  }
]
