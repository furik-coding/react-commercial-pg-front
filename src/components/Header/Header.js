import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserForm from './UserMenu/UserMenu';

import { routes, sortRouteByIdx, filterRouteShowed } from '../../routes';

const Header = () => {
  const [active, SetActive] = useState(-1);
  let mapMenu = (sectionIdx, routeSection) => (
    <Menu onClick={() => SetActive(sectionIdx)}>
      <Menu.ItemGroup>
        {(Object.entries(routeSection).filter(filterRouteShowed).sort(sortRouteByIdx)
          .map(
            ([key, value]) => (
              <Menu.Item key={key}>
                <Link to={value.path}>{value.name}</Link>
              </Menu.Item>
            )))}
      </Menu.ItemGroup>
    </Menu>
  )

  const salesMenu = mapMenu(0, routes.sales);
  const installationsMenu = mapMenu(1, routes.installations);
  const baseMenu = mapMenu(2, routes.bases);
  const adminMenu = mapMenu(4, routes.administration)

  return (
    <StyledHeader>
      <StyledBlock>
        <Link to="/">
          <img src={require('../../img/partners/logo.svg')} alt="" />
        </Link>
      </StyledBlock>
      <StyledList>
        <Dropdown overlay={salesMenu}>
          <Link to={routes.sales.root.path} onClick={() => SetActive(0)} className={active === 0 && 'active'}>
            Продажи
          </Link>
        </Dropdown>
        <Dropdown overlay={installationsMenu}>
          <Link to={routes.installations.root.path} onClick={() => SetActive(1)} className={active === 1 && 'active'}>
            Монтажи
          </Link>
        </Dropdown>

        <Dropdown overlay={baseMenu}>
          <Link to={routes.bases.root.path} onClick={() => SetActive(2)} className={active === 2 && 'active'}>
            Базы{' '}
          </Link>
        </Dropdown>

        <Link to={routes.installations.design.path}>Отчеты</Link>

        <Dropdown overlay={adminMenu}>
          <Link to={routes.administration.root.path} onClick={() => SetActive(4)} className={active === 4 && 'active'}>
            Администрация
          </Link>
        </Dropdown>
      </StyledList>
      <StyledBlock>
        <UserForm
          name="Алексей"
          surname="Иванов"
          position="Администратор"
          avatar="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
        />
      </StyledBlock>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 45px;
  font-size: 14px;
  background: #fff;
  box-shadow: 0 1px 2px 0 #92b6e8, inset 0 -3px 0 0 #e7eef8;
  z-index: 1;
`;

const StyledList = styled.div`
  a {
    padding: 29px 25px;
    color: #003360;
    font-weight: 600;
  }
  a:hover {
    color: #d42d11;
    border-bottom: 3px solid #d42d11;
  }
  a:nth-of-type({active}) {
    color: #d42d11;
    border-bottom: 3px solid #d42d11;
  }
  .active {
    color: #d42d11;
    border-bottom: 3px solid #d42d11;
  }
`;

const StyledBlock = styled.div`
  width: 300px;
`;
