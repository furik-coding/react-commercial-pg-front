import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Main = () => {
  return (
    <StyledDiv>
      <Card title="Добро пожаловать!" bordered={true} style={{ width: 300 }}>
        <p>Тестовая заставка</p>
      </Card>
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
