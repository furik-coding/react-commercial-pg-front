import React from 'react';
import styled from 'styled-components';
import icon_search from '../../img/outdoor_furniture/bx-search.svg';

const StyledSearchButton = styled.button`
  border-bottom: 1px solid #d3dff0 !important;
  width: 100%;
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
  color: #003360;
`;

const StyledImg = styled.img`
  padding: 11px;
`;

const SearchBtn = (props) => {
  return (
    <StyledSearchButton onClick={props.onClick} style={{ transition: 'opacity 1s ease-out' }}>
      <StyledImg src={icon_search} alt="" />
      <SearchText>Поиск</SearchText>
    </StyledSearchButton>
  );
};

export default SearchBtn;
