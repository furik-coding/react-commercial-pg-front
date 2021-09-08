import React, { useLayoutEffect, useState } from 'react';
import { Resizable } from 'react-resizable';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Menu, Table, DatePicker, Checkbox, Select, Button, Input, Dropdown } from 'antd';

import { CustomTabBtn, CustomTabList } from '../Styles/DesignList/styles';

import plusIcon from '../../img/header-bar/plus-icon.svg';
import attachIcon from '../../img/header-bar/attach.svg';
import minusIcon from '../../img/header-bar/minus-icon.svg';
import searchInputIcon from '../../img/header-bar/search-icon.svg';
import printerIcon from '../../img/header-bar/printer.svg';
import exportIcon from '../../img/header-bar/export.svg';
import settingsIcon from '../../img/header-bar/settings.svg';
import './Tablea.scss'
import icon_pen from '../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';
import icon_delete from '../../img/outdoor_furniture/red_can.svg';
import {
  StyledPen,
  StyledPenGreen,

  StyledTrash,
} from '../../containers/Administration/components/Styled';
// import '../../../src/assets/fonts/sf-ui-display-cufonfonts-webfont/style.css'

const { Content } = Layout;


const ResizableTitle = ({ onResize, width, ...restProps }) => {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};


const menuPredicate = (col) => (
  true
  // col.dataIndex !== 'btn-remove' && col.dataIndex !== 'dateForRouter'
);

let filterColumns = (columns) => {
  return (
    columns
      .filter((col, index) => (col.isShowed !== false || col.hasOwnProperty('children') || col.dataIndex === 'btn-remove'))
      .map((col) => !col.hasOwnProperty('children') ? col : { ...col, children: filterColumns(col.children) })
      .filter((col, index) => !col.hasOwnProperty('children') || col.children.length > 0)
  )
}

export const Tablea = ({
                         columns, onRow, enableChooseQuantityColumn,
                         constructionsIdSet, notheader, enableChoosePeriod, title,
                         chooseTableBtns, choosedBlock, setBlock, loading, select, data, footer,
                         openDeleteModal, deleteMutation, refetch, setDeleted, edit, setOpenEditModal, setEditingItem
                       }) => {
  let [_columns, setColumns] = useState(filterColumns(columns));

  let handleResize = (index) => (e, { size }) => {
    let nextColumns = [...localColumns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns)
  };

  const localColumns = (filterColumns(columns)).map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const changeColumns = (dataIndex) => {
    let newCols = columns.map(item => {
      if(item.dataIndex === dataIndex) {
        item.isShowed = !item.isShowed
      }
      return item;
    })
    setColumns(filterColumns(newCols))
  }
  let settingmenu = (<></>);

  // const handleMenuClick = () => {};
  // if (enableChooseQuantityColumn) {
  //   settingmenu = (
  //     <Menu onClick={handleMenuClick}>
  //       {
  //         columns.map((col) => {
  //           return (
  //             <Menu.Item key={col.dataIndex}>
  //               <Checkbox checked={col.isShowed} onClick={() => changeColumns(col.dataIndex)}>
  //                 {col.title}
  //               </Checkbox>
  //             </Menu.Item>
  //           )}).filter(menuPredicate)
  //       }
  //     </Menu>
  //   );
  // }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys)
      // this.props.setConstructionsIdSet(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
    selectedRowKeys: constructionsIdSet,
  };

  // css-классы для вертикальной разлиновки многострочного заголовка
  let clsMultiRow = 'colhead-multiline-multirow';
  let clsMultiLineRow = 'colhead-multiline-row';
  let clsMlFirst = 'colhead-first-line-middle';
  let clsMlMiddle = 'colhead-first-line-middle';
  let clsMlLast = 'colhead-first-line-last';
  let addThMultilineClass = (domNode, isFirst) => {
    if (isFirst)
      domNode.classList.add(clsMlFirst)
    else
      domNode.classList.add(clsMlMiddle)
  }
  let addThMultilineClassLast = (domNode) => {
    domNode.classList.add(clsMlLast)
  }
  let checkItemIsOnlyText = (domNode) => {
    return (!domNode.hasChildNodes
      || (domNode.childNodes && domNode.childNodes.length === 1
        && domNode.childNodes[0].nodeType === Node.TEXT_NODE));
  }
  useLayoutEffect(() => {
    let x = document.querySelectorAll('.custom-tablea-antd .ant-table-thead > tr')
    let item = x[0];
    item.classList.remove(clsMultiLineRow);
    if (x && x.length < 2)
      return;
    if (!item.hasChildNodes)
      return;
    item.classList.add(clsMultiLineRow);
    let childList = item.childNodes;
    let isFirst = true;
    let lastI = childList.length - 1;
    for (let i = 0; i < childList.length; ++i) {
      let childItem = childList[i];
      childItem.classList.remove(clsMultiRow)
      childItem.classList.remove(clsMlFirst)
      childItem.classList.remove(clsMlMiddle)
      childItem.classList.remove(clsMlLast)
      if (checkItemIsOnlyText(childItem)) {
        if ((i === lastI) || !checkItemIsOnlyText(childList[i + 1]))
          addThMultilineClassLast(childItem);
        else {
          addThMultilineClass(childItem, false);
          isFirst = false;
        }
      }
      else {
        if (i > 1) // пропустить первый чекбокс
          childItem.classList.add(clsMultiRow);
        isFirst = true;
      }
    }
  })

  if (edit) {
    localColumns.push(
      {
        width: 50,
        render: (text, record) => {
          return (<StyledPenGreen onClick={() => { setOpenEditModal(true); setEditingItem(record); } } />)
        }
      },
      {
        width: 50,
        render: (text, record) => {
          return (
            <StyledTrash className='EditTrashStyle' alt='' onClick={() =>
              openDeleteModal(record, deleteMutation, refetch, setDeleted)
            }
            />
          );
        }
      },
    );
  }


  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {(!notheader
        && <TableaHeaderBar
          enableChoosePeriod={enableChoosePeriod}
          title={title}
          chooseTableBtns={chooseTableBtns}
          choosedBlock={choosedBlock}
          setBlock={setBlock}
          enableChooseQuantityColumn={enableChooseQuantityColumn}
          settingmenu={settingmenu}
        />)}
      <Content>
        <StyledTable
          className={"custom-tablea-antd"}
          onRow={onRow}
          rowSelection={
            select && {
              type: 'checkbox',
              ...rowSelection,
            }
          }
          loading={loading}
          /*bordered* TODO: сделать Header bordered по макету */
          footer={footer ? () => footer : undefined}
          components={{header: { cell: ResizableTitle }}}
          columns={localColumns}
          dataSource={data}
          scroll={{ y: 500 }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            placement: 'top',
            pageSizeOptions: ['25', '50', '100', '1000'],
            total: data.length,
          }}
        />
      </Content>
      <style>
      </style>
    </div>
  );
};


Tablea.propTypes = {
  enableChoosePeriod: PropTypes.bool,
  enableChooseQuantityColumn: PropTypes.bool,
  columns: PropTypes.array,
  onRow: PropTypes.func,
};
Tablea.defaultProps = {
  enableChoosePeriod: true,
  enableChooseQuantityColumn: true,
  columns: [],
  onRow: () => undefined,
};

export default Tablea;

const StyledTable = styled(Table)`
  width: 100%;
  margin-bottom: 190px;

  th {
    color: #1a1a1a !important;
    font-weight: 600 !important;
    // border-right: 1px solid black;
    // margin: 10px;
    border-bottom: 1px solid #d3dff0 !important;
    background: transparent !important;
  }
  // Легкий шрифт в теле таблицы
  td {
    color: #1a1a1a !important;
    font-weight: 500 !important;
  }
  .ant-table {
    border: 1px solid #d3dff0 !important;
    border-radius: 8px;
  }
  .ant-table-content {
    overflow: auto;
  }
  // .ant-table-row td:not(:first-child),
  // .ant-table-row td:not(:first-child) {
  //   padding: 5px !important;
  // }
  // .ant-table-body tr:nth-child(odd),
  // & .ant-table-tbody tr:nth-child(even) {
  //   background: #f5f7fa !important;
  // }
  & .ant-table-thead > tr > th[colspan]:not([colspan='1']) {
    left: 5px;
  }
  & .ant-table-tbody > tr.ant-table-row:hover > td {
    //background: #d3dff0;
    background: #FFFFFF;
  }
  // Разделитель главных групп заголовка
  & .ant-table-thead > tr > th:not(:last-child) > span {
    background: #d3dff0;
    width: 1px;
    height: calc(100% - 1.2rem);
    margin-top: .6rem;
    display: inline-block;
    top: 0;
    right: 2px;
  }
  & .ant-table-thead > tr.colhead-multiline-row th.colhead-first-line-first:after {
    // border: none;
  }
  & .ant-table-thead > tr.colhead-multiline-row > th[colspan]:not([colspan='1']) {
    left: 0px;
  }
  & .ant-table-thead > tr.colhead-multiline-row th.colhead-first-line-middle:after {
    border-right: 1px solid #d3dff0 !important;
    right: 0;
    top: 0;
    widhth: 1px;
    margin-top: .6rem;
    height: calc(100% - .6rem);
    position: absolute;
    display:block;
    content: '.';
    color: rgba(0, 0, 0, 0);
  }
  .ant-table-thead > tr.colhead-multiline-row th.colhead-multiline-multirow:after {
    border-left: 1px solid #d3dff0 !important;
    left: 0;
    top: 0;
    widhth: 100%;
    margin-top: .6rem;
    height: calc(100% - 1.2rem);
    position: absolute;
    display:block;
    content: '.';
    color: rgba(0, 0, 0, 0);
  }
  & .ant-table-thead > tr th.colhead-first-line-last:after {
  }
  & .ant-table-thead > tr.colhead-multiline-row > th > span {
    // display: none;
    right: -1px !important;
  }
  // Полосы фона на четных строках
  & .ant-table-tbody tr:nth-child(odd) td {
     background: #f5f7fa !important;
  }
  svg {
    vertical-align: unset;
  }
  // Интервал между строками в теле
  .ant-table-tbody > tr > td, .ant-table tfoot > tr > td {
    padding: .8rem;
  }

  // белые линии в таблице
  .ant-table-tbody > tr > td:not(:last-child):not(:first-child):after {
    border-right: 1px solid #FFFFFF !important;
    right: 2px;
    top: 0;
    widhth: 1px;
    height: 100%;
    position: absolute;
    display:block;
    content: '.';
    color: rgba(0, 0, 0, 0);
  }
  //.ant-table-body tr td:not(:first-child) {
  //  background: #f5f7fa !important;
  //}
  //.ant-table-body tr td:not(:first-child) {
  //  background: #f5f7fa !important;
  //}
`;

const StyledNavigationTabs = styled.div`
  display: inline-flex;
  justify-content: space-between;

`


let TableaHeaderBar = ({enableChoosePeriod, title, chooseTableBtns, choosedBlock, setBlock,
                         enableChooseQuantityColumn, settingmenu}) => {
  return <div className="header-bar">
    <StyledNavigationTabs>
      {enableChoosePeriod ? (
        <React.Fragment>
          {title ? (
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12 }}>
              <img src={attachIcon} alt="" />
              <span style={{ minWidth: 'max-content', fontWeight: '600', marginLeft: '12px', fontSize: '16px' }}>
                      {title}
                    </span>
            </div>
          ) : (
            <div>
              <div style={{display: 'flex', marginRight: '1rem'}}>
                <Button className="header-btn">
                  <img src={plusIcon} />
                </Button>
                <Button className="header-btn">
                  <img src={minusIcon} />
                </Button>
              </div>
            </div>
          )}
        </React.Fragment>
      ) : (
        <div></div>
      )}
      {
        chooseTableBtns && (
          <CustomTabList>{/*Верхняя панель с табами*/}
            {
              chooseTableBtns.map((item, index) => (
                <CustomTabBtn
                  key={index}
                  className={choosedBlock === index ? 'active' : 'booked-sides' }
                  onClick={() => {
                    console.log(index)
                    setBlock(index);
                  }}>
                  {item.title}
                </CustomTabBtn>
              ))
            }
          </CustomTabList>
        )
      }
    </StyledNavigationTabs>

    <div>
      <Input
        style={{ marginLeft: '20px' }}
        placeholder="Быстрый поиск"
        suffix="Найти"
        prefix={<img src={searchInputIcon} />}
      />
      <Button style={{ marginLeft: '5px' }} className="header-btn">
        <img src={printerIcon} />
      </Button>
      <Button
        style={{ width: '180px', display: 'flex', justifyContent: 'space-between' }}
        className="header-btn">
        <img src={exportIcon} />
        <span>Экспорт</span>
      </Button>

      {enableChooseQuantityColumn && (
        <Dropdown
          overlay={settingmenu}
          className="header-btn"
          trigger={['click']}
          placement="bottomRight">
          <Button style={{ marginLeft: '5px' }} className="header-btn">
            <img src={settingsIcon} />
          </Button>
        </Dropdown>
      )}
    </div>
  </div>
}
