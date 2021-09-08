import React from 'react';

import styled from 'styled-components';

import { routes } from '../../../routes';
import { Link } from 'react-router-dom';
import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import { STab, STabList } from '../../../components/Styles/TabPanelsStyles';


const StyledLink = styled(Link)`
  color: #000000;
`

export function NavigationPanel({activeItem}) {
  return <ControlToolbar position="static">
    <STabList>
      {(Object.entries(routes.administration).filter(([key, tab]) => tab.idx >= 0)
        .map(([key, tab]) => {
        // console.log(tab.value, index)
        return (
          <StyledLink key={tab.idx} to={tab.path}>
            <STab className={tab.idx === activeItem.idx ? "is-selected" : ""}>
              {tab.name}
            </STab>
          </StyledLink>
        )
      }))}
    </STabList>
  </ControlToolbar>
}

