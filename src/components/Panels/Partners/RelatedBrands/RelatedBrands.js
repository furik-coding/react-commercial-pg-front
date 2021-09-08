import React, { useContext, useEffect, useMemo, useState } from 'react';

import Table from '../../../Tablea/Tablea';
import { partnerContext } from "../../../../containers/Base/Partner/Partner";

const columns = [
  {
    title: 'Код',
    dataIndex: 'code',

    width: 50,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',

    width: 100,
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'workingSector',

    width: 100,
  },
  {
    title: 'Привязано',
    dataIndex: 'createdAt',

    width: 100,
  },
];
const initData = [
  {
    key: 1,
    code: '2020053012',
    brand: 'CocaCola',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
  {
    key: 2,
    code: '2020053012',
    brand: 'CocaCola',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
  {
    key: 3,
    code: '2020053012',
    brand: 'CocaCola',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
  {
    key: 4,
    code: '2020053012',
    brand: 'CocaCola',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
]; //нужно убрать этот масив initData после того как проверим правильность данных с бека

const RelatedBrands = () => {
  const [item] = useContext(partnerContext);
  const [data, setData] = useState([]);

  useMemo(() => {
    if(item.brands.edges && item.brands.edges.length) {
      const brandsList = item.brands.edges.map((item, index) => ({
        key: index,
        code: item.node.code,
        brand: item.node.title,
        workingSector: item.node.workingSector ? item.node.workingSector.title : '',
        createdAt: item.node.createdAt,
      }));

      setData(brandsList);
    }
  }, [item]);

  // const columns = React.useMemo(() => makeColumns, []);
  // const data = React.useMemo(() => makeData, []);

  // return (
  //   <>
  //     <Table columns={columns} data={data} />
  //   </>
  // );

  return <Table
    columns={columns}
    data={data}
    notheader={true}
  />;
};

export default RelatedBrands;
