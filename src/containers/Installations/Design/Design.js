import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import PanelDesign from './PanelDesign';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';

import styled from 'styled-components';

const Design = () => {
  const [block, setBlock] = useState(0);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'installation', value: 'Монтажи' },
    { id: 'installations/design', value: 'Проекты' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
      </LeftBar>

      <div style={{ width: '100%', overflow: ' hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Проект - FF5800</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            {block === 0 ? (
              <>
                <StyledButton backgroundColor="#D42D11">Повторное размещение</StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка снарядки</StyledButton>
                <StyledButton backgroundColor="#FF5800">Смета</StyledButton>
              </>
            ) : (
              <>
                <StyledButton backgroundColor="#2C5DE5">Создать дизайн</StyledButton>
              </>
            )}
          </ButtonGroup>
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          <InfoList>
            <InfoItem>
              <InfoTitle>Информация о проекте</InfoTitle>

              <InfoLine>
                <span>Код проекта</span>
                <InfoValue>#20202023123</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Дата создания</span>
                <InfoValue>21.05.2020</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Менеджер по продажам</span>
                <InfoValue>Иван Иванович Иванов</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Ответственный менеджер</span>
                <InfoValue>Иванов Иван</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Информация о бренде</InfoTitle>

              <InfoLine>
                <span>Бренд</span>
                <InfoValue>Coca Cola</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Сектор деятельности</span>
                <InfoValue>Безалкогольные напитки</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Рекламодатель</InfoTitle>
              <InfoLine>
                <span>Рекламодатель</span>
                <InfoValue>Агентство</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Рекламное агентство</span>
                <InfoValue>-</InfoValue>
              </InfoLine>
            </InfoItem>
          </InfoList>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />

          {/* {block === 0 ? null : <FilterBar />} */}
        </div>
      </div>
      <style>
        {`
          .left-bar {
            margin: 0 2vw 0 0;
          }
        `}
      </style>
    </div>
  );
};

export default Design;
const InfoList = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  height: 100%;
  padding: 1.5%;
  flex: 0 1 auto;
  margin: 0 2vw 0 0;
`;
const InfoItem = styled.li`
  margin: 4% 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d3dff0;
`;
const InfoTitle = styled.h3`
  font-size: 16px;
`;
const InfoLine = styled.div`
  margin: 4% 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;
const InfoValue = styled.span`
  font-weight: 600;
  text-align: right;
`;
