import React, { useState, createContext, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';

import InnerForm from './TabPanel/TabPanelLocation';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar } from '../../../components/Styles/DesignList/styles';
import { LoadingAntd } from '../../../components/UI/Loader/Loader'

export const locationContext = createContext();
const Location = (props) => {
  const [ id ] = useState(props.match.params.id);
  const [ apiData, setApiData ] = useState({});
  const LOCATION_ITEM = gql`
    query SearchLocation($id: ID!) {
      searchLocation(id: $id) {
        edges {
          node {
            id
            area
            cadastralNumber
            purposeLocation {
              id
              title
            }
            comment

            postcode {
              id
              title
              district {
                id
                title
                city {
                  id
                  title
                }
              }
            }
            legalAddress {
              id
              address
            }

            resolutionNumber
            resolutionNumberDate

            areaAct
            areaActDate

            rentContractEnd
            rentContractStart
            rentContractNumber
            rentContractCreatedAt
            registrationStatusLocation {
              id
              title
              subcathegory
            }

            document
            marketingAddress {
              address
            }
            constructions {
              edges {
                node {
                  id
                  code
                  coordinates
                  location {
                    marketingAddress {
                      address
                    }
                  }
                  format {
                    title
                  }
                }
              }
            }
            familyConstruction {
              id
              title
            }
          }
        }
      }
    }
`;

  const { error, data, loading } = useQuery( LOCATION_ITEM, { variables: { id: id } });

  useMemo(() => {
    if (data && data.searchLocation.edges.length) {
      setApiData(data.searchLocation.edges[0].node);
    }
  }, [data]);
  if (error) return <h3>Error :(</h3>;
  if (loading) return <LoadingAntd/>;

  return (
    <locationContext.Provider value={ [apiData, setApiData] }>
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
      </LeftBar>
      <InnerForm />
      <style>{`
        .left-bar {
          margin: 0 2vw 0 0;
        }
      `}</style>
    </div>
    </locationContext.Provider>
  );
};

export default Location;
