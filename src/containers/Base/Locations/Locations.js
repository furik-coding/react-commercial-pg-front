import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import PanelDesign from './PanelLocations';
import FilterBar from './FilterBar';

import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { LeftBar } from '../../../components/Styles/DesignList/styles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { BreadCrumbsRoutes } from '../../../components/BreadCrumbs/BreadCrumbs';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { routes } from '../../../routes';

export const locationsContext = createContext();


const LOCATION_CREATE = gql`
  mutation {
    createLocation(input: {}) {
      location {
        id
      }
    }
  }
`;
const Locations = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  const [createLocation, { data }] = useMutation(LOCATION_CREATE);
  useEffect(() => {
    if (data) {
      history.push(routes.bases.location.url(data.createLocation.location.id));
    }
  }, [data]);
  const addLocation= () => {
    createLocation();
  };
  return (
    <locationsContext.Provider value={[filter, setFilter]}>
      <div className="locations-table">
        <LeftBar>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </LeftBar>
        {collapsed && <FilterBar />}
        <div className="locations-table-bar">
          <BreadCrumbsRoutes links={[routes.root.root, routes.bases.root, routes.bases.locations]} />
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Список местоположений</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton
                backgroundColor="#008556"
                  onClick={addLocation}
                >
                Создать новое
              </StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex' }}>
            <PanelDesign style={{ flex: '0 1 auto' }} history={history} />
          </div>
        </div>
        <style>
          {`
          .locations-table{
            display:flex;
          }
          .locations-table-bar{
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            padding: 30px 30px 0 30px;
            width: 100%;
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
      </div>
    </locationsContext.Provider>
  );
};

export default Locations;
