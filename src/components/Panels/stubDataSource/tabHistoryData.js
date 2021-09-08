import React from 'react';
import { Button } from 'antd';
import moment from 'moment';

import { PopupStyled } from '../../Styles/ComponentsStyles';

class TabHistoryData {
  constructor(node) {
    this.node = node;
  }
  getData() {
    const { node } = this;

    return {
      key: node.id && node.id,
      code: node.recordId && `#${node.recordId}`,
      date: node.changed && moment(node.changed).subtract(10, 'days').calendar(),
      manager: node.user ? `${node.user.firstName} ${node.user.lastName}` : '',
      type: node.actionOnModel && node.actionOnModel,
      after: (
        <PopupStyled
          style={{ padding: 0 }}
          placement="bottom"
          content={
            Object.keys(JSON.parse(JSON.stringify(eval('(function(){return ' + node.data + ';})()')))).map(objKey => (
              <p
                key={objKey}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #f0f0f0',
                  paddingBottom: 10
                }}
              >
                <span>{ objKey }: </span>
                <span>{ JSON.parse(JSON.stringify(eval('(function(){return ' + node.data + ';})()')))[objKey] }</span>
              </p>
            ))
          }
        >
          <Button type="primary">Показать данные</Button>
        </PopupStyled>
      )
    }
  }
}

export default TabHistoryData;
