import React from 'react';
import Table from '../../../components/Tablea/Tablea';

const PanelDesign = () => {
  const columns = [
    {
      title: 'код проекта',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Рекламная сторона',
      dataIndex: 'side',
      width: 100,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
    },
    {
      title: 'Период',
      dataIndex: 'period',
      width: 100,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 100,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: 100,
    },
    {
      title: 'Брендинг',
      dataIndex: 'branding',
      width: 100,
    },
  ];
  const data = [];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns}
          data={data}
          select={true}
          title={'Забронированные стороны'}
        />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 100%;
            overflow-x: hidden;
          }
          .design-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            // height: 100%;
            // padding: 1.5%;
            // flex: 0 1 30vw;
            // margin: 0 2vw 0 0;
          }`}
      </style>
    </>
  );
};

export default PanelDesign;
