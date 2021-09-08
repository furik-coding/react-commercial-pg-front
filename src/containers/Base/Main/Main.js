import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';

const Main = () => {
  return (
    <StyledDiv>
      <StyledCard title="Добро пожаловать в Базы!" bordered={true} style={{ width: 300 }}>
        <Link to="/base/outdoor_furniture">Конструкции</Link>
        <Link to="/base/locations">Список местоположений</Link>
        <Link to="/base/partners">Контрагенты</Link>
        <Link to="/base/documents/agreements">Документы</Link>
        <Link to="/base/crews">Экипажи</Link>
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
