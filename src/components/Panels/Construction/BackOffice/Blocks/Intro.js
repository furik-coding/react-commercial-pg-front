import React, { useContext } from 'react';
import moment from 'moment';
import { useQuery, gql, useMutation } from '@apollo/client';

import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../Styles/DesignList/styles';
import { DatePicker } from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';

import anchorIcon from '../../../../../img/input/anchor.svg';
import cityIcon from '../../../../../img/input/city.svg';
import districtIcon from '../../../../../img/input/district.svg';
import postIcon from '../../../../../img/input/post.svg';
import ownerIcon from '../../../../../img/input/owner.svg';

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

const GET_OWNERS = gql`
query {
  searchPartner(isNonrtsOwner: true) {
		edges {
      node {
        id
        title
      }
    }
  }
}
`;



export default function Intro() {
  const [apiData, setApiData] = useContext(constructContext);
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  const post = useQuery( POST_T).data;
  const owners = useQuery( GET_OWNERS).data;
  if (!city || !district || !post){
    return <span></span>;
  }

  console.log('[apiData]', apiData);
  return (
    <Medium>
      <BlockTitle>Общая информация</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '35%' }}>

            <InputTitle>Город</InputTitle>
            <StyledSelect
              defaultValue={(apiData.location && apiData.location.postcode.district.city.id) || <img src={cityIcon} />}
              onChange={(value) => setApiData({ ...apiData, location: { 
                ...apiData.location, 
                postcode: {
                  ...apiData.location.postcode,
                  district: {
                    ...apiData.location.postcode.district,
                    city: {
                      id: value
                    }
                  }
                } 
              } })}>
              {city && city.searchCity.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                  <img src={cityIcon} />
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
            </StyledSelect>

          </div>
          <div style={{ width: '35%' }}>
            <InputTitle>Район</InputTitle>
            <StyledSelect
              defaultValue={(apiData.location && apiData.location.postcode.district.id) || <img src={districtIcon} />}
              onChange={(value) => setApiData({ ...apiData, location: { 
                ...apiData.location, 
                postcode: {
                  ...apiData.location.postcode,
                  district: {
                    ...apiData.location.postcode.district,
                    id: value
                  }
                } 
              } })}>
             {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={districtIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
             )}
            </StyledSelect>
          </div>
          <div style={{ width: '22%' }}>
            <InputTitle>Код района</InputTitle>
            <StyledSelect
              defaultValue={(apiData.location && apiData.location.postcode.id) || <img src={postIcon} /> }
              onChange={(value) => setApiData({ ...apiData, location: {
                postcode: { ...apiData.postcode, id: value }
              } })}>
              {post && post.searchPostcode.edges.map((item)=> {
                if(item.node.title) {
                  return(
                    <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                      <img src={postIcon} />
                      <span>{item.node.title}</span>
                    </StyledSelect.Option>
                  )
                }
              }
                
             )}
            </StyledSelect>

          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Владелец</InputTitle>
            <StyledSelect
              prefix={<img src={ownerIcon} />}
              defaultValue={apiData.isNonrts ? (apiData.nonrtsOwner && apiData.nonrtsOwner.title) || ''  : 'РТС'}
              onChange={(value) => setApiData({ ...apiData, nonrtsOwner: {
                id: value
              } })}
              // showSearch={true}
              >
                {

                  owners && owners.searchPartner.edges.map((item)=>
                   <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                      <img src={postIcon} />
                      <span>{item.node.title}</span>
                    </StyledSelect.Option>
                  )
                }
              </StyledSelect>
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Маркетинговый адрес</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={
                (apiData.location && apiData.location.marketingAddress && apiData.location.marketingAddress.address) || ''}
              onChange={(e) => setApiData({ ...apiData, location: {
                ...apiData.location,
                marketingAddress: e.target.value
              } })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Дата создания</InputTitle>
            <DatePicker placeholder="01/01/2020"
             size={'large'}
             format='DD/MM/YYYY'
             style={{  width: '100%' }}
             defaultValue={apiData.createdAt ? moment(apiData.createdAt) : ''}
             onChange={(date) => setApiData({ ...apiData, createdAt:new Date(date) })}
             />

          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Комментарий</InputTitle>
            <StyledInput
              placeholder='...'
              defaultValue={apiData.backComment ? apiData.backComment : ''}
              onChange={(e) => setApiData({ ...apiData, backComment: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
