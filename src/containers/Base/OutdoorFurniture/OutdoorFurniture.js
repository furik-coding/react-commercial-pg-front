import React, {useState, createContext, useMemo, useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';

import PanelOutdoor from './PanelOutdoor';
import FilterBar from './FilterBar';

import { Layout, Breadcrumb } from 'antd';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../components/Styles/DesignList/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { routes } from '../../../routes';

const { Content, Sider } = Layout;

export const outContext = createContext();

const CONSTRUCT_CREATE = gql`
  mutation {
    createConstruction(input: {}) {
      construction {
        id
      }
    }
  }
`;

const ADD_CONSTRUCT_TO_LOCATION = gql`
  mutation (
  $id: ID!
  $constructionsAdd: [ID]
) {
  updateLocation(
    id: $id
    input: {
      constructionsAdd: $constructionsAdd
    }
  ) {
    location {
      id
    }
  }
}
`;
const ADD_CONSTRUCT_TO_CREW = gql`
  mutation (
  $id: ID!
  $constructionsAdd: [ID]
) {
  updateCrew(
    id: $id
    input: {
      constructions: $constructionsAdd
    }
  ) {
    crew {
      id
    }
  }
}
`;
const OutdoorFurniture = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  const [flagAddConstruction, setFlagAddConstruction] = useState(false);
  const [constructionsIdSet, setConstructionsIdSet] = useState([]);
  const { id } = useParams();
  const [createConstructionMutation, { data }] = useMutation(CONSTRUCT_CREATE);
  const [updateLocation] = useMutation(ADD_CONSTRUCT_TO_LOCATION);
  const [updateCrew] = useMutation(ADD_CONSTRUCT_TO_CREW);

  let createConstruction = () => {
    createConstructionMutation();
  }

  useEffect(() => {
    if (data) {
      history.push(routes.bases.construction.url(data.createConstruction.construction.id));
    }
  }, [data]);

  useEffect(() => {
    setFlagAddConstruction(Boolean(id));
  }, [id]);

  const addConstruction = () => {
    if(constructionsIdSet && constructionsIdSet.length) {
      if(props.isCrew){
        updateCrew({ variables: {
          id: id,
          constructionsAdd: constructionsIdSet
        }})
          .then((response) => {
            history.push(`/base/crews/${id}`);
            history.go(0);
          })
          .catch(error => {
            alert('Конструкция не добавлена! Что то поломалось :(')
            console.error(error)
          })
      }
      else{
      updateLocation({ variables: {
          id: id,
          constructionsAdd: constructionsIdSet
        }})
          .then((response) => {
            history.push(`/base/locations/location/${id}`);
            history.go(0);
          })
          .catch(error => {
            alert('Конструкция не добавлена! Что то поломалось :(')
            console.error(error)
          })
      }
    } else {
      alert('Конструкция не выбрана')
    }
  }

  return (
    <outContext.Provider value={[filter, setFilter]}>
      <Layout>
        <Layout>
          <Sider className="layout-sider">
            <SearchBtn onClick={() => setCollapsed(!collapsed)} />
          </Sider>
          {collapsed && <FilterBar />}
          <Layout className="layout-main">
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
              <HeaderWrapper>
                <HeaderTitleWrapper>
                  <TitleLogo />
                  <JobTitle>Конструкции</JobTitle>
                </HeaderTitleWrapper>
                <ButtonGroup>
                  {
                    flagAddConstruction
                    && (
                      <StyledButton
                        backgroundColor="#2c5de5"
                        onClick={addConstruction}
                      >
                        Добавить конструкцию
                      </StyledButton>
                    )
                  }
                  <StyledButton
                    backgroundColor="#008556"
                    onClick={createConstruction}
                  >
                    Создать конструкцию
                  </StyledButton>
                </ButtonGroup>
              </HeaderWrapper>
              <div style={{ display: 'flex' }}>
                <PanelOutdoor
                  style={{ flex: '0 1 auto' }}
                  flagAddConstructionToLocation={flagAddConstruction}
                  constructionsIdSet={constructionsIdSet}
                  setConstructionsIdSet={setConstructionsIdSet}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
        <style>
          {`
          .layout-main {
            background: #fff !important;
            height: 100% !important;
            padding: 30px 30px 0 30px;
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
    </outContext.Provider>
  );
};
export default OutdoorFurniture;
