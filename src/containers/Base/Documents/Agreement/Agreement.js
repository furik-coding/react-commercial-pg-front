import React, { useMemo, useState ,createContext} from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import PanelAgreement from './PanelAgreement';

import { Layout, Menu, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import breadcrumbs from '../../../../img/outdoor_furniture/bx-breadcrumbs.svg';

export const agreementContext = createContext();
const { Header, Content, Sider } = Layout;
const CONTRACT_ITEM = gql`
  query searchContract(
    $id:ID!
  )
    {
    searchContract(
      id: $id
    ) {
      edges {
        node {
          id
          partner{
            id
            title
          }
          registrationDate
          start
          end
          creator{
            id
            name
          }
          initiator{
            id
            name
          }
          contractType {
            id
            name
          }
          paymentDate
          signatoryOne
          signatoryTwo
          basedOnDocument
          returnStatus
          contractPdf
          additionallyAgreementPdf
          # additionallyAgreement
          comment
          createdAt
          updatedAt
          contractAttachments {
            edges {
              node {
                id
                additionallyAgreement
              }
            }
          }

        }
      }
    }
  }
`;

const OutdoorFurniture = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [item, setItem] = useState({});
  const { error, data, loading } = useQuery(CONTRACT_ITEM , { variables: { id: id } });

  useMemo(() => {
    if (data && data.searchContract.edges.length ) {
      setItem(data.searchContract.edges[0].node);
    }
  }, [data]);
  if (error) return <h3>Error :(</h3>;
  if (loading) return <h3></h3>;

  return (
    <agreementContext.Provider value={ [item, setItem] }>
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
              <Link to="/base/documents/agreements">Договора</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Договор</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
            }}>
              <PanelAgreement/>
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
    </agreementContext.Provider>
  );
};
export default OutdoorFurniture;
