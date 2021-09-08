import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useQuery, gql } from '@apollo/client';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

import Table from '../../../components/Tablea/Tablea';

import { brandsContext } from './Brands';

const BRANDS_T = gql`
  query searchBrand {
    searchBrand {
      edges {
        node {
          id
          title
          workingSector {
            id
            description
          }
          partners {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;

const initColumnsForPopup = [
  {
    title: 'Бренд',
    dataIndex: 'brand',
    key: 'brand',
    className: 'show',
    isShowed: true,
  },
  {
    title: 'Контрагент',
    dataIndex: 'partner',
    key: 'partner',
    className: 'show',
    isShowed: true,
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'workingSector',
    key: 'workingSector',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true,
  },
  {
    dataIndex: 'btn-remove',
    width: 40,
    key: 'editBtn',
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/partner/brand/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  },
];
const initColumnsTable = [
  {
    title: 'Бренд',
    dataIndex: 'brand',
    key: 'brand',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true,
  },
  {
    title: 'Контрагент',
    dataIndex: 'partner',
    key: 'partner',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true,
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'workingSector',
    key: 'workingSector',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true,
  },
  {
    width: 40,
    title: '',
    key: 'edit',
    dataIndex: 'edit',
    render: (text, record) => (
      <Link to={{ pathname: `/base/partner/brand/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  },
];
const initData = [];

const PanelDesign = ({ flagAddBrandForPartner, brandsIdSet, setBrandsIdSet }) => {
  const location = useLocation();
  const [filter, setFilter] = useContext(brandsContext);
  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);
  const [brands, setBrands] = useState(initData);

  const { loading, error, data, refetch } = useQuery(BRANDS_T, { variables: filter });

  useMemo(() => {
    refetch();
  }, [location]);
  const getByKey = (item, key) =>
    item && item.node[key] && item.node[key].edges && item.node[key].edges.length && item.node[key].edges[0].node;

  const getPartner = (item) => getByKey(item, 'partners');

  useMemo(() => {
    if (data && data.searchBrand && data.searchBrand.edges) {
      setBrands(data.searchBrand.edges.map((item) => {
        return ({
          key: item.node.id,
          brand: item.node.title && item.node.title,
          partner: getPartner(item) && getPartner(item).title,
          workingSector: item.node.workingSector && item.node.workingSector.description
      })}))
    }
  }, [data]);
  if (error) return <h3>Error :(</h3>;

  const changeColumns = (dataIndex) => {
    let localColumnsForPopup = columnsForPopup.map((col, index) => {
      if (col.dataIndex && col.dataIndex === dataIndex) {
        col.isShowed = !col.isShowed;

        return col;
      }
      return col;
    });

    setColumnsForPopup(localColumnsForPopup);

    const newColumnTables = localColumnsForPopup.filter((item) => {
      if (item.isShowed) {
        return item;
      }
      if (item.dataIndex === 'btn-remove') {
        return item;
      }
    });

    setColumnsTable(newColumnTables);
  };

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columnsForPopup={columnsForPopup}
          columns={columnsTable}
          data={brands}
          enableChoosePeriod={false}
          changeColumns={changeColumns}
          loading={loading}
          select={flagAddBrandForPartner}
          constructionsIdSet={brandsIdSet}
          setConstructionsIdSet={setBrandsIdSet}
          // onRow={(record) => {
          //   return {
          //     onClick: () => {
          //       history.push(`/base/partner/brand/${record.key}`);
          //       history.go(0);
          //     }
          //   };
          // }}
        />
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
