import React, { useState } from 'react';
import { LeftBar, StyledButto, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import PanelDesign from './PanelOrders';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import FilterBar from './FilterBar';

const Orders = () => {
  const [block, setBlock] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'installations', value: 'Монтажи' },
    { id: 'installations/orders', value: 'Выгрузка разнарядки' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="flex-margin">
        <LeftBar>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </LeftBar>
        {collapsed && <FilterBar />}
      </div>

      <div style={{ overflowX: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Выгрузка разнарядки</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup></ButtonGroup>
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />
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

export default Orders;
