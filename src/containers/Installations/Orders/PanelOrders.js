import React from 'react';
import Table from '../../../components/Tablea/Tablea';

const PanelDesign = () => {
  const columns = [
    {
      title: 'код рекламной стороны',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Экипаж',
      dataIndex: 'crew',
      width: 100,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 100,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
    },
    {
      title: 'Сторона',
      dataIndex: 'side',
      width: 100,
    },
    {
      title: '№ фото',
      dataIndex: 'photo',
      width: 100,
    },
    {
      title: 'Монтаж',
      dataIndex: 'install',
      width: 100,
    },
    {
      title: 'Демонтаж',
      dataIndex: 'deinstall',
      width: 100,
    },
    {
      title: 'Выгружено',
      dataIndex: 'upload',
      width: 100,
    },
  ];
  const data = [
    {
      key: 1,
      code: '#2020050301323',
      crew: 'Куликов Акундин',
      address: 'Абая - ост. ГорВодоКанал',
      format: 'Сениор',
      side: 'Статическая Б',
      install: '19.05.2020',
      deinstall: '19.05.2020',
      upload: '19.05.2020',
    },
    {
      key: 2,
      code: '#2020050301323',
      crew: 'Куликов Акундин',
      address: 'Абая - ост. ГорВодоКанал',
      format: 'Сениор',
      side: 'Статическая Б',
      install: '19.05.2020',
      deinstall: '19.05.2020',
      upload: '19.05.2020',
    },
    {
      key: 3,
      code: '#2020050301323',
      crew: 'Куликов Акундин',
      address: 'Абая - ост. ГорВодоКанал',
      format: 'Сениор',
      side: 'Статическая Б',
      install: '19.05.2020',
      deinstall: '19.05.2020',
      upload: '19.05.2020',
    },
    {
      key: 4,
      code: '#2020050301323',
      crew: 'Куликов Акундин',
      address: 'Абая - ост. ГорВодоКанал',
      format: 'Сениор',
      side: 'Статическая Б',
      install: '19.05.2020',
      deinstall: '19.05.2020',
      upload: '19.05.2020',
    },
    {
      key: 5,
      code: '#2020050301323',
      crew: 'Куликов Акундин',
      address: 'Абая - ост. ГорВодоКанал',
      format: 'Сениор',
      side: 'Статическая Б',
      install: '19.05.2020',
      deinstall: '19.05.2020',
      upload: '19.05.2020',
    },
  ];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
      </div>
      <style>
        {`.outdoor-table-bar {
       width: 100%;
          }
         `}
      </style>
    </>
  );
};

export default PanelDesign;
