import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../Tablea/Tablea';

import { partnerContext } from "../../../../containers/Base/Partner/Partner";

const columns = [
  {
    title: 'Код',
    dataIndex: 'code',
    key: 'name',
    width: 100,
  },
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'name',
    width: 100,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',
    key: 'name',
    width: 100,
  },
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'name',
    width: 100,
  },
  {
    title: 'Агентская комиссия',
    dataIndex: 'agencyCommission',
    key: 'name',
    width: 100,
  },
];

const RelatedProjects = () => {
  const [item, /*setItem*/] = useContext(partnerContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(item.projects.edges && item.projects.edges.length) {
      const projectList = item.projects.edges.node.map((item, index) => ({
        key: index,
        code: item.code,
        title: item.title,
        brand: item.brand,
        client: item.client,
        agencyCommission: item.agencyCommission,
      }));

      setData(projectList);
    }
  }, [item]);

  return <Table
    columns={columns}
    data={data}
    notheader={true}
  />;
};
export default RelatedProjects;
