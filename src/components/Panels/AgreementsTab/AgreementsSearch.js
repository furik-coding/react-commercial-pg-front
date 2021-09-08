import React, { useContext } from 'react';
import {  agreementsContext } from './AgreementsTab';

import styled from 'styled-components';
import { Radio, DatePicker ,Form} from 'antd';
import { StyledInput } from '../../Styles/DesignList/styles';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../Styles/StyledBlocks';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

import anchorIcon from '../../../img/input/anchor.svg';
import ownerIcon from '../../../img/input/owner.svg';
import portfolioIcon from '../../../img/input/portfolio.svg';
import contractIcon from '../../../img/input/contract.svg';


const AgreementsSearch = () => {
  const [form] = Form.useForm();
  const setFilter = useContext(agreementsContext)[1];

  const onFinish = (values) => {
    setFilter({...values,registrationDate:new Date(values.registrationDate),start:new Date(values.start),end:new Date(values.end)});
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (

    <Medium>
      <BlockTitle>Поиск договора</BlockTitle>
      <BlockBody>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <SearchItem>
            <InputTitle>Номер договора</InputTitle>
            <Form.Item name="resolutionNumber" >
              <StyledInput
                prefix={<img src={ anchorIcon } />}
              placeholder="Номер договора" size={'large'} />
            </Form.Item>
          </SearchItem>
          <SearchItem>
            <InputTitle>Инициатор</InputTitle>
            <Form.Item name="initiator" >
              <StyledInput  prefix={<img src={ownerIcon} alt={"Инициатор"}/>} placeholder="Инициатор" size={'large'} />
            </Form.Item>
          </SearchItem>

        </Row>
        <Row>
          <SearchItem>
            <InputTitle>Наименование контрагента</InputTitle>
            <Form.Item name="partner_Title" >
              <StyledInput  prefix={<img src={portfolioIcon} alt={"Наименование контрагента"}/>}
                            placeholder="Наименование контрагента" size={'large'} />
            </Form.Item>
          </SearchItem>
          <SearchItem>
            <InputTitle>Создатель</InputTitle>
            <Form.Item name="creator" >
              <StyledInput  prefix={<img src={ownerIcon} alt={"Создатель"}/>} placeholder="Создатель" size={'large'} />
            </Form.Item>
          </SearchItem>
        </Row>
        <Row>
          <SearchItem>
            <InputTitle>Тип договора</InputTitle>
            <Form.Item name="contractType" >
              <StyledInput  prefix={<img src={contractIcon} alt={"Тип договора"}/>} placeholder="Тип договора" size={'large'} />
            </Form.Item>
          </SearchItem>
          <SearchItem>
            <InputTitle>Дата начала действия договора</InputTitle>
            <Form.Item name="start" >
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{  width: '100%' }}/>
            </Form.Item>
          </SearchItem>
        </Row>
        <Row>
          <SearchItem>
            <InputTitle>Дата заключения договора</InputTitle>
            <Form.Item name="registrationDate" >
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '100%' }}/>
            </Form.Item>
          </SearchItem>
          <SearchItem>
            <InputTitle>Дата окончания действия договора</InputTitle>
            <Form.Item name="end" >
            <DatePicker style={{  width: '100%' }} placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' />
            </Form.Item>
          </SearchItem>
        </Row>
        <Row>
        <SearchItem>
          <InputTitle>Статус возврата</InputTitle>
            <Form.Item name="returnStatus" >
            <Radio.Group style={{width:"100%"}}>
              <Radio value={1}style={{    width: "50%"}}>Есть</Radio>
              <Radio value={2} >Нет</Radio>
            </Radio.Group>
            </Form.Item>
          </SearchItem>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <BtnGroup>
          <SubmitButton htmlType="submit">Поиск</SubmitButton>
          <ResetButton style={{marginRight: 'auto'}} onClick={onReset}>Очистить</ResetButton>
        </BtnGroup>
        </Row>
        </Form>
      </BlockBody>
    </Medium>
  );
};

export default AgreementsSearch;
const SearchItem = styled.div`
  display: flex;
  flex-direction: column;

  width:48%;
  .ant-form-item{
    margin-bottom:0;
  }
`;
