import React, { useEffect, useState, createContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import InnerForm from './TabPanelForm/TabPanelFormPartner';

import { Layout } from 'antd';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';
import { BreadCrumbsRoutes } from '../../../components/BreadCrumbs/BreadCrumbs';
import { routes } from '../../../routes';

const { Content, Sider } = Layout;

export const partnerContext = createContext();
const PartnersInfo = ({ match }) => {
  const [item, setItem] = useState({});
  const [commissionForm, setCommisionForm] = useState(null);
  const PARTNER_ITEM = gql`
    query SearchPartner($id: ID!) {
      searchPartner(id: $id) {
        edges {
          node {
            id
            title
            workingSectors {
              edges {
                node {
                  id
                  title
                }
              }
            }
            comment
            partnerType {
              id
              title
            }
            clientType {
              id
              title
            }
            district {
              id
              title
              code
              city {
                title
              }
            }
            binNumber
            legalAddressPostcode {
              id
              title
              district {
                id
                title
                city {
                  id
                  title
                }
              }
            }

            legalAddress {
              id
              address
            }
            actualAddress {
              id
              address
            }
            bankRecipient
            iik
            bik
            kbe
            isAgencyCommissionWithNds
            agencyCommission {
              id
              toMount
              toNalog
              toNonrts
              toAdditional
              toPrint
              toRent
              percent
              value
            }

            contactPersons {
              edges {
                node {
                  id
                  name
                  email
                  phone
                }
              }
            }
            projects {
              edges {
                node {
                  code
                  title
                  brand {
                    id
                  }
                  client {
                    id
                  }
                  agencyCommission {
                    id
                    toMount
                    toNalog
                    toNonrts
                    toPrint
                    toRent
                    percent
                    value
                  }
                }
              }
            }
            brands {
              edges {
                node {
                  code
                  title
                  createdAt
                }
              }
            }
            advertisers {
              edges {
                node {
                  title
                  binNumber
                }
              }
            }
          }
        }
      }
    }
  `;

  const { error, data, loading } = useQuery(PARTNER_ITEM, { variables: { id: match.params.id } });

  useEffect(() => {
    if (data) {
      setItem(data.searchPartner.edges[0].node);
    }
  }, [data]);

  if (error) return <h3>Error :(</h3>;
  if (loading) return <LoadingAntd />;
  return (
    <partnerContext.Provider value={[item, setItem, commissionForm, setCommisionForm]}>
      <Layout>
        <Layout>
          <Sider className="layout-sider"></Sider>
          <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
            <BreadCrumbsRoutes links={[routes.root.root, routes.bases.root, routes.bases.partners]} />

            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
              }}>
              <InnerForm constructionID={match.params.id} />
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
          .layout-breadcrumb a,.layout-breadcrumb  span {
            color: #8AA1C1 !important;
          }
        `}
        </style>
      </Layout>
    </partnerContext.Provider>
  );
};

export default PartnersInfo;
