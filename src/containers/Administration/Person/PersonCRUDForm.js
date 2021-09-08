import React from 'react';
import { Input } from 'antd';

import {
  adaptiveRow, SliderCol, SliderFormItem, StyledButtonSlider, StyledOption, StyledSelect
} from '../../../components/SlidingBottomPanel/PanelComponents';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';

import { RowMargin1st } from '../components/Styled';

export function PersonCRUDForm({actionText="Добавить", ...props}) {
  const requiredProps = { rules: [ { required: true } ] };
  return (
    <CRUDForm {...props}>
        <RowMargin1st {...adaptiveRow}>
          <SliderCol>
            <SliderFormItem label="Ф.И.О." {...requiredProps} name='name'>
              <Input placeholder="Введите ФИО сотрудника" size={'large'} />
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <SliderFormItem label="Должность" {...requiredProps} name='position' >
              <StyledSelect placeholder="Должность" size={'large'}>
                <StyledOption value="Менеджер">Менеджер</StyledOption>
              </StyledSelect>
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <SliderFormItem label="Уровень доступа" {...requiredProps} name='level'>
              <StyledSelect placeholder="Выберите уровень доступа" size={'large'}>
                <StyledOption value="admin">Администратор</StyledOption>
                <StyledOption value="user">Пользователь</StyledOption>
              </StyledSelect>
            </SliderFormItem>
          </SliderCol>
        </RowMargin1st>
        <RowMargin1st {...adaptiveRow}>
          <SliderCol>
            <SliderFormItem required label="Номер телефона" name='phone'>
              <Input placeholder="Введите номер телефона" size={'large'} />
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <SliderFormItem label="Е-mail"  rules={[{ required: true, type: "email" }]} name='email'>
              <Input placeholder="Введите email" size={'large'} />
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <StyledButtonSlider type="primary" htmlType="submit">
              {actionText}
            </StyledButtonSlider>
          </SliderCol>
        </RowMargin1st>
    </CRUDForm>
  );
}
