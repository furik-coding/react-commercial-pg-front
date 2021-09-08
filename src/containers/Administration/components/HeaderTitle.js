import { HeaderTitleWrapper, HeaderWrapper } from '../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import React from 'react';



export function HeaderTitle({title}) {
  return <HeaderTitleWrapper>
    <TitleLogo />
    <JobTitle>{title}</JobTitle>
  </HeaderTitleWrapper>;
};


