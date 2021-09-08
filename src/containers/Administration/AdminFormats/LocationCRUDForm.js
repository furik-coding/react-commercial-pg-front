import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import {
  SliderCellColRaw,
  SliderFormItem,
  StyledButtonSlider,
} from '../../../components/SlidingBottomPanel/PanelComponents';

import { RowMargin1st } from '../components/Styled';

const StyledButtonSliderW10rem = styled(StyledButtonSlider)`
    max-width: 15rem;
`
export function LocationCRUDForm({actionText="Добавить", entityName, initialValues, ...props}) {
  const requiredProps = { rules: [ { required: true } ] };
  return (
    <CRUDForm initialValues={initialValues} {...props}>
        <RowMargin1st {...{xl: 7, lg: 9, md: 12}}>
          <SliderCellColRaw {...{xl: 4, lg: 5, md: 8}}>
            <SliderFormItem label={`Название ${entityName}`} {...requiredProps} name='name'>
              <Input placeholder={`Введите название ${entityName}`} size={'large'} />
            </SliderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xl: 2, lg: 3, md: 4}}>
            <StyledButtonSliderW10rem type="primary" htmlType="submit">
              {actionText}
            </StyledButtonSliderW10rem>
          </SliderCellColRaw>
        </RowMargin1st>
    </CRUDForm>
  );
}
