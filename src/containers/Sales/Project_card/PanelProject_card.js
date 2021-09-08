import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea/Tablea_func';
import { Link, useHistory } from 'react-router-dom';
import icon_pen from "../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg";
import { column } from '../../../components/Table/utils';
import { routes } from '../../../routes';


const createInitColumnsForPopup = ({sliderState}) => [
  column('Код стороны', 'reservation_code', 130),
  column('Город', 'reservation_city', 100),
  column('Адрес', 'reservation_address', 100),
  column('Формат', 'reservation_format', 100),
  column('Сторона', 'reservation_side', 100, false),
  column('Дата создания', 'reservation_createDate', 100),
  column('Дата начала', 'reservation_startDate', 100),
  column('Дата окончания', 'reservation_expirationDate', 100),
  column('Статус', 'reservation_status', 100, false),
  column('Продление брони', 'reservation_renewalOfReservation', 100, false),
  column('Брендирование', 'reservation_branding', 100),
  column('Освещение', 'reservation_lighting', 100, false),
  column('Пакет', 'reservation_package', 100, false),
  column('Дизайн', 'reservation_design', 100, false),
  {
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => {
      return (
          <Link to={{  state: {  reserveId: record.id } }} onClick={() => { sliderState.setAddShowed(true); }} >
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      )
    },
    isShowed: true
  },
  column('', 'dateForRouter', 0),
];

const createInitColumnsForPopup2 = () => [
  column('Код стороны', 'reservation_code', 130),
  column('Город', 'reservation_city', 100),
  column('Адрес', 'reservation_address', 100),
  column('Формат', 'reservation_format', 100),
  column('Сторона', 'reservation_side', 100, false),
  column('Дата создания', 'reservation_createDate', 100),
  column('Дата начала', 'reservation_startDate', 100),
  column('Дата окончания', 'reservation_expirationDate', 100),
  column('Статус', 'reservation_status', 100, false),
  column('Продление брони', 'reservation_renewalOfReservation', 100, false),
  column('Брендирование', 'reservation_branding', 100),
  column('Освещение', 'reservation_lighting', 100, false),
  column('Пакет', 'reservation_package', 100, false),
  column('Дизайн', 'reservation_design', 100, false),
];

const createInitColumnsTable = ({sliderState}) => [
  column('Номер приложения', 'attachment_code', 130),
  column('Сумма', 'attachment_summa', 100),
  column('Дата создания', 'attachment_createDate', 100),
  column('Сроки', 'attachment_reservDates', 220),
  {
    key: 'btn-remove',
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => {
      return (
        // <Link to={{  state: {  reserveId: record.id } }} onClick={() => sliderState.setAddShowed(true)} >
        <Link to={routes.sales.application.url(record.id)}>
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      )
    },
    isShowed: true
  },
  column('', 'dateForRouter', 0),
];


export const PanelProjectCard = ({sliderState, choosedBlock, loading, setBlock, panelData}) => {

  const initColumnsForPopup = createInitColumnsForPopup({sliderState});
  const initColumnsTable = createInitColumnsTable({sliderState});

  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsForPopup);
  const [data, setData] = useState(panelData.reservations)

  useEffect(() => {
    if (choosedBlock === 0) {
      setColumnsForPopup(initColumnsForPopup);
      setColumnsTable(initColumnsForPopup);
      setData(panelData.reservations);
    }
    else {
      setColumnsForPopup(initColumnsTable);
      setColumnsTable(initColumnsTable);
      setData(panelData.attachments);
    }
  }, [choosedBlock, loading])

  const headerTableBtns = [
    {
      'title': 'ЗАБРОНИРОВАННЫЕ СТОРОНЫ'
    },
    {
      'title': 'ПРИЛОЖЕНИЯ'
    }
  ]

  return (
    <>
      <div className="outdoor-table-bar">
      <Table
        style={{ width: '100%' }}
        columns={columnsTable}
        // setColumns={setColumnsTable}
        data={data}
        select={true}
        columnsForPopup={createInitColumnsForPopup2()}
        chooseTableBtns={headerTableBtns}
        choosedBlock={choosedBlock}
        setBlock={setBlock}
        loading={loading}
      />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 100%;
            overflow-x: hidden;
          }
         `}
      </style>
    </>
  );
};

