import React, { useContext, useEffect } from 'react';
import {gql, useQuery} from '@apollo/client';
import { DatePicker } from 'antd';
import moment from 'moment';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledSelect , StyledInput} from '../../../../Styles/DesignList/styles';

import bellIcon from '../../../../../img/input/bell.svg';
import grateIcon from '../../../../../img/input/grate.svg';

import { locationContext } from '../../../../../containers/Base/Location/Location';

const SEARCH_REG_STATUS = gql`
  query searchLocRegistrationStatus {
    searchLocRegistrationStatus {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

export const Contract = (props) => {
  const [item, setItem] = useContext(locationContext);

  const registrationStatus = useQuery(SEARCH_REG_STATUS).data;


  return (
    <Medium>
      <BlockTitle>Договор аренды</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '19%' }}>
            <InputTitle>Статус оформления</InputTitle>
            <StyledSelect
              onChange={(value, { title }) => {
                setItem({
                  ...item,
                  registrationStatusLocation: {
                    ...item.registrationStatusLocation,
                    id: value,
                    title: title
                  }
                })
              }}
              defaultValue={
                item.registrationStatusLocation
                  ? item.registrationStatusLocation.title
                  : <img src={bellIcon} />
              }
            >
              {
                registrationStatus && registrationStatus.searchLocRegistrationStatus.edges.map(({ node }) => (
                  <StyledSelect.Option
                    key={node.id}
                    value={node.id}
                    title={node.title}
                  >
                    <img src={bellIcon} />
                    { node.title }
                  </StyledSelect.Option>
                ))
              }
            </StyledSelect>
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Номер договора</InputTitle>
            <StyledInput
              prefix={<img src={grateIcon} />}
              defaultValue={item.rentContractNumber ? item.rentContractNumber : ''}
              onChange={(e) => {setItem({...item, rentContractNumber: e.target.value })}}
            ></StyledInput>
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Начало договора</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.rentContractStart ? moment(item.rentContractStart) : ''}
              onChange={(date) => setItem({ ...item, rentContractStart:new Date(date) })}
            />
          </div>

          <div style={{ width: '19%' }}>
            <InputTitle>Регистрация договора</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.rentContractCreatedAt ? moment(item.rentContractCreatedAt) : ''}
              onChange={(date) => setItem({ ...item, rentContractCreatedAt:new Date(date) })}
            />
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Окончание договора</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.rentContractEnd ? moment(item.rentContractEnd) : ''}
              onChange={(date) => setItem({ ...item, rentContractEnd:new Date(date) })}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Contract;
