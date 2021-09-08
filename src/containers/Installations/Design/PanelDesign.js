import React from 'react';
import { STab, STabList, STabPanel, STabs } from '../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import Table from '../../../components/Tablea/Tablea';

import styled from 'styled-components';

const PanelDesign = (props) => {
  const tabs = [{ value: 'Закрепленные стороны' }, { value: 'Дизайн' }];
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Рекламная сторона',
      dataIndex: 'side',
      width: 100,
    },
    {
      title: 'Дизайн',
      dataIndex: 'design',
      width: 100,
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      width: 100,
    },
    {
      title: 'Дата монтажа',
      dataIndex: 'datei',
      width: 100,
    },
    {
      title: 'Дата демонтажа',
      dataIndex: 'datedi',
      width: 100,
    },
  ];
  const data = [
    {
      key: 1,
      code: '#2020050301323',
      side: 'Смотрит на дорогу',
      design: '20384_cocacola.jpg',
      comment: 'Новый монтаж',
      datei: '19.07.2020',
      datedi: '19.07.2020',
    },
    {
      key: 2,
      code: '#2020050301323',
      side: 'Смотрит на дорогу',
      design: '20384_cocacola.jpg',
      comment: 'Новый монтаж',
      datei: '19.07.2020',
      datedi: '19.07.2020',
    },
    {
      key: 3,
      code: '#2020050301323',
      side: 'Смотрит на дорогу',
      design: '20384_cocacola.jpg',
      comment: 'Новый монтаж',
      datei: '19.07.2020',
      datedi: '19.07.2020',
    },
    {
      key: 4,
      code: '#2020050301323',
      side: 'Смотрит на дорогу',
      design: '20384_cocacola.jpg',
      comment: 'Новый монтаж',
      datei: '19.07.2020',
      datedi: '19.07.2020',
    },
    {
      key: 5,
      code: '#2020050301323',
      side: 'Смотрит на дорогу',
      design: '20384_cocacola.jpg',
      comment: 'Новый монтаж',
      datei: '19.07.2020',
      datedi: '19.07.2020',
    },
  ];
  return (
    <STabs className="all" selectedTabClassName="is-selected" selectedTabPanelClassName="is-selected">
      <ControlToolbar position="static">
        <STabList>
          {tabs.map((tab, index) => {
            return (
              <STab key={index} onClick={() => props.setBlock(index)}>
                {tab.value}
              </STab>
            );
          })}
        </STabList>
      </ControlToolbar>
      <STabPanel>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
        </div>
      </STabPanel>
      <STabPanel>
        <div className="design-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1vw' }}>
            <DesignItem>Дизайн 1</DesignItem>
            <DesignItem>Дизайн 2</DesignItem>
            <DesignItem>Дизайн 3</DesignItem>
            <DesignItem>Дизайн 4</DesignItem>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1vw' }}>
            <DesignItem>Дизайн 5</DesignItem>
            <DesignItem>Дизайн 6</DesignItem>
            <DesignItem>Дизайн 7</DesignItem>
            <DesignItem>Дизайн 8</DesignItem>
          </div>
        </div>
      </STabPanel>
      <style>
        {`
         .all{
          width: 100%;
          overflow-x: hidden;
        }
        .outdoor-table-bar {
          width: 100%;
          }
          .design-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            // height: 100%;
            // padding: 1.5%;
            // flex: 0 1 30vw;
            // margin: 0 2vw 0 0;
          }`}
      </style>
    </STabs>
  );
};

export default PanelDesign;

const DesignItem = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  padding: 5vw;
`;
