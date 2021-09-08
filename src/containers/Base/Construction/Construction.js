import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import InnerForm from './TabPanelForm/TabPanelFormConstruction';

import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { LoadingAntd } from '../../../components/UI/Loader/Loader'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export const constructContext = createContext();
// advertisingSide {
//   id
//  }
const Construction = (props) => {
  const CONSTRUCT_ITEM = gql`
    query SearchConstruction($id: ID!) {
      searchConstruction(id: $id) {
        edges {
          node {
            id
            location {
              postcode {
                id
                title
                district {
                  id
                  title
                  city {
                    title
                    id
                  }
                }
              }
              marketingAddress {
                address
              }
              hasArea
            }
            format {
              id
              title
              model {
                id
                title
                underfamily {
                  id
                  title
                  family {
                    id
                    title
                  }
                }
              }
            }
            coordinates
            presentationUrl
            isNonrts
            nonrtsOwner {
              title
            }
            backComment
            createdAt
            backComment
            photo
            crew {
              id
              name
            }
            techInventNumber
            techPhoneConstruction
            techProblem
            statusConnection
            obstruction {
              id
            }
            buhInventNumber
            photo
            ownedSides {
              edges {
                node {
                  id
                  advertisingSide {
                    id
                    title
                    side {
                      id
                      title
                      size
                      format {
                        id
                        title
                      }
                    }
                  }
                  purposeSide {
                    id
                    title
                  }
                  availabilitySide
                }
              }
            }
          }
        }
      }
    }
  `;

  const [id, setId] = useState(props.match.params.id);
  const {error, data, loading} = useQuery(CONSTRUCT_ITEM, { variables: { id: id } });
  const [item, setItem] = useState({});

  useMemo(() => {
    if (data && data.searchConstruction.edges.length) {
      setItem(data.searchConstruction.edges[0].node);
    }
  }, [data]);
  console.log(item);
  if (error) return <h3>Error :(</h3>;
  if (loading) return <LoadingAntd/>;

  return (
    <constructContext.Provider value={[item, setItem]}>
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
              <Breadcrumb.Item>Конструкции</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
              }}>
              <InnerForm  />
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
    </constructContext.Provider>
  );
};

export default Construction;
