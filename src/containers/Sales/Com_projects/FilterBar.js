import React, { useContext } from 'react';
import { comProjectContext } from './Com_projects';

import { useQuery, gql, useMutation } from '@apollo/client';

// ICONS
import date from '../../../img/left-bar/filter/date.svg';
import advAgency from '../../../img/left-bar/filter/advAgency.svg';
import advertiser from '../../../img/left-bar/filter/advertiser.svg';
import brand from '../../../img/left-bar/filter/brand.svg';
import creator from '../../../img/left-bar/filter/creator.svg';
import manager from '../../../img/left-bar/filter/manager.svg';
import section from '../../../img/left-bar/filter/section.svg';

import { ReactComponent as ArrowDown } from '../../../img/left-bar/filter/arrow_down.svg';

import { FilterMenu, SearchTitle, FilterText, StyledPanel } from '../../../components/Styles/StyledFilters';
import { Select, Collapse, DatePicker, Form, Input } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
const { Option } = Select;
const { Panel } = Collapse;

const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(comProjectContext);
  const onFinish = (values) => {
    setFilter(values);
    // console.log(values.date)
  };

  const onReset = () => {
    setFilter({});
    form.resetFields();
  };
  let list = [];
  const SECTORS_QUERY = gql`
    query {
      searchWorkingSector {
        edges {
          node {
            id
            description
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(SECTORS_QUERY);
  if (loading) {
    list = ['Загрузка...'];
  }
  if (data) {
    list = data.searchWorkingSector.edges.map((sector) => {
      return sector.node.description;
    });
  }

  const InputIcon = ({ img, alt }) => {
    return (
      <span
        style={{
          position: 'absolute',
          transform: 'translate(55% ,30%)',
          zIndex: '99',
        }}>
        <img src={img} alt={alt} />
      </span>
    );
  };

  return (
    <FilterMenu
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="По дате" key="1">
            <InputIcon img={date} alt="date icon" />
            <Form.Item name="date">
              <DatePicker.RangePicker
                suffixIcon={<ArrowDown />}
                // placeholder="Начало"
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                className="date-picker"
                // onChange={(val, dateStr) => {
                //   setFilter((prevState) => {
                //     return { ...prevState, date: dateStr };
                //   });
                // }}
              />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="По параметрам" key="2">
            <Form.Item name="projectTitle">
              <Input placeholder="Наименование проекта" size={'large'} className="placeholder-font" />
            </Form.Item>
            <Form.Item name="code">
              <Input placeholder="Код проекта" size={'large'} className="placeholder-font" />
            </Form.Item>
            <InputIcon img={brand} alt="brand icon" />
            <Form.Item name="brand">
              <Input placeholder="Бренд" size={'large'} className="placeholder-font" />
            </Form.Item>
            <InputIcon img={advertiser} alt="advertiser icon" />
            <Form.Item name="advertiser">
              <Input placeholder="Рекламодатель" size={'large'} className="placeholder-font" />
            </Form.Item>
            <InputIcon img={advAgency} alt="advAgency icon" />
            <Form.Item name="advAgency">
              <Input placeholder="Рекламное агенство " size={'large'} className="placeholder-font" />
            </Form.Item>
            <InputIcon img={section} alt="section icon" />
            <Form.Item name="sector">
              <Select placeholder="Сектор деятельности" size={'large'} className="sector-select">
                {list.map((sector, index) => {
                  return (
                    <Option value={sector} key={index}>
                      {sector}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <InputIcon img={creator} alt="creator icon" />
            <Form.Item name="backOfficeManager">
              <Input placeholder="Менеджер бэк-офиса" size={'large'} className="placeholder-font" />
            </Form.Item>
            <InputIcon img={manager} alt="manager icon" />
            <Form.Item name="sellManager">
              <Input placeholder="Менеджер по продажам" size={'large'} className="placeholder-font" />
            </Form.Item>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton
            onClick={() => {
              // console.log(filter);
              const values = form.getFieldsValue();
              setFilter(values);
            }}
            style={{
              width: '45%',
              fontSize: '16px',
            }}>
            Поиск
          </SubmitButton>
          <ResetButton
            onClick={onReset}
            style={{
              width: '45%',
              fontSize: '16px',
            }}>
            Очистить
          </ResetButton>
        </BtnGroup>
      </Form>
      <style>
        {`
        .ant-collapse-content{
           background-color: #f5f7fa !important;
        }

        .date-picker>div {
          margin-left: 25px;
        }

        .date-picker>div::placeholder {
          color: #656565;
        }

        .placeholder-font {
          font-weight: normal;
          padding-left: 30px;
        }

        .sector-select>div> .ant-select-selection-placeholder {
          margin-left: 25px !important;
          font-weight: normal;
        }

        .sector-select>div> .ant-select-selection-item {
          padding-left: 25px !important;
          font-weight: normal;
        }
        `}
      </style>
    </FilterMenu>
  );
};

export default FilterBar;
