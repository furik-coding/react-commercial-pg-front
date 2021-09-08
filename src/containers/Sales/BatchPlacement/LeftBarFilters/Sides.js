import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyledSelect } from '../../../../components/Styles/StyledFilters';
import { Select } from 'antd';
const { Option } = Select;



const SEARCHSIDE = gql`
  query searchSide($id: ID, $format: ID) {
    searchSide(format_Model_Underfamily_Family_Id: $id, format_Id: $format) {
        edges {
          node {
            id,
            title
          }
        }
      }

  }
`;


export default ({ id, format, onSelect }) => {
    const { loading, error, data } = useQuery(SEARCHSIDE, {variables: { id, format }})

    if (loading) return null;
    if (error) return `Error! ${error}`;

    let district = data ? data.searchSide.edges : null;
    let result = []
    district.forEach((x)=>{
      let end = true
      for(let i = 0; i < result.length; i++)
        if(x.node.title === result[i].node.title){
          end = false
          break
        }
        if(end)
          result.push(x)
    })
    district = result
    return district ? (
      <StyledSelect defaultValue="Сторона конструкции" size={'large'} onChange={e => onSelect(e)}>
        {district.map(x =>
          <Option key={x.node.id} value={x.node.id}>{x.node.title}</Option>
        )} :
      </StyledSelect>
    ): <StyledSelect defaultValue="Сторона конструкции" size={'large'}></StyledSelect>
  }
