import React from 'react';
import styled from 'styled-components';
import editIcon from '../../img/left-bar/edit.svg';

const StyledSearchButton = styled.button`
  border-bottom: 1px solid #d3dff0 !important;
  height: 75px;
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

const EditBtn = (props) => {
  return (
    <StyledSearchButton style={{ transition: 'opacity 1s ease-out' }}>
      <img src={editIcon} alt="" />
      <SearchText>{props.text}</SearchText>
    </StyledSearchButton>
  );
};

export default EditBtn;
