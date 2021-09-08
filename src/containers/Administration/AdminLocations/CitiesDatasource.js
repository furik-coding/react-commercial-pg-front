import { gql } from '@apollo/client';
import { GqlDatasource } from '../components/gql_datasource';
import {
  selectOutdoorFurnitureSubgroup,
  defaultMapSubgroup
} from '../AdminFormats/FormatDatasource';


const stubStreets = [
  { name: "Майлина", childs: null },
  { name: "Монтажная", childs: null },
  { name: "Захарова", childs: null },
  { name: "Мирная", childs: null },
  { name: "Кубеева", childs: null },
];

const stubDistricts = [
  { name: "Медеуский", childs: stubStreets },
  { name: "Турксибский", childs: stubStreets },
  { name: "Алмалинский", childs: stubStreets },
  { name: "Ауэзовский", childs: stubStreets },
  { name: "Бостандыкский", childs: stubStreets },
  {name: "API UNIMPLEMENTED YET", childs: null},
];

const stubCities = [
  // { name: "Актау", childs: stubDistricts },
  // { name: "Алматы", childs: {} },
  // { name: "Атырау", childs: stubDistricts },
  // { name: "Актобе", childs: stubDistricts },
  // { name: "Балхаш", childs: stubDistricts },
  {name: "API ERROR", childs: null},
];

const stubCountries = [
  // { name: "Республика Казахстан", childs: stubCities },
  // { name: "Российская Федерация", childs: {} },
  // { name: "Монголия", childs: {} },
  // { name: "Узбекистан", childs: {} },
  // { name: "Киргизия", childs: {} },
  {name: "API ERROR", childs: null},
];


const GET_COUNTRIES = gql`
  query SearchCountry($title: String){
    searchCountry(title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;


const ADD_COUNTRY = gql`
  mutation($title: String) {
    createCountry(
      input: {
        title: $title
      }
    ) {
      country {
        id
      }
    }
  }
`;


const DELETE_COUNTRY = gql`
  mutation($id: ID!) {
    deleteCountry(id: $id) {
      found
    }
  }
`;


const UPDATE_COUNTRY = gql`
  mutation($id: ID!, $title: String) {
    updateCountry(id: $id,
      input: {
        title: $title
      }
    ) {
      country {
        id
      }
    }
  }
`;


export const srcCountries = new GqlDatasource({
  query: GET_COUNTRIES,
  method: "searchCountry",
  stub: stubCountries,
  add: ADD_COUNTRY,
  upd: UPDATE_COUNTRY,
  del: DELETE_COUNTRY,
});


const GET_CITIES = gql`
  query SearchCity($id: ID, $title: String) {
    searchCity(country_Id: $id, title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;


const ADD_CITY = gql`
  mutation($title: String, $countryId: [ID]) {
    createCity(input: { title: $title, country: $countryId }) {
      city {
        id
      }
    }
  }
`;


const DELETE_CITY = gql`
  mutation($id: ID!) {
    deleteCity(id: $id) {
      found
    }
  }
`;

const UPDATE_CITY = gql`
  mutation($id: ID!, $title: String) {
    updateCity(
      id: $id,
      input: {
        title: $title
      }) {
      city {
        id
      }
    }
  }
`;


export const srcCities = new GqlDatasource({
  query: GET_CITIES,
  method: "searchCity",
  stub: stubCities,
  upd: UPDATE_CITY,
  add: ADD_CITY,
  del: DELETE_CITY,
});


// const ADD_DISTRICT = gql`
//
// `;

// const DELETE_DISTRICT = gql`
//
// `;

// const UPDATE_DISTRICT = gql`
//
// `;

const GET_DISTRICTS = gql`
  query SearchDistrict($id: ID, $title: String) {
    searchDistrict(city_Id: $id, title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

export const srcDistricts = new GqlDatasource({
  query: GET_DISTRICTS,
  method: "searchDistrict",
  stub: stubDistricts
});

