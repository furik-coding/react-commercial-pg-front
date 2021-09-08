import { gql } from '@apollo/client';
import { GqlDatasource } from '../components/gql_datasource';
import React from 'react';


const stubCrews = [
];


const GET_CREWS = gql`
  query {
    searchCrew {
      edges {
        node {
          id
          name
          phone
          city {
            id
            title
          }
        }
      }
    }
  }
`;


export const srcCrews = new GqlDatasource({
  query: GET_CREWS,
  method: "searchCrew",
  stub: stubCrews,
  filterFunEmpty: true,
  selectorFun: (data => data.searchCrew.edges.map(item => ({
      key: item.node.id,
      name: item.node.name,
      phone: item.node.phone,
      cityId: item.node.city && item.node.city.id,
      city: item.node.city && item.node.city.title,
    }))),
});
