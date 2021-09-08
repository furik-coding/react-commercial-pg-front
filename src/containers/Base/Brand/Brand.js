import React, { createContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Layout, Breadcrumb } from 'antd';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';

import InnerForm from './TabPanelForm/TabPanelFormBrand';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';

const { Content, Sider } = Layout;

export const constructBrand = createContext();

const BRAND_ITEM = gql`
  query searchBrand($id: ID) {
    searchBrand(id: $id) {
      edges {
        node {
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
                workingSectors {
                  edges {
                    node {
                      title
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Brand = (props) => {
  const [ id ] = useState(props.match.params.id);
  const [brandData, setBrandData] = useState({});

  const { error, data, loading } = useQuery(BRAND_ITEM, { variables: { id } });
  useMemo(() => {
    if (data && data.searchBrand.edges.length) {
      setBrandData(data.searchBrand.edges[0].node);
    }
  }, [data]);
  if (error) return <h3>Error :(</h3>;
  if (loading) return <LoadingAntd />;

  return (
    <constructBrand.Provider value={[brandData, setBrandData]}>
      <Layout>
        <Layout>
          <Sider className="layout-sider"></Sider>
          <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
            <Breadcrumb className="layout-breadcrumb">
              <Breadcrumb.Item>
                <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />
                <Link to="/">Главная</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/base/">Базы</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/base/brands">Бренды</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
              }}>
              <InnerForm />
            </Content>
          </Layout>
        </Layout>
        <style>
          {`
          .layout-main {
            background: #fff !important;
            height: 100% !important;
          }
          .layout-sider {
            background: #F5F7FA;
            min-width: 60px !important;
            max-width: 60px !important;
            border-right: 1px solid #d3dff0 !important;
          }
          .layout-breadcrumb {
            font-size: 11px;
            margin: 0 0 20px 0;
          }
          .layout-breadcrumb a, .layout-breadcrumb span {
            color: #8AA1C1 !important;
          }
        `}
        </style>
      </Layout>
    </constructBrand.Provider>
  );
};

export default Brand;
