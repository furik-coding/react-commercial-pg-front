import React from 'react';

import Table from '../../../components/Tablea/Tablea';
import { useHistory } from 'react-router';

const PanelDesign = () => {
  const columns = [
    {
      title: 'код проекта',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Клиент',
      dataIndex: 'client',
      width: 100,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      width: 80,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },
    {
      title: 'Всего сторон',
      dataIndex: 'allsides',
      width: 100,
    },
    {
      title: 'Проданных сторон',
      dataIndex: 'salesides',
      width: 100,
    },

    {
      title: 'Распред. сторон',
      dataIndex: 'spreadsides',
      width: 100,
    },

    {
      title: 'Не распред. сторон',
      dataIndex: 'nspreadsides',
      width: 100,
    },
  ];
  const data = [
    {
      key: 1,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 2,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 3,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 4,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 5,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
  ];
  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns}
          data={data}
          select={true}
          history={useHistory()}
          link="/installations/design"
        />
      </div>
      <style>
        {`.outdoor-table-bar {
           width:100%;
          }
         `}
      </style>
    </>
  );
};

export default PanelDesign;
