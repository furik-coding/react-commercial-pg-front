import React, { useState } from 'react';

import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar, ToolbarControl } from '../../../../components/Styles/ControlToolbarStyle';
import AgreementsTab from '../../../../components/Panels/AgreementsTab/AgreementsTab';
import ApplicationsTab from '../../../../components/Panels/ApplicationsTab/ApplicationsTab';

import {  Input } from 'antd';
import { BtnExport, BtnPrint, BtnSettings } from '../../../../components/Styles/ButtonStyles';

import print_icon from '../../../../img/outdoor_furniture/table_icons/print.svg';
import export_icon from '../../../../img/outdoor_furniture/table_icons/export_icon.svg';
import settings_icon from '../../../../img/outdoor_furniture/table_icons/setting.svg';
import searchInputIcon from '../../../../img/header-bar/search-icon.svg';
STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';

const tabs = [{ value: 'Договора' }, { value: 'Приложения' }];
const panel1 = <AgreementsTab />;
const panel2 = <ApplicationsTab />;

const InnerForm = () => {
  const [/*block*/, setBlock] = useState(0);
  return (
    <form style={{ width: '100%' }}>
        <STabs
          selectedTabClassName="is-selected"
          selectedTabPanelClassName="is-selected"
          >
          <ControlToolbar position="static">
            <STabList>
              {tabs.map((tab, index) => {
                return (
                  <STab key={index} onClick={() => setBlock(index)}>
                    {tab.value}
                  </STab>
                );
              })}
            </STabList>
            <ToolbarControl style={{width:"40%",minWidth:"270px"}}>
              <Input
                  style={{ marginLeft: '20px' }}
                  placeholder="Быстрый поиск"
                  suffix="Найти"
                  prefix={<img src={searchInputIcon} />}
                />
              <BtnPrint>
                <img src={print_icon} alt="" />
              </BtnPrint>
              <BtnExport
              // onClick={exportBtnHandler}
              >
                <img src={export_icon} alt="" />
                Экспорт
              </BtnExport>
              <BtnSettings>
                <img src={settings_icon} alt="" />
              </BtnSettings>
            </ToolbarControl>
          </ControlToolbar>

          <STabPanel>{panel1}</STabPanel>
          <STabPanel>{panel2}</STabPanel>

        </STabs>
    </form>
  );
};

export default InnerForm;
