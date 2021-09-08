import React, { useEffect, useState } from 'react';

import useDebounce from '../../containers/Administration/components/useDebounce';

import { StyledSelect } from '../Styles/DesignList/styles';

const SearchSelect = (props) => {
  const {
    value, defaultValue, nestedField = 'title',
    onChange, getData, nameOfQuery, icon, flagSearchInitiator = false,
    responseDataInfo = {data: null, loading: false}
  } = props;

  const [ searchText, setSearchText ] = useState('');
  const debouncedPartnerSearchTerm = useDebounce(searchText, 500);
  const [loading, setLoading] = useState(false);
  const [localResponseData, setLocalResponseData] = useState(null);

  useEffect(() => {
    if(getData) {
      getData(debouncedPartnerSearchTerm);
    }
    setLoading(responseDataInfo && responseDataInfo.loading);
  }, [debouncedPartnerSearchTerm]);

  useEffect(() => {
    const { data, loading } = responseDataInfo;
    if(data && data[nameOfQuery].edges) {
      if(data[nameOfQuery].edges.node && data[nameOfQuery].edges.node.initiatedContracts && flagSearchInitiator) {
        setLocalResponseData(data[nameOfQuery].edges.node.initiatedContracts.edges)
      } else {
        setLocalResponseData(data[nameOfQuery].edges);
      }
      setLoading(loading);
    }
  }, [responseDataInfo.data]);

  return(
    <StyledSelect
      showSearch
      value={value}
      defaultActiveFirstOption={false}
      defaultValue={defaultValue}
      showArrow={false}
      filterOption={false}
      onSearch={(value) => {setSearchText(value)}}
      onChange={onChange}
      notFoundContent={null}
      loading={loading}
    >
      {
        flagSearchInitiator
        ? (
            localResponseData && localResponseData.map(({ node }) => (
              <StyledSelect.Option key={node.initiator.id} value={node.initiator.id}>
                <img src={icon} />
                <span>{ node.initiator ? node.initiator.name : 'Нет названия' }</span>
              </StyledSelect.Option>
            ))
          )
        : (
            localResponseData && localResponseData.map(({ node }) => (
              <StyledSelect.Option key={node.id} value={node.id}>
                <img src={icon} />
                <span>{ node[nestedField] ? node[nestedField] : 'Нет названия' }</span>
              </StyledSelect.Option>
            ))
          )
      }
    </StyledSelect>
  )
}

export default SearchSelect;
