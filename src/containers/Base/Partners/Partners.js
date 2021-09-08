import React, { useState, createContext, useMemo, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import PanelPartners from './PanelPartners';
import FilterBar from './FilterBar';

import { Layout, Breadcrumb } from 'antd';

import styled from 'styled-components';

import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../components/Styles/DesignList/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { routes } from '../../../routes';
import { BreadCrumbsRoutes } from '../../../components/BreadCrumbs/BreadCrumbs';

const { Content, Sider } = Layout;
export const partnersContext = createContext();

const PARTNER_CREATE = gql`
  mutation {
    createPartner(input: { agencyCommission: {} }) {
      partner {
        id
      }
    }
  }
`;
const CONTRACT_CREATE = gql`
  mutation {
    createContract(input: {}) {
      contract {
        id
      }
    }
  }
`;
const ADD_ADVERTISER_TO_PARTNER = gql`
  mutation updatePartner($id: ID!, $advertisers: [ID]) {
    updatePartner(id: $id, input: { advertisersAdd: $advertisers }) {
      partner {
        id
      }
    }
  }
`;

const Partners = () => {
  const history = useHistory();
  const { id } = useParams();

  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  const [flagAddAdvertiserForPartner, setFlagAddAdvertiserForPartner] = useState(false);
  const [advertiserIdSet, setAdvertiserIdSet] = useState([]);

  const [createPartner, { data }] = useMutation(PARTNER_CREATE);
  const [createContract, createContractData] = useMutation(CONTRACT_CREATE);
  const [updatePartner] = useMutation(ADD_ADVERTISER_TO_PARTNER);

  useEffect(() => {
    if (data) {
      history.push(routes.bases.partner.url(data.createPartner.partner.id));
    }
  }, [data]);
  useEffect(() => {
    if (createContractData.data) {
      history.push(routes.bases.agreement.url(createContractData.data.createContract.contract.id));
    }
  }, [createContractData.data]);
  useEffect(() => {
    setFlagAddAdvertiserForPartner(Boolean(id));
  }, [id]);

  const addAdvertiserForPartner = () => {
    if (advertiserIdSet && advertiserIdSet.length) {
      updatePartner({
        variables: {
          id: id,
          advertisers: advertiserIdSet,
        },
      })
        .then((response) => {
          history.push(routes.bases.partner.url(id));
          history.go(0);
        })
        .catch((error) => {
          alert('Бренд не добавлен! Что то поломалось :(');
          console.error(error);
        });
    } else {
      alert('Бренд не выбран!');
    }
  };

  return (
    <partnersContext.Provider value={[filter, setFilter]}>
      <Layout>
        <Layout>
          <StyledSider>
            <SearchBtn onClick={() => setCollapsed(!collapsed)} />
          </StyledSider>
          {collapsed && <FilterBar />}
          <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
            <BreadCrumbsRoutes links={[routes.root.root, routes.bases.root, routes.bases.partners]} />
            <HeaderWrapper>
              <HeaderTitleWrapper>
                <TitleLogo />
                <JobTitle>Контрагенты</JobTitle>
              </HeaderTitleWrapper>
              <ButtonGroup>
                {flagAddAdvertiserForPartner && (
                  <StyledButton backgroundColor="#2c5de5" onClick={addAdvertiserForPartner}>
                    Привязать контрагента
                  </StyledButton>
                )}
                <StyledButton backgroundColor="#008556" onClick={createPartner}>
                  Создать контрагента
                </StyledButton>
                <StyledButton backgroundColor="#2C5DE5" type="button" onClick={createContract}>
                  Создать договор
                </StyledButton>
              </ButtonGroup>
            </HeaderWrapper>
            <div style={{ display: 'flex' }}>
              <PanelPartners
                style={{ flex: '0 1 auto' }}
                history={history}
                flagAddAdvertiserForPartner={flagAddAdvertiserForPartner}
                advertiserIdSet={advertiserIdSet}
                setAdvertiserIdSet={setAdvertiserIdSet}
              />
            </div>
          </Layout>
        </Layout>

        <style>
          {`
          .layout-main {
            background: #fff !important;
            height: 100% !important;
            overflow-x: hidden;
          }
          .layout-sider {
            background: #F5F7FA;
            min-width: 80px !important;
            max-width: 80px !important;
            border-right: 1px solid #d3dff0 !important;
          }
          .layout-breadcrumb {
            font-size: 11px;
            margin: 0 0 30px 0;
          }
          .layout-breadcrumb a, .layout-breadcrumb span {
            color: #8AA1C1 !important;
          }
        `}
        </style>
      </Layout>
    </partnersContext.Provider>
  );
};

const StyledSider = styled(Sider)`
  background: #f5f7fa;
  min-width: 60px !important;
  max-width: 60px !important;
  border-right: 1px solid #d3dff0 !important;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 24px;

  h2 {
    color: #003360;
    font-weight: 600;
    margin: 0;
  }

  img {
    margin-right: 10px;
  }

  & > div {
    display: flex;
    align-items: center;
  }
`;

const StyledContent = styled(Content)`
  display: flex;
`;

export default Partners;
