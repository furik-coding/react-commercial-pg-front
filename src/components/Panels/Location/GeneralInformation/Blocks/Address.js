import React, {useContext, useEffect} from 'react';
import {useQuery, gql, useMutation, useLazyQuery} from '@apollo/client';

import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Input} from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledSelect,StyledInput } from '../../../../Styles/DesignList/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';
import cityIcon from '../../../../../img/input/city.svg';
import districtIcon from '../../../../../img/input/district.svg';
import postIcon from '../../../../../img/input/post.svg';
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
query searchDistrict(
  $city: String
  ) {
    searchDistrict(
  city_Title:$city
  ) {
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
  query searchPostcode(
    $city: String
    $district: String
    ) {
    searchPostcode(
    district_Title:  $district
    district_City_Title:$city
    ) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
export const Address = (props) => {
  const [item, setItem] = useContext(locationContext);
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T,{variables:
    {city: item.postcode && item.postcode.district && item.postcode.district.city && item.postcode.district.city.title,
  }
  }).data;
  const posts = useQuery( POST_T,{variables:
    {city: item.postcode && item.postcode.district && item.postcode.district.city && item.postcode.district.city.title,
    district: item.postcode && item.postcode.district && item.postcode.district.title,}
  }).data;
  if (!city || !district || !posts){
    return <span></span>;
  }
  return (
    <Medium style={{    height: '100%'}}>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>

            <InputTitle>Город</InputTitle>
            <StyledSelect
              defaultValue={
                (
                  item.postcode
                  && item.postcode.district
                  && item.postcode.district.city
                )
                ? item.postcode.district.city.title
                : <img src={postIcon} />
              }
              onChange={(value, { title }) => setItem({
                ...item,
                postcode: {
                  ...item.postcode,
                  district: {
                    ...item.postcode.district,
                    city: {
                      ...item.postcode.district.city,
                      id: value,
                      title: title
                    }
                  }
                }
              })}
            >
             {city && city.searchCity.edges.map((item) =>
                <StyledSelect.Option
                  key ={item.node.id}
                  value={item.node.id}
                  title={item.node.title}
                >
                  <img src={cityIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
             )}

            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
             <InputTitle>Район</InputTitle>
             <StyledSelect
              defaultValue={(item.postcode && item.postcode.district ) ? item.postcode.district.title : <img src={districtIcon} />}
              onChange={(value, { title }) => setItem({
                ...item,
                postcode: {
                  ...item.postcode,
                  district: {
                    ...item.postcode.district,
                    id: value,
                    title: title
                  }
                }
              })}
             >
             {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option
                  key={item.node.id}
                  value={item.node.id}
                  title={item.node.title}
                >
                    <img src={districtIcon} />
                    <span>{item.node.title}</span>
                   </StyledSelect.Option>
             )}
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Код района</InputTitle>
             <StyledSelect
              defaultValue={item.postcode ? item.postcode.title : <img src={postIcon} /> }
              onChange={(value, { title }) => setItem({ ...item, postcode: {
                ...item.postcode,
                  title: title,
                  id: value
               }
              })}
             >
              {posts&& posts.searchPostcode.edges.map((item) =>
                <StyledSelect.Option
                  key ={item.node.id}
                  value={item.node.id}
                  title={item.node.title}
                >
                    <img src={postIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
              )}
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Юридический адрес</InputTitle>
            <StyledInput
             prefix={<img src={anchorIcon} />}
              value={item.legalAddress ? item.legalAddress.address : ""}
              onChange={(e) => {setItem({
                ...item,
                legalAddress: {
                  ...item.legalAddress,
                  address: e.target.value
                }
                })
              }}
              placeholder="Абая - ост. ГорВодоКанал"
              size={'large'}
            />

          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Address;
