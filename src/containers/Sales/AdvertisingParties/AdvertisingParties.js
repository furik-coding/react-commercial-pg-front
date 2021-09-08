import React, { useState, createContext, useEffect, useMemo } from 'react';
import { Layout, message } from 'antd';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { BreadCrumbsRoutes } from '../../../components/BreadCrumbs/BreadCrumbs';

import { ReservationSlider } from './BottomSlider';
import FilterBar from './FilterBar';
import { FilterLeftBar } from './LeftBarFilters/FilterLeftBar';

import { colorOrangeAccent, colorAccent } from '../../../components/Styles/Colors';
import './styles_adv_part.scss';
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { GanttChartAdvertisingSides } from './GanttChartAdvertisingSides';
import { useHistory } from 'react-router';
import { routes } from '../../../routes';
import { gql, useLazyQuery } from '@apollo/client';
import useDebounce from '../../Administration/components/useDebounce';

export const adverContext = createContext();



const AdvertisingParties = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [chartItems, setChartItems] = useState([]);
  const [filter, setFilter] = useState({});
  const [refetch, setRefetch] = useState(null);
  const [ganttUpdater, setGanttUpdater] = useState(null);
  const [resCreated, setResCreated] = useState(false);
  const [period, setPeriod] = useState({
    start: new Date(2020, 4, 1, 0, 0, 0, 0),
    end: new Date(2020, 8, 31, 0, 0, 0, 0),
  });
  const history = useHistory();

  const getSelected = (items) => {
    let dst = [];
    for (let item of items) {
      if (item.isSelected) {
        dst.push(item.content);
      }
    }
    return dst;
  };

  const sliderState = new SliderState({ name: '', key: '' });
  return (
    <adverContext.Provider
      value={{
        filter,
        setFilter,
        chartItems,
        setChartItems,
        refetch,
        setRefetch,
        resCreated,
        setResCreated,
        period,
        setPeriod,
      }}>
      <Layout>
        <Layout>
          <FilterLeftBar props={(setCollapsed, collapsed)} />
          {collapsed && <FilterBar refetch={refetch} ganttUpdater={ganttUpdater} />}
          <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
            <BreadCrumbsRoutes links={[routes.sales.root, routes.sales.advertising_parties]} />
            <HeaderWrapper>
              <HeaderTitleWrapper>
                <TitleLogo />
                <JobTitle>Справочник рекламных сторон</JobTitle>
              </HeaderTitleWrapper>
              <ButtonGroup>
                <StyledButton
                  backgroundColor={colorAccent}
                  onClick={() => {
                    const selected = getSelected(chartItems);
                    if (selected.length) {
                      sliderState.setAddShowed(true);
                    } else {
                      message.error('Пожалуйста сначала выберите сторону конструкции');
                    }
                  }}>
                  Быстрая бронь
                </StyledButton>
                <StyledButton backgroundColor={colorAccent}>Создать проект</StyledButton>
                <StyledButton
                  backgroundColor={colorAccent}
                  onClick={() => history.push(routes.sales.project_card.url('VlByb2plY3ROb2RlOjI='))}>
                  Сохранить
                </StyledButton>
                <StyledButton backgroundColor={colorOrangeAccent}>Создать отчет</StyledButton>
              </ButtonGroup>
            </HeaderWrapper>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="outdoor-table-bar" style={{ flex: '0 1 auto' }}>
                <GanttChartAdvertisingSides filter={filter} setGanttUpdater={setGanttUpdater} />
              </div>
              {sliderState.addShowed && <ReservationSlider sliderState={sliderState} />}
            </div>
          </Layout>
        </Layout>
        <style>
          {`
        body {
          overflow: hidden;
        }
        `}
        </style>
      </Layout>
    </adverContext.Provider>
  );
};
export default AdvertisingParties;
