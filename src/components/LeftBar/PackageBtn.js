import React from 'react';
import styled from 'styled-components';
import packageIcon from '../../img/left-bar/package.svg';

const StyledSearchButton = styled.button`
  border-bottom: 1px solid #d3dff0 !important;
  height: 65px;
  width: 100%;
  margin: 1vw 0 0 0;
  text-align: center;
  border: none;
  background: #f5f7fa;
  :hover {
    cursor: pointer;
  }
`;

const SearchText = styled.h6`
  font-family: 'SF UI Display Light', sans-serif;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 7px;
  padding: 10px 0;
  color: #003360;
`;

const PackageBtn = (props) => {
  return (
    <StyledSearchButton style={{ transition: 'opacity 1s ease-out' }}>
      <img src={packageIcon} alt="" />
      <SearchText>{props.text}</SearchText>
    </StyledSearchButton>
  );
};

export default PackageBtn;
