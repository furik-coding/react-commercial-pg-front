import React, { useContext } from 'react';
import { crewsContext } from './Crews';
import { useQuery, gql } from '@apollo/client';

import styled from 'styled-components';
import { List } from 'antd';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import Table from '../../../components/Tablea/Tablea';
import oval from '../../../img/Oval.svg';
const CREWS_T = gql`
  query SearchCrew(
    $name: String
    $phone: String
    $city: String
    $district: String
    $adress: String
  ) {
    searchCrew(
      name_Icontains: $name
      phone_Icontains:$phone
      constructions_Location_Postcode_District_City_Title:$city
      constructions_Location_Postcode_District_Title: $district
      constructions_Location_MarketingAddress_Address_Icontains:$adress
    ) {
      edges {
        node {
          id
          phone
          name
        }
      }
    }
  }
  `;
const CREWS_CONSTRUCT_T = gql`
  query SearchCrew(
    $id:ID
    $city: String
    $district: String
    $adress: String
  ) {
    searchCrew(
      id:$id
      constructions_Location_Postcode_District_City_Title:$city
      constructions_Location_Postcode_District_Title: $district
      constructions_Location_MarketingAddress_Address_Icontains:  $adress
    ) {
      edges {
        node {
          id
          phone
          name
          constructions {
            edges {
              node {
                id
                code
                format {
                  id
                  title
                }
                statusConnection
                createdAt
                location {
                  postcode {
                    title
                    district {
                      title
                      city {
                        title
                        id
                      }
                    }
                  }
                  marketingAddress {
                    address
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;const columns = [
    {
      title: 'Код конструкции',
      dataIndex: 'code',

      width: 130,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
    },
    {
      title: 'Формат',
      dataIndex: 'format',

      width: 100,
      sorter: {
        compare: (a, b) =>a.format ? a.format.localeCompare(b.format):-1,
        multiple: 1,
      },
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
      sorter: {
        compare: (a, b) =>a.city ? a.city.localeCompare(b.city):-1,
        multiple: 1,
      },
    },
    {
      title: 'Адрес',
      dataIndex: 'adress',
      width: 100,
       sorter: {
            compare: (a, b) => a.adress ? a.adress.localeCompare(b.adress): -1,
            multiple: 1,
          },
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: 100,
       sorter: {
            compare: (a, b) =>a.status ? a.status.localeCompare(b.status):-1,
            multiple: 1,
          },
    },
    {
      title: 'Дата начала ',
      dataIndex: 'date_start',
      width: 100,
       sorter: {
            compare: (a, b) =>a.date_start ? a.date_start.localeCompare(b.date_start):-1,
            multiple: 1,
          },
    },
];
var data1 = [
    // {
    //   key: 1,
    //   code: '126353',
    //   format: 'Сениор',
    //   city: 'Алматы',
    //   adress: 'Достык 25',
    //   status: 'Размещен',
    //   date_start: '19.06.2020',
    // },
  ];
  const PanelDesign = (props) => {
  const [filter] = useContext(crewsContext)[0];
  const [current,setCurrent]= useContext(crewsContext);
  const crews = useQuery(CREWS_T, { variables: {...filter,id:""} });
  const crews_construct_query = useQuery(CREWS_CONSTRUCT_T, { variables:{...filter,id:current} });
  const crew_construct = crews_construct_query.data
  if (crew_construct) {
    if(crew_construct.searchCrew.edges[0])
    {
      console.log(crew_construct);
      data1 = crew_construct.searchCrew.edges[0].node.constructions.edges.map((item,index) => ({
      key: item.node.id,
      code: item.node.code ? item.node.code : (""+index),
      format: item.node.format && item.node.format.title,
      city: item.node.location && item.node.location.postcode.district.city.title,
      adress: item.node.location &&  item.node.location.marketingAddress.address,
      status: item.node.statusConnection ? "Размещен":"Неразмещен",
      date_start: new Date(item.node.createdAt).toLocaleDateString('en-GB')
    }));
  }
  }
  if( !crews.data ){
    return <span></span>
  }
  return (
    <>
      <StyledCrewsBlock>
        <JobTitle style={{ fontSize: '19px', margin: '0' }}>ЭКИПАЖИ</JobTitle>
        <List>
        {crews.data.searchCrew.edges.map((item,index)=>
          <StyledListItem key={index} onClick={()=>{  setCurrent(item.node.id)}}>
          <StyledIcon>{item.node.name && item.node.name.charAt(0)}</StyledIcon>
          <span>{item.node.name}</span>
        </StyledListItem>
        )}
        </List>
      </StyledCrewsBlock>
      <div style={{ display: 'flex', width: ' 100%', overflowX: 'hidden ' }}>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }}
               columns={columns}
               data={data1}
               title={`Назначеные конструкции`}
               loading={crews_construct_query.loading}
        />
      </div>
      </div>
      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default PanelDesign;
const StyledCrewsBlock = styled.div`
  border-radius: 8px;
  width: 330px;
  margin-right: 15px;
  border: 1px solid #d3dff0;
  padding: 15px;
`;
const StyledListItem = styled(List.Item)`
  display: flex;
  cursor:pointer;
  justify-content: flex-start;
  font-weight:600;
  span {
    margin-left: 20px;
  }
`;
const StyledIcon =styled.div`
  width:28px;
  height:28px;
  background-image: url(${oval});
  display: flex;
  font-size: 14px;
  font-weight:600;
  justify-content: center;
  align-items:center;

`
