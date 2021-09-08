import { gql } from '@apollo/client';

export const SEARCH_SALES_ESTIMATE_ITOGS = gql`
  query SearchSalesEstimateItogs($projectId: ID, $attachmentId: ID) {
    searchSalesEstimateItogs(project_Id: $projectId, attachment_Id: $attachmentId) {
      edges {
        node {
          rentByPrice
          rentByPriceDiscounted
          rentByPriceDiscountPercent
          rentToClent
          rentToClentDiscounted
          rentToClentDiscountPercent
          staticMounting
          staticPrinting
          staticAdditional
          nalogBeforeDiscount
          nalogAfterDiscount
          nalogDiscountPercent
          agencyCommissionValue
          agencyCommissionPercent
          nonrtsMargin
          nonrtsSale
          additionalRtsBeforeDiscount
          additionalRtsAfterDiscount
          summaryEstimateValue
          summaryEstimateValueWithoutAgencyComission
          additionalNonrtsByTitle {
            edges {
              node {
                name
                sale
                pay
                margin
                agencyCommissionValue
              }
            }
          }
          additionalRtsByTitle {
            edges {
              node {
                name
                summaBeforeDiscount
                discountValue
                summaAfterDiscount
                discountPercent
                agencyCommissionValue
              }
            }
          }
          additionalRts {
            edges {
              node {
                id
                title
                city {
                  id
                  title
                }
                startPeriod
                endPeriod
                count
                price
                discountPercent
                category
                summaAfterDiscount
                priceAfterDiscount
                agencyCommissionPercent
                agencyCommissionValue
                valueWithoutAgencyCommission

                summaBeforeDiscount
                discountValue
                agencyCommission {
                  id
                  percent
                  value
                  toAdditional
                  toMount
                  toNalog
                  toNonrts
                  toPrint
                  toRent
                }
              }
            }
          }
          additionalNonrts {
            edges {
              node {
                id
                name
                incomingRent
                incomingTax
                incomingPrinting
                incomingInstallation
                incomingAdditional
                sale
                pay
                margin
                startPeriod
                endPeriod
                incomingManufacturing
                saleRent
                saleTax
                salePrinting
                saleManufacturing
                endPeriod
                agencyCommissionCalculated
                count
                city {
                  id
                  title
                }
                agencyCommission {
                  id
                  percent
                  value
                  toAdditional
                  toMount
                  toNalog
                  toNonrts
                  toPrint
                  toRent
                }
              }
            }
          }
          reservationsNonrts {
            edges {
              node {
                id
                dateFrom
                dateTo
                constructionSide {
                  id
                  construction {
                    numInDistrict
                    location {
                      postcode {
                        title
                        district {
                          city {
                            id
                            title
                          }
                        }
                      }
                    }
                  }
                  advertisingSide {
                    code
                    side {
                      code
                      format {
                        code
                      }
                    }
                  }
                }
                reservationType {
                  id
                  title
                }
                nonrtsPart {
                  id
                  count
                  startPeriod
                  endPeriod
                  incomingRent
                  incomingTax
                  incomingPrinting
                  incomingManufacturing
                  incomingInstallation
                  incomingAdditional
                  saleRent
                  saleTax
                  incomingPrinting
                  incomingManufacturing
                  incomingInstallation
                  incomingAdditional
                  saleRent
                  saleTax
                  salePrinting
                  saleManufacturing
                  saleInstallation
                  saleAdditional
                }
                sale
                pay
                margin
                agencyCommissionValue
                addressTitle
                cityTitle
                formatTitle
                branding
                agencyCommission {
                  id
                  percent
                  value
                  toAdditional
                  toMount
                  toNalog
                  toNonrts
                  toPrint
                  toRent
                }
              }
            }
          }
          additionalRtsByTitle {
            edges {
              node {
                name
                summaBeforeDiscount
                discountValue
                summaAfterDiscount
                discountPercent
                agencyCommissionValue
              }
            }
          }
          additionalStaticItogs {
            edges {
              node {
                name
                price
              }
            }
          }
          reservations {
            edges {
              node {
                id
                dateFrom
                dateTo
                branding
                discountPricePercentSetted
                valueAfterDiscountPriceSetted
                valueRentToClientSetted
                discountClientPercentSetted
                valueAfterDiscountToClientSetted
                discountNalogPercentSetted
                valueAfterDiscountNalogSetted
                reservationType {
                  title
                }
                addressTitle
                formatTitle
                cityTitle
                rentByPriceCalculated
                discountPricePercentCalculated
                discountPricePercentSelected
                valueAfterDiscountPriceCalculated
                valueRentToClientSelected
                discountClientPercentSelected
                valueRentToClientSelected
                discountClientPercentSelected
                valueRentToClientSelected
                discountClientPercentSelected
                agencyCommissionPercentSelected
                agencyCommissionValueSelected
                valueRentToClientAfterDiscountSelected
                agencyCommissionRent
                additionalStaticPrinting
                additionalStaticPrintingAk
                additionalStaticPrintingAkPercent
                additionalStaticMounting
                additionalStaticMountingAk
                additionalStaticMountingAkPercent
                additionalStaticAdditional
                additionalStaticAdditionalAk
                additionalStaticAdditionalAkPerent
                additionalStaticNalog
                additionalStaticNalogDiscountPercentSelected
                additionalStaticNalogDiscountCalculated
                additionalStaticNalogValueAfterDiscount
                additionalStaticNalogAk
                additionalStaticNalogAkPercent
                itogSummary
                itogAgencyCommission
                itogSummaryWithoutAgencyCommission
                agencyCommission {
                  id
                  percent
                  value
                  toAdditional
                  toMount
                  toNalog
                  toNonrts
                  toPrint
                  toRent
                }
                constructionSide {
                  advertisingSide {
                    code
                    side {
                      title
                      code
                      format {
                        title
                        code
                      }
                      code
                    }
                  }
                  construction {
                    numInDistrict
                    location {
                      marketingAddress {
                        address
                      }
                      postcode {
                        title
                        district {
                          title
                          city {
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ATTACHMENT_BOOKED_SIDES_QUERY = gql`
  query applicationQuery($id: ID) {
    searchAttachment(id: $id) {
      edges {
        node {
          id
          code
          reservations {
            edges {
              node {
                id
                dateFrom
                dateTo
                constructionSide {
                  advertisingSide {
                    code
                    side {
                      title
                      code
                      format {
                        title
                        code
                      }
                      code
                    }
                  }
                  construction {
                    numInDistrict
                    location {
                      marketingAddress {
                        address
                      }

                      postcode {
                        title
                        district {
                          title
                          city {
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;



export const EXTRA_COSTS_QUERY = gql`
  query additionalCostsQuery($id: ID) {
    searchSalesAdditionalCost(id: $id) {
      edges {
        node {
          id
          title
          city {
            title
            id
          }
          startPeriod
          endPeriod
          price
          count
          discountPercent
          agencyCommission {
            percent
            value
          }
        }
      }
    }
  }
`;


export const NON_RTS_QUERY = gql`
  query nonRtsQuery($id: ID) {
    searchSalesNonrts(id: $id) {
      edges {
        node {
          id
          count
          title
          city {
            title
            id
          }
          incomingRent
          incomingTax
          incomingPrinting
          incomingInstallation
          incomingManufacturing
          incomingAdditional
          saleRent
          saleTax
          salePrinting
          saleInstallation
          saleManufacturing
          saleAdditional
          agencyCommission {
            percent
            value
            toNonrts
          }
        }
      }
    }
  }
`;


export const PROJECT_BOOKED_SIDES_QUERY = gql`
  query bookedSidesQuery($id: ID) {
    searchProject(id: $id) {
      edges {
        node {
          reservations {
            edges {
              node {
                id
                dateFrom
                dateTo
                branding
                constructionSide {
                  advertisingSide {
                    code
                    side {
                      title
                      code
                      format {
                        title
                        code
                      }
                      code
                    }
                  }
                  construction {
                    numInDistrict
                    location {
                      marketingAddress {
                        address
                      }
                      postcode {
                        title
                        district {
                          title
                          city {
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const PROJECT_EXTRA_COSTS_QUERY = gql`
  query projectExtraCostsQuery($id: ID) {
    searchProject(id: $id) {
      edges {
        node {
          additionalCosts {
            edges {
              node {
                id
                title
                city {
                  title
                  id
                }
                startPeriod
                endPeriod
                price
                count
                discountPercent
                agencyCommission {
                  percent
                  value
                  toAdditional
                  toMount
                  toNalog
                  toPrint
                  toRent
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const PROJECT_NON_RTS_QUERY = gql`
  query projectNonRtsQuery($id: ID) {
    searchProject(id: $id) {
      edges {
        node {
          additionalCostsNonrts {
            edges {
              node {
                id
                city {
                  title
                  id
                }
                count
                title
                incomingRent
                incomingTax
                incomingPrinting
                incomingInstallation
                incomingManufacturing
                incomingAdditional
                city {
                  title
                }
                saleRent
                saleTax
                salePrinting
                saleInstallation
                saleManufacturing
                saleAdditional
                agencyCommission {
                  percent
                  value
                  toAdditional
                  toMount
                  toNalog
                  toPrint
                  toRent
                  toNonrts
                }
              }
            }
          }
        }
      }
    }
  }
`;
