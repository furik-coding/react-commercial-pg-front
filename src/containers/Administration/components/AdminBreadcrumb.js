import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { routes } from '../../../routes'


export function AdministrationBreadcrumb({location}) {
  return <Breadcrumb className="layout-breadcrumb">
    <Breadcrumb.Item>
      <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }}/>
      <Link to="/">Главная</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <Link to={`${routes.administration.root.path}`}>Администрация</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>{location.name}</Breadcrumb.Item>
  </Breadcrumb>;
};

