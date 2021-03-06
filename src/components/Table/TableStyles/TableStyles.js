import styled from "styled-components";
import search_icon from "../../../img/outdoor_furniture/table_icons/find_icon.svg";

//Styles for table:

export const Styles = styled.div`
  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid #d3dff0;
    text-align: left;
    margin: 0;
    vertical-align: middle;
    height: 100%;
    color: #1a1a1a;
    font-family: "SF UI Display Light", sans-serif;
    font-weight: 400;
    font-size: 14px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    .tr {
      :last-child {
        .td {
          border-bottom: 1px solid #d3dff0;
        }
      }
      :nth-child(even) {
        .td {
          background-color: #f5f7fa;
        }
        :nth-last-child(1) {
          background: cyan;
        }
      }
      :first-child {
        height: 45px;
      }
    }
    .th,
    .td {
      padding: 8px 0 0 8px;
      border-bottom: 1px solid #d3dff0;
      border-right: 1px solid #d3dff0;
      background-color: #fff;
      white-space: nowrap;
      :last-child {
        border-right: 0;
      }
      ${""}
      position: relative;
      :last-child {
        border-right: 0;
      }
      .resizer {
        display: inline-block;
        //background: blue;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
        &.isResizing {
          background: red;
        }
      }
    }
    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        box-shadow: none;
      }
      .header {
        top: 0;
        font-family: "SF UI Display Medium", sans-serif;
      }
      .footer {
        bottom: 0;
      }
      .body {
        position: relative;
        z-index: 0;
      }
      [data-sticky-td] {
        position: sticky;
      }
    }
  }
`;

export const PaginationStyled = styled.div`
  width: 100%;
  padding: 0 20px;
  border: 1px solid #d3dff0;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
`;

export const PaginationWrap = styled.div`
  padding-top: 16px;
  color: red;
`;
