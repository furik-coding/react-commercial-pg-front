import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Popover, Button, Space } from 'antd';
const Tab = (props) => {
  return (
    <Space>
      <span>{props.title}</span>
      <Button
        type="primary"
        style={{ borderRadius: '5px', marginLeft: '5px' }}
        onClick={() => {
          props.history.push('/sales/project_card');
        }}>
        Открыть Проект
      </Button>
    </Space>
  );
};
export default Tab;
