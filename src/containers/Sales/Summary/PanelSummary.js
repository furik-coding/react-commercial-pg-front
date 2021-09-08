import React from 'react';
import Table from '../../../components/Tablea/Tablea';


const PanelDesign = () => {
  const columns = [
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
    },
    {
      title: 'Назначение стороны',
      dataIndex: 'siderole',
      width: 100,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 100,
    },
    {
      title: 'Монтаж',
      dataIndex: 'install',
      width: 100,
    },
    {
      title: 'Фотоотчет',
      dataIndex: 'photo',
      width: 100,
    },
    {
      title: 'Доп. Фотоотчет',
      dataIndex: 'addphoto',
      width: 100,
    },
    {
      title: 'Смета',
      dataIndex: 'estimate',
      width: 100,
    },
    {
      title: 'Приложение',
      dataIndex: 'app',
      width: 100,
    },
    {
      title: 'Счет',
      dataIndex: 'invoice',
      width: 100,
    },
    {
      title: 'АВР',
      dataIndex: 'avr',
      width: 60,
    },
  ];
  const data = [
    {
      key: 1,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 2,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 3,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 4,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 5,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
  ];
  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} select={false} />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 100%;
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
