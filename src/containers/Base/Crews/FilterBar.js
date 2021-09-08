import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import { crewsContext } from './Crews';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import {  Collapse, Form} from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';

import districtIcon from '../../../img/input/district.svg';
import cityIcon from '../../../img/input/input-city.svg';
import ownerIcon from '../../../img/input/owner.svg';
import phoneIcon from '../../../img/input/phone.svg';
import constructionIcon from '../../../img/input/construction.svg';
import marketIcon from '../../../img/input/market.svg';

const CITY_T = gql`
    {
      searchCity {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
const DISTRICT_T = gql`
    {
      searchDistrict {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
const POST_T = gql`
  {
    searchPostcode {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;


const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(crewsContext);
  const onFinish = (values) => {
    setFilter(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  const post = useQuery( POST_T).data;
  // if (!city || !district || !post){
  //   return <span></span>;
  // }

  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="Поиск по адресу" key="1">
          <Form.Item name="city">
              <StyledSelect
                placeholder={<><img src={cityIcon} alt={"Город"}/><span>Город</span> </>} size={'large'}>
                {city && city.searchCity.edges.map((item)=>
                  <StyledSelect.Option key ={item.node.title} value={item.node.title}>
                    <img src={cityIcon} alt={item.node.title}/>
                    <span>{item.node.title}</span>
                  </StyledSelect.Option>
                )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="district">
              <StyledSelect placeholder={<><img src={districtIcon} /><span>Район</span> </>} size={'large'}>
              {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                  <img src={districtIcon} />
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="adress">
              <StyledInput
              placeholder="Адрес"
              size={'large'}
              prefix={<img src={  cityIcon } />}
                        />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по экипажу" key="2">
            <Form.Item name="name">
              <StyledInput placeholder="Имя" size={'large'}  prefix={<img src={  ownerIcon } />}/>
            </Form.Item>
            <Form.Item name="phoneNumber">
              <StyledInput placeholder="Номер телефона" size={'large'} prefix={<img src={  phoneIcon }/>}/>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по конструкции" key="4">
            <Form.Item name="constructionType">
              <StyledInput placeholder="Тип конструкции" size={'large'} prefix={<img src={  constructionIcon }/>}/>
            </Form.Item>
            <Form.Item name="constructionFormat">
              <StyledInput placeholder="Формат конструкции" size={'large'} prefix={<img src={  phoneIcon }/>}/>
            </Form.Item>
            <Form.Item name="startDate">
              <StyledInput placeholder="Дата начала" size={'large'} prefix={<img src={  marketIcon }/>}/>
            </Form.Item>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton   htmlType="submit" >Поиск</SubmitButton>
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
