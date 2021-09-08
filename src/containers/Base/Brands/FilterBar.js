import React, { useContext } from 'react';
import { Select, Collapse, Form } from 'antd';

import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { StyledInput } from '../../../components/Styles/DesignList/styles';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

import anchorIcon from '../../../img/input/anchor.svg';

import { brandsContext } from './Brands';


const FilterBar = () => {
  const [form] = Form.useForm();
  const setFilter = useContext(brandsContext)[1];

  const onFinish = (values) => {
    setFilter(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="По параметрам" key="1">
            <Form.Item name="partner">
              <StyledSelect placeholder="Контрагент" size={'large'}>
                <StyledSelect.Option value="case 1">case 1</StyledSelect.Option>
                <StyledSelect.Option value="case 2">case 2</StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="brand">
              <StyledInput
                placeholder="Бренд"
                size={'large'}
                prefix={<img src={anchorIcon} />}
              />
            </Form.Item>
            <Form.Item name="workingSector">
              <StyledInput
                placeholder="Cектор деятельности"
                size={'large'}
                prefix={<img src={anchorIcon} />}
              />
            </Form.Item>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton htmlType="submit">Поиск</SubmitButton>
          <ResetButton onClick={onReset}>Очистить</ResetButton>
        </BtnGroup>
      </Form>
      <style>
        {`
          .ant-collapse-content{
             background-color: #f5f7fa !important;
          }
          .ant-select.sc-fzoLsD.loCZmg.ant-select-lg.ant-select-single.ant-select-show-arrow {
            margin: 0;
          }
        `}
      </style>
    </FilterMenu>
  );
};

export default FilterBar;
