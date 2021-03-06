import React, { useContext, useEffect, useMemo, useState } from 'react';

import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledInput ,StyledSelect} from '../../../../Styles/DesignList/styles';

import anchorIcon from '../../../../../img/input/anchor.svg';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import useDebounce from '../../../../../containers/Administration/components/useDebounce';


const LOCATION_PURPOSE_T = gql`
  query SearchLocPurpose($title: String) {
    searchLocPurpose(title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`


export const EditInformation = () => {
  const [apiData, setApiData] = useContext(locationContext);

  const purposeLocQuery = useLazyQuery(LOCATION_PURPOSE_T);

  const [locPurposeSearchText, setLocPurposeSearchText] = useState('');
  const [locPurpose, setLocPurposeValue] = useState(undefined);
  const [locPurposeData, setLocPurposeData] = useState([]);
  const [locPurposeLoading, setLocPurposeLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(locPurposeSearchText, 500);
  const handleSearchPurposeLocQuery = (value) => {
    setLocPurposeSearchText(value);
  };
  const handleChangePurposeLocQuery = (purposeLocationId) => {
    console.log('id', purposeLocationId);
    setLocPurposeValue(purposeLocationId);
    let newApiData = {...apiData};
    newApiData.purposeLocation = { id: purposeLocationId };
    setApiData(newApiData);
  };

  useEffect(() => {
    console.log(purposeLocQuery)
    purposeLocQuery[0]({variables: {title: debouncedSearchTerm}});
    setLocPurposeLoading(purposeLocQuery[1].loading);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    let data = purposeLocQuery[1].data;
    if (data && data.searchLocPurpose.edges) {
      setLocPurposeData(data.searchLocPurpose.edges);
      setLocPurposeLoading(purposeLocQuery[1].loading);
    }
  }, [purposeLocQuery[1].data]);

  return (
    <Medium>
      <BlockTitle>
          <span style={{ maxWidth: '160px', marginBottom: 10 }}> ???????????????????????????? ???????????????????? </span>
      </BlockTitle>

      <BlockBody>

        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>?????????????? (????)</InputTitle>
            <StyledInput
            prefix={<img src={anchorIcon} />}
            defaultValue={apiData.area ? apiData.area :""}
              onChange={(e) => {setApiData({...apiData, area:e.target.value})}}
              placeholder="?????????????? ?????????????? ???????????????????????????? (????)"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>?????????????????????? ??????????</InputTitle>
            <StyledInput
            prefix={<img src={anchorIcon} />}
            defaultValue={apiData.cadastralNumber ? apiData.cadastralNumber :""}
            onChange={(e) => {setApiData({...apiData, cadastralNumber:e.target.value})}}
              placeholder="00-000-000-000"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>?????????????? ????????????????????</InputTitle>

            <StyledSelect
              showSearch
              value={locPurpose}
              defaultValue={(apiData.purposeLocation && apiData.purposeLocation.title) || ''}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearchPurposeLocQuery}
              onChange={handleChangePurposeLocQuery}
              notFoundContent={null}
              loading={locPurposeLoading}
            >
              {
                locPurposeData && locPurposeData.map(({ node }) => (
                  <StyledSelect.Option key={node.id} value={node.id}>
                    { node.title ? node.title : '?????? ????????????????' }
                  </StyledSelect.Option>
                ))
              }
            </StyledSelect>

            {/* <StyledInput
              placeholder="????????????????-???????????????????????????? ????????????"
              prefix={<img src={anchorIcon} />}
              size={'large'}
              defaultValue={item.purposeLocation ? item.purposeLocation.title : ""}
              onChange={(e) => setItem({ ...item, targetPurpose: {
                ...item.targetPurpose,
                  title: e.target.value
                }
              })}
            >
            </StyledInput> */}
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>??????????????????????</InputTitle>

            <StyledInput.TextArea rows={2}
              value={apiData.comment ? apiData.comment :""}
              onChange={(e) => {setApiData({...apiData, comment:e.target.value})}}
              size={'large'}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default EditInformation;
