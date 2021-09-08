import React, { useContext, useEffect, useState } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';
import { StyledInput, StyledSelect } from '../../../../Styles/DesignList/styles';
import { Form, Checkbox } from 'antd';
import { BlockBody, Large, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import styled from 'styled-components';
import anchorIcon from '../../../../../img/input/anchor.svg';
const InputWrapper = styled.div`
  width: 22%;
`;
export default function Commissions() {
  const [item, , , setCommisionForm] = useContext(partnerContext);
  const services = [
    {
      label: 'Налог',
      value: 'tax',
    },
    {
      label: 'Печать',
      value: 'print',
    },
    {
      label: 'Монтаж',
      value: 'mount',
    },
    {
      label: 'Аренда',
      value: 'rent',
    },
    {
      label: 'Доп. расходы',
      value: 'addCosts',
    },
    {
      label: 'НОН РТС',
      value: 'nonRts',
    },
  ];

  const { Option } = StyledSelect;
  const [form] = Form.useForm();

  useEffect(() => {
    if (item.agencyCommission) {
      const type = item.agencyCommission.percent ? 'percent' : item.agencyCommission.value ? 'summ' : '';
      const value =
        type === 'percent' ? item.agencyCommission.percent : type === 'summ' ? item.agencyCommission.value : '';
      const nds = item.isAgencyCommissionWithNds ? 'nds' : 'no';
      let services = [];
      item.agencyCommission.toRent && services.push('rent');
      item.agencyCommission.toNalog && services.push('tax');
      item.agencyCommission.toMount && services.push('mount');
      item.agencyCommission.toPrint && services.push('print');
      item.agencyCommission.toAdditional && services.push('addCosts');
      item.agencyCommission.toNonrts && services.push('nonRts');
      form.setFieldsValue({
        services,
        type,
        value,
        nds,
      });
    }
  }, [item.agencyCommission]);

  useEffect(() => {
    setCommisionForm(form);
  }, []);
  return (
    <Large>
      <BlockTitle style={{ padding: '15px 26px 15px 24px' }}>Агентская коммисия</BlockTitle>
      <BlockBody>
        <Form form={form}>
          <Row>
            <InputWrapper>
              <InputTitle>Тип АК</InputTitle>
              <Form.Item name="type">
                <StyledSelect>
                  <Option value="percent">В процентах</Option>
                  <Option value="summ">Сумма</Option>
                </StyledSelect>
              </Form.Item>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Агентская коммисия</InputTitle>
              <Form.Item name="value">
                <StyledInput prefix={<img src={anchorIcon} />} />
              </Form.Item>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>АК распространяется</InputTitle>
              <Form.Item name="nds">
                <StyledSelect>
                  <Option value="nds">
                    <img src={anchorIcon} />
                    <span>на сумму с НДС</span>
                  </Option>
                  <Option value="no">
                    <img src={anchorIcon} />
                    <span>на сумму без НДС</span>
                  </Option>
                </StyledSelect>
              </Form.Item>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>На какие услуги распространяется АК</InputTitle>
              <Form.Item name="services">
                <Checkbox.Group options={services}></Checkbox.Group>
              </Form.Item>
            </InputWrapper>
          </Row>
        </Form>
      </BlockBody>
      <style>
        {`
        .ant-form-item {
          margin-bottom: 0;
        }
        .ant-checkbox-group-item {
          min-width: 120px
        }`}
      </style>
    </Large>
  );
}
