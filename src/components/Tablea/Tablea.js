import React from 'react';
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
// import '../../../src/assets/fonts/sf-ui-display-cufonfonts-webfont/style.css'

const { Content } = Layout;

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

const filterPredicate = (index, columns, col) => {
  return col.isShowed !== false
  // index !== columns.indexOf(columns[columns.length - 1]) && col.isShowed !== false
}

const menuPredicate = (col) => (
  true
  // col.dataIndex !== 'btn-remove' && col.dataIndex !== 'dateForRouter'
);

class Tablea extends React.Component {
  state = {
    selectionType: 'checkbox',
    datetype: 'date',
    // columns: this.props.columns,
    columns: this.props.columns.filter((col, index) => filterPredicate(index, this.props.columns, col)),
    constructionsIdSet: this.props.constructionsIdSet
  };
  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  componentDidMount() {
    console.log(1)
    this.setState({
      columns: this.props.columns.filter((col, index) => filterPredicate(index, this.props.columns, col))
    })
  }

  handleResize = (index) => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const columns = (
      this.props.columns.filter((col, index) => filterPredicate(index, this.props.columns, col))
    ).map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    const changeColumns = (dataIndex) => {
      let newCols = this.props.columns.map(item => {
        if(item.dataIndex === dataIndex) {
          item.isShowed = !item.isShowed
        }
        return item;
      })
      this.setState({
        columns: newCols.filter((col, index) => filterPredicate(index, this.props.columns, col))
      });
    }

    const handleMenuClick = () => {};
    // console.log('[this.props.enableChooseQuantityColumn]', this.props.enableChooseQuantityColumn)
    if (this.props.enableChooseQuantityColumn) {
      settingmenu = (
        <Menu onClick={handleMenuClick}>
          {
            this.props.columns
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
                )}).filter(menuPredicate)
          }
        </Menu>
      );
    }

    // console.log('[this.props.constructionsIdSet]', this.props.constructionsIdSet)
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys)
        // this.props.setConstructionsIdSet(selectedRowKeys);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
      selectedRowKeys: this.props.constructionsIdSet,
    };

    if (this.props.edit) {
      columns.push(
        {
          width: 50,
          render: (text, record) => {
            return (
              <img src={icon_pen} alt="edit icon" style={{ cursor: 'pointer' }}
                   onClick={() => {
                     this.props.setOpenEditModal(true);
                     this.props.setEditingItem(record);
                   }}
              />
            );
          },
        },
        {
          width: 50,
          render: (text, record) => {
            return (
              <img src={icon_delete} alt="delete icon" style={{ cursor: 'pointer' }}
                   onClick={() => this.props.openModal(record, this.props.deleteEstimate, this.props.setDeleted)}
              />
            );
          },
        },
      );
    }

    return (
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        {!this.props.notheader && <TableaHeaderBar props={this.props}/>}
        <Content>
          <StyledTable
            onRow={this.props.onRow}
            rowSelection={
              this.props.select && {
                type: this.selectionType,
                ...rowSelection,
              }
            }
            loading={this.props.loading}
            /*bordered* TODO: сделать Header bordered по макету */
            footer={this.props.footer ? () => this.props.footer : undefined}
            components={this.components}
            columns={columns}
            dataSource={this.props.data}
            scroll={{ y: 500 }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              placement: 'top',
              pageSizeOptions: ['25', '50', '100', '1000'],
              total: this.props.data.length,
            }}
          />
        </Content>
        <style>
        </style>
      </div>
    );
  }
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
  th {
    color: #1a1a1a !important;
    font-weight: 600 !important;
    // border-right: 1px solid black;
    // margin: 10px;
  }
  td {
    color: #1a1a1a !important;
    font-weight: 500 !important;
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


let TableaHeaderBar = (props) => {
  return <div className="header-bar">
    <StyledNavigationTabs>
      {props.enableChoosePeriod ? (
        <React.Fragment>
          {props.title ? (
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12 }}>
              <img src={attachIcon} alt="" />
              <span style={{ minWidth: 'max-content', fontWeight: '600', marginLeft: '12px', fontSize: '16px' }}>
                      {props.title}
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
        props.chooseTableBtns && (
          <CustomTabList>{/*Верхняя панель с табами*/}
            {
              props.chooseTableBtns.map((item, index) => (
                <CustomTabBtn
                  key={index}
                  className={props.choosedBlock === index ? 'active' : 'booked-sides' }
                  onClick={() => {
                    console.log(index)
                    props.setBlock(index);
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

      {props.enableChooseQuantityColumn && (
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
