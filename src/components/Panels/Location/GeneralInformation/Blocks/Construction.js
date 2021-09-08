import React from 'react';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledSelect,StyledInput } from '../../../../Styles/DesignList/styles';
import { RedDeleteBtn, SecondaryBtnStyled } from '../../../../Styles/ButtonStyles';
import red_can from '../../../../../img/outdoor_furniture/red_can.svg';
import tvIcon from '../../../../../img/input/tv.svg';
import anchorIcon from '../../../../../img/input/anchor.svg';
import infoIcon from '../../../../../img/input/info.svg';

export const Construction = ({ code, location, format, remove, open }) => {

  return (
    <Medium>
      <BlockTitle>Конструкция - номер</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Код конструкции</InputTitle>
            <StyledInput
              prefix={<img src={tvIcon} />}
              placeholder="050001.00361.01"
              defaultValue={code ? code : 'Нет данных'}
              //onChange={(e) => {setItem({...item, postcode:e.target.value})}}
              size={'large'}
            />
          </div>
        </Row>
        <Row style={{ borderTop: '1px solid #d3dff0' }}>
          <InputTitle ><img src={infoIcon} style={{marginRight:"12px"}} /><span> Информация о конструкции</span></InputTitle>
        </Row>
        <Row>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <InputTitle style={{ width: '45%' }}>Маркетинговый адрес</InputTitle>
          <StyledInput
              prefix={<img src={anchorIcon} />}
              style={{ width: '50%' }}
              placeholder="Алматы, Абая ост."
              defaultValue={location && location.marketingAddress && location.marketingAddress.address}
              //onChange={(e) => {setItem({...item, postcode:e.target.value})}}
              size={'large'}
            />

          </div>
        </Row>
        <Row style={{ borderBottom: '1px solid #d3dff0' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <p>Формат</p>
            <p>
              {
                format ? format.title : 'Нет данных'
              }
            </p>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <SecondaryBtnStyled
              type="button"
              onClick={(e) => open(e)}
            >
              Открыть конструкцию
            </SecondaryBtnStyled>
            <RedDeleteBtn
              type="button"
              onClick={(e) => remove(e)}
            >
              <img src={red_can} alt="img" />
            </RedDeleteBtn>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Construction;
