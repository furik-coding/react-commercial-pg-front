import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderTitleWrapper, HeaderWrapper } from '../../../components/Styles/DesignList/styles';
import PanelDesign from './PanelProjects';
import { BreadCrumbsRoutes } from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import FilterBar from './FilterBar';
import { useHistory } from 'react-router';
import { routes } from '../../../routes';

const Projects = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="flex-margin">
        <LeftBar>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </LeftBar>
        {collapsed && <FilterBar />}
      </div>

      <div style={{ overflowX: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbsRoutes links={[routes.root.root, routes.installations.root, routes.installations.projects]} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Подача разнарядки</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            <StyledButton
              backgroundColor="#2C5DE5"
              onClick={() => {
                history.push('/installations/orders');
              }}>
              Выгрузка разнарядки
            </StyledButton>
          </ButtonGroup>
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          <PanelDesign style={{ flex: '0 1 auto' }} />
        </div>
      </div>
      {/* {block === 0 ? null : <FilterBar />} */}
      <style>
        {`
         .flex-margin {
            display: flex;
            margin: 0 2vw 0 0;
          }
          .left-bar {
            margin: 0 2vw 0 0;
          }
        `}
      </style>
    </div>
  );
};

export default Projects;
