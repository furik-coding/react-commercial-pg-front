import React, { useState, createContext,useMemo } from 'react';
import { useHistory } from 'react-router';
import { useQuery, gql, useMutation } from '@apollo/client';
import PanelCrews from './PanelCrews';
import FilterBar from './FilterBar';

import { Layout, Menu, Breadcrumb, List } from 'antd';
import { Link } from 'react-router-dom';

import { LeftBar } from '../../../components/Styles/DesignList/styles';
import Table from '../../../components/TableResizable/Table';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';

import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../components/Styles/DesignList/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';

const { Content, Sider } = Layout;
const CREW_CREATE = gql`
mutation {
  createCrew(input: {}) {
    crew {
      id
    }
  }
}
`;
export const crewsContext = createContext();

const Crews = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  const[current,setCurrent]=useState(props.match.params.id);
  const [createCrew, { data }] = useMutation(CREW_CREATE);
  useMemo(() => {
    if (data) {
      alert("Page not created")
     //history.push(`/base/crews/crew/${data.createCrew.crew.id}`);
    }
  }, [data]);
  const addConstruction = (e) => {

    if(current)
    {e.preventDefault();
    history.push(`/base/crews/${current}/add_outdoor_furniture`);
    history.go(0);}
    else{
      alert("Выберите Экипаж");
    }
  }
  return (
    <crewsContext.Provider value={[filter, setFilter], [current,setCurrent]}>
      <Layout>
        <Layout>
          <Sider className="layout-sider">
            <SearchBtn onClick={() => setCollapsed(!collapsed)} />
          </Sider>
          {collapsed && <FilterBar />}
          <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
            <Breadcrumb className="layout-breadcrumb">
              <Breadcrumb.Item>
                <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />
                <Link to="/">Главная</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/base/">Базы</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Экипажи</Breadcrumb.Item>
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
                  <JobTitle>Экипажи</JobTitle>
                </HeaderTitleWrapper>
                <ButtonGroup>
                <StyledButton   backgroundColor="#2c5de5" onClick={addConstruction}>
                    Добавить конструкцию
                  </StyledButton>
                  <StyledButton backgroundColor="#008556" onClick={createCrew}>
                    Создать новое
                  </StyledButton>
                </ButtonGroup>
              </HeaderWrapper>
              <div style={{ display: 'flex' }}>

                  <PanelCrews style={{ flex: '0 1 auto' }} />

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
            .layout-breadcrumb a, .layout-breadcrumb   span {
              color: #8AA1C1 !important;
            }


          `}
        </style>
      </Layout>
    </crewsContext.Provider>
  );
};



export default Crews;
