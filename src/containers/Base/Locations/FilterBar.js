import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import { locationsContext } from './Locations';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Collapse, DatePicker, Radio, Form } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import anchorIcon from '../../../img/input/anchor.svg';
import cityIcon from '../../../img/input/city.svg';
import districtIcon from '../../../img/input/district.svg';
import postIcon from '../../../img/input/post.svg';
import houseIcon from '../../../img/input/house.svg';
import grateIcon from '../../../img/input/grate.svg';
import flagIcon from '../../../img/input/flag.svg';
import commentIcon from '../../../img/input/comment.svg';
import areaIcon from '../../../img/input/area.svg';
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
const PURPSOSE_T = gql`
  {
    searchLocPurpose {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const SEARCH_FAMILY = gql`
  {
    searchFamilyConstruction {
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
  const setFilter = useContext(locationsContext)[1];
  const onFinish = (values) => {
    setFilter(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  const post = useQuery( POST_T).data;
  const purpose = useQuery( PURPSOSE_T).data;
  const familyList = useQuery( SEARCH_FAMILY).data;
  // if (!city || !district || !post) {
  //   return <span></span>;
  // }
  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="По местоположению" key="1">
          <Form.Item name="city">
              <StyledSelect
                placeholder={<><img src={cityIcon} alt={"Город"}/><span>Город</span> </>} size={'large'}>
                {city && city.searchCity.edges.map((item)=>
                  <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                    <img src={cityIcon} alt={item.node.title}/>
                    <span>{item.node.title}</span>
                  </StyledSelect.Option>
                )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="district">
              <StyledSelect placeholder={<><img src={districtIcon} alt={"Район"}/><span>Район</span> </>} size={'large'}>
              {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                  <img src={districtIcon} alt={item.node.title}/>
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="post">
              <StyledSelect placeholder={<><img src={postIcon} alt={"Почтовый индекс"}/><span>Почтовый индекс</span> </>} size={'large'}>
              {post && post.searchPostcode.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                  <img src={postIcon} alt={item.node.title}/>
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="adress_m">
              <StyledInput prefix={<img src={houseIcon} alt={"Маркетинговый адрес"}/>} placeholder="Адрес маркетинговый" size={'large'} />
            </Form.Item>
            <Form.Item name="adress_j">
              <StyledInput prefix={<img src={houseIcon} alt={"Юридический адрес"}/>} placeholder="Адрес юридический" size={'large'} />
            </Form.Item>
            <Form.Item name="cadastralNumber">
              <StyledInput prefix={<img src={grateIcon} alt={"Кадастровый номер"}/>} placeholder="Кадастровый номер" size={'large'} />
            </Form.Item>
            <Form.Item name="targetPurpose">
              <StyledSelect placeholder={<><img src={flagIcon} alt={"Целевое назначение"}/><span>Целевое назначение</span> </>} size={'large'}>
              {purpose && purpose.searchLocPurpose.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                  <img src={flagIcon} alt={item.node.title}/>
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
              </StyledSelect>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="По договорам" key="2">
            <Form.Item name="rentContractNumber">
              <StyledInput prefix={<img src={grateIcon} alt={"Номер договора"}/>} placeholder="Номер договора" size={'large'} />
            </Form.Item>
            <Form.Item name="contract_Start">
              <DatePicker placeholder="Дата начала" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item name="contract_End">
              <DatePicker placeholder="Дата окончания" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
            </Form.Item>

          </StyledPanel>
          <StyledPanel header="По параметрам" key="3">
            <Form.Item name="area">
              <StyledInput prefix={<img src={areaIcon} alt={"Площадь"}/>} placeholder="Площадь" size={'large'} />
            </Form.Item>
            <Form.Item name="familyConstruction_Id">
              <StyledSelect
                placeholder={<><img src={anchorIcon} alt={"Семейство"}/><span>Семейство</span> </>}
                size={'large'}
              >
                {familyList && familyList.searchFamilyConstruction.edges.map((item)=>
                  <StyledSelect.Option
                    key={item.node.id}
                    value={item.node.title}
                  >
                    <img src={districtIcon} alt={item.node.title}/>
                    <span>{item.node.title}</span>
                  </StyledSelect.Option>
                )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="comment">
              <StyledInput prefix={<img src={commentIcon} alt={"Комментарий"}/>} placeholder="Комментарий" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Другое" key="4">
            <Form.Item name="resolutionNumber">
              <StyledInput prefix={<img src={anchorIcon} alt={"Постановление от акимата"}/>} placeholder="Поставновление от акимата" size={'large'} />
            </Form.Item>

            <Form.Item name="areaAct">
              <StyledInput prefix={<img src={anchorIcon} alt={"Акт на землю"}/>} placeholder="Акт на землю" size={'large'} />
            </Form.Item>
            <Form.Item name="registrationStatusLocation">
              <StyledInput prefix={<img src={anchorIcon} alt={"Статус оформления"}/>} placeholder="Статус оформления" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Статус" key="5">
            <Radio.Group>
              <Radio value="yes">Есть конструкция</Radio>
              <Radio value="no">Нет конструкции</Radio>
            </Radio.Group>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton   htmlType="submit">Поиск</SubmitButton>
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
