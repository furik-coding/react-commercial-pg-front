//Styles for Toolbar:
import styled from "styled-components";
import search_icon from "../../img/outdoor_furniture/table_icons/find_icon.svg";

export const ControlToolbar = styled.div`
    background-color: #e7eef8;
    width: 100%;
    height: 42px;
    border-radius: 6px;
    padding: 11px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    position: relative;
`;

export const ToolbarControl = styled.div`
    display: flex;
    justify-content: space-between;
    max-width:550px;
    height: 32px;
    overflow-x:hidden;
`;


export const InputWrapper = styled.div`
      width: 100%;
       &:before {
                content: "";
                z-index: 1000;
                top: 6px;
                left: 15px;
                width: 32px;
                height: 32px;
                position: absolute;
                background-image: url(${search_icon});
                background-repeat: no-repeat;
                background-position: center;
                display: inline-block;
              }
`;


export const StyledInput = styled.input`
      width: 400px;
      height: 32px;
      padding: 8px 37px;
      border-radius: 5px;
      position: relative;
      border: none;
      &::placeholder{
      font-family: "SF UI Display Light", sans-serif;
      font-size: 12px;
      letter-spacing: 0.25px;
      color: #656565;
      }
`;
