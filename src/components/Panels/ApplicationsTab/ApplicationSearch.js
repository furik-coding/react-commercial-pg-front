import React, { useContext, useState } from 'react';
import {  applicationsContext } from './ApplicationsTab';

import styled from 'styled-components';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../Styles/StyledBlocks';
import { StyledSelect,StyledInput } from '../../Styles/DesignList/styles';
import { Radio, DatePicker,Form,Input } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

import anchorIcon from '../../../img/input/anchor.svg';
import ownerIcon from '../../../img/input/owner.svg';
import portfolioIcon from '../../../img/input/portfolio.svg';
import grateIcon from '../../../img/input/grate.svg';
const ApplicationSearch = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(applicationsContext);
  const onFinish = (values) => {
    setFilter(values);

    console.log(filter);
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <Medium>
      <BlockTitle>Поиск приложения</BlockTitle>
      <BlockBody>
      <Form form={form} onFinish={onFinish}>
        <Row>
         <SearchItem>
          <InputTitle>Код приложения</InputTitle>
          <Form.Item name="code" >
              <StyledInput   prefix={<img src={ anchorIcon } />} placeholder="Код приложения" size={'large'} />
            </Form.Item>

          </SearchItem>
           <SearchItem>
          <InputTitle>Менеджер по продажам</InputTitle>
          <Form.Item name="saleManager" >
              <StyledInput   prefix={<img src={ ownerIcon } />} placeholder="Менеджер по продажам" size={'large'} />
            </Form.Item>



          </SearchItem>
        </Row>
        <Row>
         <SearchItem>
          <InputTitle>Номер договора</InputTitle>
             <Form.Item name="contractType" >
              <StyledInput   prefix={<img src={ grateIcon } />} placeholder="Номер договора" size={'large'} />
            </Form.Item>

          </SearchItem>
           <SearchItem>
          <InputTitle>Менеджер бэк-офиса</InputTitle>
             <Form.Item name="backManager" >
              <StyledInput   prefix={<img src={ ownerIcon } />} placeholder="Менеджер бэк-офиса" size={'large'} />
            </Form.Item>
          </SearchItem>
        </Row>
        <Row>
         <SearchItem>
          <InputTitle>Номер приложения</InputTitle>
             <Form.Item name="application" >
              <StyledInput   prefix={<img src={ grateIcon } />} placeholder="Номер приложения" size={'large'} />
            </Form.Item>

          </SearchItem>
           <SearchItem>
            <InputTitle>Период приложения</InputTitle>
            <Form.Item name="period" >
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{  width: '100%' }}/>
            </Form.Item>
          </SearchItem>
        </Row>
        <Row>
         <SearchItem>
          <InputTitle>Наименование контрагента</InputTitle>
             <Form.Item name="partner" >
              <StyledInput   prefix={<img src={ portfolioIcon } />} placeholder="Наименование контрагента" size={'large'} />
            </Form.Item>

          </SearchItem>
           <SearchItem>
          <InputTitle>Дата создания</InputTitle>
          <Form.Item name="create" >
          <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '100%' }}/>
            </Form.Item>
          </SearchItem>
        </Row>
        <Row>
         <SearchItem>
            <InputTitle>Бренд</InputTitle>
             <Form.Item name="brand" >
              <StyledInput   prefix={<img src={ anchorIcon } />} placeholder="Бренд" size={'large'} />
              </Form.Item>

          </SearchItem>
          <SearchItem>

            <InputTitle>Статус возврата</InputTitle>
            <Form.Item name="returnStatus" >
            <Radio.Group   style={{width:"100%"}}>
              <Radio value={1}style={{    width: "50%"}}>Есть</Radio>
              <Radio value={2}>Нет</Radio>
            </Radio.Group>
            </Form.Item>
            </SearchItem>
        </Row>

        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <BtnGroup>
          <SubmitButton  htmlType="submit">Поиск</SubmitButton>
          <ResetButton style={{    marginRight: 'auto'}} onClick={onReset}>Очистить</ResetButton>
        </BtnGroup>
        </Row>
        </Form>
      </BlockBody>
      <style>
        {`

        `}
      </style>
    </Medium>
  );
};

export default ApplicationSearch;
const SearchItem = styled.div`
  display: flex;
  flex-direction: column;

  width:48%;
  .ant-form-item{
    margin-bottom:0;
  }
`;
