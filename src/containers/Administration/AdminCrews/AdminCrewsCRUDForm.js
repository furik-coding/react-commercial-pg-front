import styled from 'styled-components';
import {
  SliderCellColRaw, SliderCol,
  SliderFormItem,
  StyledButtonSlider, StyledOption, StyledSelect,
} from '../../../components/SlidingBottomPanel/PanelComponents';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { RowMargin1st } from '../components/Styled';
import { Input } from 'antd';
import React from 'react';

const StyledButtonSliderW10rem = styled(StyledButtonSlider)`
    max-width: 15rem;
`
export function CrewsCRUDForm({actionText="Добавить", entityName, initialValues, ...props}) {
  const requiredProps = { rules: [ { required: true } ] };
  return (
    <CRUDForm initialValues={initialValues} {...props}>
        <RowMargin1st {...{xl: 9, lg: 10, md: 12}}>
          <SliderCellColRaw {...{xl: 3, lg: 5, md: 8}}>
            <SliderFormItem label="Выбрать город" {...requiredProps} name='city'>
              <StyledSelect placeholder="Выберите город" size={'large'}>
                <StyledOption value="Алматы">Алматы</StyledOption>
                <StyledOption value="Актау">Актау</StyledOption>
                <StyledOption value="Алматы1">Алматы1</StyledOption>
                <StyledOption value="Актау1">Актау1</StyledOption>
                <StyledOption value="Алматы2">Алматы2</StyledOption>
                <StyledOption value="Актау2">Актау2</StyledOption>
              </StyledSelect>
            </SliderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xl: 3, lg: 5, md: 8}}>
            <SliderFormItem label="Имя экипажа" {...requiredProps} name='name'>
              <Input placeholder="Введите имя экипажа" size={'large'} />
            </SliderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xl: 2, lg: 5, md: 8}}>
            <SliderFormItem required label="Номер телефона" name='phone'>
              <Input placeholder="Введите номер телефона" size={'large'} />
            </SliderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xl: 2, lg: 5, md: 8}}>
            <StyledButtonSliderW10rem type="primary" htmlType="submit">
              {actionText}
            </StyledButtonSliderW10rem>
          </SliderCellColRaw>
        </RowMargin1st>
    </CRUDForm>
  );
}
