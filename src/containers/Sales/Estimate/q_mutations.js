import { gql } from '@apollo/client';

export const CITIES_QUERY = gql`
  query {
    searchCity {
      edges {
        node {
          title
          id
        }
      }
    }
  }
`;

export const CREATE_ADDITIONAL_COSTS = gql`
  mutation createAdditionalCost($input: CreateAdditionalCostsInput!) {
    createSalesAdditionalCost(input: $input) {
      additionalCosts {
        id
        title
        startPeriod
        endPeriod
        count
        discountPercent
        price
        count
        city {
          title
        }
      }
    }
  }
`;

export const CREATE_NON_RTS_COSTS = gql`
  mutation addNonRts($input: CreateEstimateNonRtsInput!) {
    createSalesNonrts(input: $input) {
      estimateNonRts {
        id
        title
        count
        incomingTax
        incomingRent
        incomingPrinting
        incomingInstallation
        incomingManufacturing
        city {
          title
        }
      }
    }
  }
`;


export const UPDATE_ADDITIONAL_COSTS = gql`
  mutation updateAddCosts($id: ID!, $input: UpdateAdditionalCostsInput!) {
    updateSalesAdditionalCost(id: $id, input: $input) {
      additionalCosts {
        id
        endPeriod
        startPeriod
        price
        discountPercent
        agencyCommission {
          value
          percent
          toAdditional
          toMount
          toNalog
          toNonrts
          toPrint
          toPrint
          toRent
        }
      }
    }
  }
`;

export const UPDATE_NON_RTS = gql`
  mutation updateNonRts($id: ID!, $input: UpdateEstimateNonRtsInput!) {
    updateSalesNonrts(id: $id, input: $input) {
      estimateNonRts {
        id
      }
    }
  }
`;


export const UPDATE_RESERVATION_NON_RTS = gql`
  mutation SetReservationNonrtsPart(
    $id: ID!
    $agencyCommissionPercent: Float
    $agencyCommissionValue: Float
    $count: Int
    $dateFrom: DateTime
    $dateTo: DateTime
    $incomingAdditional: Float
    $incomingInstallation: Float
    $incomingManufacturing: Float
    $incomingPrinting: Float
    $incomingRent: Float
    $incomingTax: Float
    $saleAdditional: Float
    $saleInstallation: Float
    $saleManufacturing: Float
    $salePrinting: Float
    $saleRent: Float
    $saleTax: Float
    $title: String
  ) {
    setReservationNonrtsPart(
      id: $id,
      agencyCommissionPercent: $agencyCommissionPercent,
      agencyCommissionValue: $agencyCommissionValue,
      count: $count,
      dateFrom: $dateFrom,
      dateTo: $dateTo,
      incomingAdditional: $incomingAdditional,
      incomingInstallation: $incomingInstallation,
      incomingManufacturing: $incomingManufacturing,
      incomingPrinting: $incomingPrinting,
      incomingRent: $incomingRent,
      incomingTax: $incomingTax,
      saleAdditional: $saleAdditional,
      saleInstallation: $saleInstallation,
      saleManufacturing: $saleManufacturing,
      salePrinting: $salePrinting,
      saleRent: $saleRent,
      saleTax: $saleTax,
      title: $title) {
      nonrtsPartId
    }
  }
`;


export const DELETE_ADD_COSTS_QUERY = gql`
  mutation deleteAddCost($id: ID!) {
    deleteSalesAdditionalCost(id: $id) {
      found
      deletedId
    }
  }
`;

export const DELETE_NON_RTS = gql`
  mutation deleteAddCost($id: ID!) {
    deleteSalesNonrts(id: $id) {
      found
      deletedId
    }
  }
`;

export const DELETE_NON_RTS_RESERVATION = gql`
  mutation DeleteNonRtsReservation($id: ID!) {
    deleteNonRtsReservation(id: $id) {
      ok
    }
  }
`;
