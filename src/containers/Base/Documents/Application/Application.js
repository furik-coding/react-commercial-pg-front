import React, { createContext, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Layout, Breadcrumb } from 'antd';
import { BreadCrumbsRoutes } from '../../../../components/BreadCrumbs/BreadCrumbs';
import { routes  } from '../../../../routes';
import { LoadingAntd } from '../../../../components/UI/Loader/Loader';

import InnerForm from './TabPanelForm/TabPanelFormApplication';

import breadcrumbs from '../../../../img/outdoor_furniture/bx-breadcrumbs.svg';

const { Content, Sider } = Layout;

export const constructApplication = createContext();

const ATTACHMENT_ITEM = gql`
  query searchApplication($id: ID) {
    searchAttachment(id: $id) {
      edges {
        node {
          id
          periodStartDate
          periodEndDate
          createdDate
          contract {
            id
            partner {
              id
              title
            }
          }
          reservations {
            edges {
              node {
                dateFrom
                dateTo
              }
            }
          }
          project {
            title
            creator {
              id
              firstName
              lastName
            }
            createdAt
            comment
            brand {
              id
              title
            }
          }
        }
      }
    }
  }
`;

const ApplicationBase = ({match}) => {
  const [item, setItem] = useState({});

  const { error, data, loading } = useQuery(ATTACHMENT_ITEM, { variables: { id: match.params.id } })

  useEffect(() => {
    if (data && data.searchAttachment.edges.length) {
      setItem(data.searchAttachment.edges[0].node);
    }
  }, [data]);
  if (error)
    return <h3>Error :(</h3>;
  if (loading)
    return <LoadingAntd/>;

  return (
    <constructApplication.Provider value={[item, setItem]}>
      <Layout>
        <Layout>
          <Sider className="layout-sider"></Sider>
          <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
            <BreadCrumbsRoutes links={[
              routes.root.root, routes.bases.root, routes.bases.agreements,
              routes.bases.agreement.url(data.searchAttachment.edges[0].node.contract.id)
            ]}/>
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
    </constructApplication.Provider>
  );
};

export default ApplicationBase;
