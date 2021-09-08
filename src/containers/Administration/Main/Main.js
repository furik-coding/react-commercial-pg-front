import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Menu } from 'antd';
import styled from 'styled-components';
import { filterRouteShowed, sortRouteByIdx, routes } from '../../../routes';
import { selectionSetMatchesResult } from '@apollo/client/cache/inmemory/helpers';


const Main = () => {
  return (
    <StyledDiv>
      <StyledCard title="Административная панель" bordered={true} style={{ width: 300 }}>
        {(Object.entries(routes.administration).filter(filterRouteShowed).sort(sortRouteByIdx)
          .map(
          ([key, value]) => (
              <Link key={key} to={value.path}>{value.name}</Link>
          )))}
      </StyledCard>
    </StyledDiv>
  );
};

export default Main;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const StyledCard = styled(Card)`
  & > div {
    display: flex;
    flex-direction: column;
  }
`;
