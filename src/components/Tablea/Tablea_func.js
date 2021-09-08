import React, { useEffect, useState } from 'react';
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

const { Content, Sider } = Layout;

let settingmenu = (<></>);

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

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

const predicate = (index, columns, col) => (
  index !== columns.indexOf(columns[columns.length - 1]) && col.isShowed !== false);

export const Tablea = ({columns,columnsForPopup, onRow, enableChooseQuantityColumn,
                         constructionsIdSet, notheader, enableChoosePeriod, title,
                         chooseTableBtns, choosedBlock, setBlock, loading, select, data}) => {

  let [_columns, setColumns] = useState(columns.filter((col, index) => predicate(index, columns, col)));
  let [selectionType, setSelectionState] = useState('checkbox');


  let handleResize = (index) => (e, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  const mappedColumns = columns.filter((col, index) => predicate(index, columns, col)
  ).map((col, index) => ({
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
    setColumns(newCols.filter((col, index) => predicate(index, columns, col)));
  }

  const handleMenuClick = () => {};
  // console.log('[enableChooseQuantityColumn]', enableChooseQuantityColumn)
  if (enableChooseQuantityColumn) {
    settingmenu = (
      <Menu onClick={handleMenuClick}>
        {columnsForPopup
          .map((col) => {
            // console.log(col)
            return (
              <Menu.Item key={col.dataIndex}>
                <Checkbox
                  checked={col.isShowed}
                  onClick={() => changeColumns(col.dataIndex)}
                >
                  {col.title}
                </Checkbox>
              </Menu.Item>
            )}).filter((col) => {
            return col.dataIndex !== 'btn-remove' && col.dataIndex !== 'dateForRouter'
          })}
      </Menu>
    );
  }

  // console.log('[constructionsIdSet]', constructionsIdSet)
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys)
      // setConstructionsIdSet(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
    selectedRowKeys: constructionsIdSet,
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {!notheader && (
        <div className="header-bar">
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
              chooseTableBtns && ( // Верхняя панель с табами
                <CustomTabList>
                  {
                    chooseTableBtns.map((item, index) => (
                      <CustomTabBtn
                        key={index}
                        className={choosedBlock === index ? 'active' : 'booked-sides' }
                        onClick={() => {
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
      )}
      <Content>
        <StyledTable
          onRow={onRow}
          loading={loading}
          rowSelection={
            select && {
              type: selectionType,
              ...rowSelection,
            }
          }
          bordered
          components={{ header: { cell: ResizableTitle }}}
          columns={mappedColumns}
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

}

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
  margin-bottom: 190px;
  th,
  td {
    color: #1a1a1a !important;
    font-weight: 600 !important;
  }

  .ant-table {
    border: 1px solid #d3dff0 !important;
    border-radius: 8px;
  }

  .ant-table-row td:not(:first-child) {
    padding: 5px !important;
  }

  th {
    background: transparent !important;
  }

  .ant-table-body tr:nth-child(odd) {
    background: #f5f7fa !important;
  }

  /* .ant-table-body tr td:not(:first-child) {
    background: #f5f7fa !important;
  } */
`;

const StyledNavigationTabs = styled.div`
  display: inline-flex;
  justify-content: space-between;

`
