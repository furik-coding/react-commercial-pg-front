import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Layout, Breadcrumb } from 'antd';

import PanelAgreements from './PanelAgreements';

import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import breadcrumbs from '../../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { routes } from '../../../../routes';

const { Content, Sider } = Layout;
const CONTRACT_CREATE = gql`
  mutation {
    createContract(input: {}) {
      contract {
        id
      }
    }
  }
`;
const Agreements = (props) => {
  const [block, setBlock] = useState(0);
  const history =useHistory();
  const [ createContract , { data }] = useMutation(CONTRACT_CREATE);
  useEffect(() => {
    if (data) {
     history.push(routes.bases.agreement.url(data.createContract.contract.id));
    }
  }, [data]);
  return (
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
            <Breadcrumb.Item>Договора</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
            }}>
            <HeaderWrapper>
              <HeaderTitleWrapper>
                <TitleLogo />
                <JobTitle>Документы</JobTitle>
              </HeaderTitleWrapper>
              <ButtonGroup>
                {block == 0 && (
                    <StyledButton
                      backgroundColor="#2c5de5"
                      type="button"
                      onClick={createContract}
                    >
                      Создать договор
                    </StyledButton>
                ) }
              </ButtonGroup>
            </HeaderWrapper>
            <div style={{ display: 'flex' }}>
            <PanelAgreements  />
            </div>
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
  );
};

export default Agreements;
