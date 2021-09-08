import React from 'react';
import { Breadscrumbs } from '../ComponentsStyles';
import { Breadcrumb, Layout } from 'antd';
import { Link } from 'react-router-dom';
import breadcrumbs from '../../img/outdoor_furniture/bx-breadcrumbs.svg';
import '../../containers/Base/Partners/Style/style.css';
import styled  from "styled-components";

function BreadCrumbs({ links, fromRoot }) {
  return (
    <StyledBreadcrumb>
      <StyledBreadcrumbItem>
          <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />
          <StyledLink to="/">Главная</StyledLink>
      </StyledBreadcrumbItem>
      {
        links.map((link, i) => {
            return (
              <StyledBreadcrumbItem key={i}>
                <StyledLink to={`${(fromRoot && '') || '/'}${link.id}`}>{link.value}</StyledLink>
              </StyledBreadcrumbItem>
            );
          })
      }
    </StyledBreadcrumb>
  );
}


export function BreadCrumbsRoutes({ links }) {
  return (
    <StyledBreadcrumb>
      {/*<StyledBreadcrumbItem>*/}
        {/*<img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />*/}
        {/*<StyledLink to="/">Главная</StyledLink>*/}
      {/*</StyledBreadcrumbItem>*/}
      {
        links.map((link, i) => {
          return (
            <StyledBreadcrumbItem key={i}>
              {i === 0 && <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />}
              <StyledLink to={link.path}>{link.name || link.title || ''}</StyledLink>
            </StyledBreadcrumbItem>
          );
        })
      }
    </StyledBreadcrumb>
  );
}

const StyledLink = styled(Link)`
    color: #8AA1C1 !important;
`;
const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
    color: #8AA1C1 !important;
`;
const StyledBreadcrumb = styled(Breadcrumb)`
    font-size: 11px;
    margin: 0 0 20px 0;
`;


export default BreadCrumbs
