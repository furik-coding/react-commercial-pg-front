import React, { useContext } from 'react';
import moment from "moment";
import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { DatePicker } from 'antd';
import { StyledInput } from '../../../../Styles/DesignList/styles';

import numberIcon from '../../../../../img/input/number.svg';
export const AkimatResolution = (props) => {
  const [item, setItem] = useContext(locationContext);
  return (
    <Medium>
      <BlockTitle>Постановление от акимата</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '49%' }}>
            <InputTitle>Номер</InputTitle>
            <StyledInput
              prefix={<img src={numberIcon} alt={"Номер"}/>}
              value={item.resolutionNumber ? item.resolutionNumber :""}
              onChange={(e) => {setItem({...item, resolutionNumber:e.target.value})}}
              size={'large'}
            />
          </div>
          <div style={{ width: '49%' }}>
            <InputTitle>Дата</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.resolutionNumberDate ? moment(item.resolutionNumberDate) : ''}
              onChange={(date) => setItem({ ...item, resolutionNumberDate:new Date(date) })}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default AkimatResolution;
