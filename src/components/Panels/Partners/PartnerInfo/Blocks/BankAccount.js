import React, { useContext } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

import { BlockBody, Quarter, BlockTitle, InputTitle, Row } from '../../../../Styles/StyledBlocks';
import {  StyledInput } from '../../../../Styles/DesignList/styles';

import anchorIcon from '../../../../../img/input/anchor.svg';

export default function BankAccount() {
  const [item, setItem] = useContext(partnerContext);
  return (
    <Quarter style={{ height: '100%' }}>
      <BlockTitle>Банковский счет</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Банк получателя</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              value={item.bankRecipient ? item.bankRecipient : ''}
              onChange={(e) => setItem({ ...item, bankRecipient: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>ИИК</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              value={item.iik ? item.iik : ''}
              onChange={(e) => setItem({ ...item, iik: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>БИК</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              value={item.bik ? item.bik : ''}
              onChange={(e) => setItem({ ...item, bik: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%', marginBottom: '21px' }}>
            <InputTitle>Кбе</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              value={item.kbe ? item.kbe : ''}
              onChange={(e) => setItem({ ...item, kbe: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Quarter>
  );
}
