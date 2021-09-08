import { gql } from '@apollo/client';

export const QUERY_ATTACHMENT = gql`
  query SearchAddressProgram($attachmentId: ID) {
    searchSalesEstimateItogs(attachment_Id: $attachmentId) {
      edges {
        node {
          rentByPrice
          rentByPriceDiscounted
          rentByPriceDiscountPercent
          rentToClent
          rentToClentDiscounted
          rentToClentDiscountPercent
          staticPrinting
          staticMounting
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
          addressProgramm {
            edges {
              node {
                id
                cityTitle
                formatTitle
                dateFrom
                dateTo
                rent
                discountClientPercent
                discountClientValue
                printing
                mounting
                additional
                nalog
                nalogDiscountPercent
                nalogDiscountValue
                itogSummary
                city {
                  id
                  title
                }
                format {
                  id
                  title
                }

              }
            }
          }
          attachment {
            id
            code
            signatoryOne
            signatoryTwo
            createdDate
            periodStartDate
            periodEndDate
            contract {
              code
              registrationDate
              paymentDate
              serialNumber
            }
            project {
              id
              client {
                bik
                binNumber
              }
            }
          }
        }
      }
    }
  }
`;
