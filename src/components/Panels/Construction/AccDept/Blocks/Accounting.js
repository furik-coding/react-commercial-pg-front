import React, { useContext } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../Styles/DesignList/styles';
import { BlockBody, Large, Row,  BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import anchorIcon from '../../../../../img/input/anchor.svg';
export default function Accounting() {

  const [item, setItem] = useContext(constructContext);

  return (

    <Large>
      <BlockTitle>Параметры - 1С</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '392px' }}>
            <InputTitle>Инвентарный номер</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.buhInventNumber ? item.buhInventNumber : ''}
              onChange={(e) => setItem({ ...item,buhInventNumber: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Large>
  );
}
