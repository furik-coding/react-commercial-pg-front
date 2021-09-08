import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';
import { routes } from '../../../routes';

const Main = () => {
  return (
    <StyledDiv>
      <StyledCard title="Добро пожаловать в Монтажи!" bordered={true} style={{ width: 300 }}>
        <Link to={routes.installations.projects.path}>{routes.installations.projects.name}</Link>
        <Link to={routes.installations.orders.path}>{routes.installations.orders.name}</Link>
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
