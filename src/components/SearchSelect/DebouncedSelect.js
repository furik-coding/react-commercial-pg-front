import React, { useEffect, useState } from 'react';
import useDebounce from '../../containers/Administration/components/useDebounce';
import { useLazyQuery } from '@apollo/client';
import { StyledSelect } from '../Styles/DesignList/styles';
import { Form, Select } from 'antd';
import { StyledPanel } from '../Styles/StyledFilters';
import arrowDown from '../../img/icon_dropdown_select.svg';


export const DebouncedSelect = ({name, query, dataPredicate, dataUnpack,
                                  emptyrowTitle=undefined,
                                  placeholder = undefined,
                                  queryArg='title_Icontains',
                                  dropdownAlignTop=false,
                                  valueSelector=(node) => node.title,
                                  formitem=Form.Item,
                                  rules=undefined,
                                  label=undefined,
                                  disabled=false
                                }) => {
  const [value, setValue] = useState(undefined);
  const [searchText, setSearchText] = useState(value);
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [getQueryData, { loading, data }] = useLazyQuery(query);
  const [selectOpened, setSelectOpened] = useState(false);

  useEffect(() => {
    getQueryData({ variables: { [queryArg]: debouncedSearchTerm } });
  }, [debouncedSearchTerm, getQueryData, loading]);

  let mapDataToOptions = () => {
    if (!loading && data && dataPredicate(data)) {
      let arr = dataUnpack(data);
      // arr.sort((a,b) => a.node.title.localeCompare(b.node.title));
      if (emptyrowTitle !== null && emptyrowTitle !== undefined)
        arr = [{ node: {title: emptyrowTitle, id: null}}, ...arr];
      return (
        arr && arr.map(({ node }) => (
          <StyledSelect.Option key={node.id || "EMPTY_KEY"} value={valueSelector(node)}>
            { node.title ? node.title : 'Нет названия' }
          </StyledSelect.Option>
        ))
      )
    }
  }
  let dropdownAlign = undefined
  if (dropdownAlignTop) {
    dropdownAlign = {
      points: ['bl', 'tl'],
      offset: [0, -4],
      overflow: {
        adjustX: 0,
        adjustY: 1,
      },
    }
  }
  let FormItem = formitem;

  return (
    <FormItem name={name} rules={rules} label={label}>
      <StyledSelect
        allowClear
        dropdownAlign={dropdownAlign}
        placeholder={placeholder}
        size={'large'}
        showSearch
        value={value}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={(value) => setSearchText(value)}
        onChange={(value) => setValue(value)}
        notFoundContent={null}
        loading={loading}
        disabled={disabled}
        onDropdownVisibleChange={(opened) => {
          setSelectOpened(opened);
        }}
        suffixIcon={
          <>
            <img src={arrowDown} alt="arrow top" style={{ transform: selectOpened ? 'rotate(180deg)' : '' }}/>
          </>
        }
      >
        {mapDataToOptions()}
      </StyledSelect>
    </FormItem>
  )
}
