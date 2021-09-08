import React, { useContext, useState } from 'react';
import { partnersContext } from './Partners';
import { FilterMenu, SearchTitle, FilterText, StyledPanel } from '../../../components/Styles/StyledFilters';
import { Collapse, Form } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import anchorIcon from '../../../img/input/anchor.svg';
import grateIcon from '../../../img/input/grate.svg';
import { gql, useQuery } from '@apollo/client';

const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(partnersContext);

  const PARTNERS_TYPE_QUERY = gql`
    {
      searchPartnerType {
        edges {
          node {
            title
            id
          }
        }
      }
    }
  `;

  const WORKING_SECTORS_QUERY = gql`
    {
      searchWorkingSector {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  const workingSectors = useQuery(WORKING_SECTORS_QUERY);
  const partnerTypes = useQuery(PARTNERS_TYPE_QUERY);

  const onFinish = (values) => {
    setFilter(values);
    console.log(filter);
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
          <StyledPanel header="Поиск по параметрам" key="1">
            <Form.Item name="partner">
              <StyledInput prefix={<img src={anchorIcon} />} placeholder="Контрагент" size={'large'} />
            </Form.Item>
            <Form.Item name="brand">
              <StyledInput prefix={<img src={anchorIcon} />} placeholder="Бренд" size={'large'} />
            </Form.Item>
            <Form.Item name="type">
              <StyledSelect allowClear prefix={<img src={anchorIcon} />} placeholder="Тип Контрагента" size={'large'}>
                {partnerTypes.data &&
                  partnerTypes.data.searchPartnerType.edges.map((partner) => {
                    return (
                      <StyledSelect.Option key={partner.node.id} value={partner.node.title}>
                        {partner.node.title}
                      </StyledSelect.Option>
                    );
                  })}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="sector">
              <StyledSelect allowClear prefix={<img src={anchorIcon} />} placeholder="Cектор деятельности" size={'large'}>
                {workingSectors.data &&
                  workingSectors.data.searchWorkingSector.edges.map((sector) => {
                    return (
                      <StyledSelect.Option key={sector.node.id} value={sector.node.title}>
                        {sector.node.title}
                      </StyledSelect.Option>
                    );
                  })}
              </StyledSelect>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по БИН" key="2">
            <Form.Item name="binNumber">
              <StyledInput prefix={<img src={grateIcon} />} placeholder="Введите БИН" size={'large'} />
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
        `}
      </style>
    </FilterMenu>
  );
};

export default FilterBar;
