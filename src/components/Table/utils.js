

export const column_sorter = (title, dataIndex, width, isShowed=true, sorter=null,
                       filter={filterDropdown: null, onFilter: null}) => {
  let result = {
    title: title,
    key: dataIndex,
    dataIndex: dataIndex,
    width: width,
    className: (isShowed ? 'show' : 'hide'),
    isShowed: isShowed,
  }
  if (sorter) {
    result.sorter = sorter
  }
  if (filter  && filter.filterDropdown) {
    result.filterDropDown = filter.filterDropdown;
  }
  if (filter  && filter.onFilter) {
    result.onFilter = filter.onFilter;
  }
  return result
};

export const notnull = (a) => a !== null && a !== undefined



export const column = (title, dataIndex, width, isShowed=true, sorter=true,
                       filter={filterDropdown: null, onFilter: null}) => {
  return column_sorter(title, dataIndex, width, isShowed,
    sorter && {
      compare: (a, b) => notnull(a[dataIndex]) ? (notnull(b[dataIndex]) ? a[dataIndex].localeCompare(b[dataIndex]) : 1) : -1,
      multiple: 1,
    }, filter
  );
};

export const column_num = (title, dataIndex, width, isShowed=true, sorter=true,
                       filter={filterDropdown: null, onFilter: null}) => {
  return column_sorter(title, dataIndex, width, isShowed,
    sorter && {
      compare: (a,b) => notnull(a[dataIndex]) ? (notnull(b[dataIndex]) ? Number(a[dataIndex].split(' ')[0]) - Number(b[dataIndex].split(' ')[0]) : 1) : -1,
      multiple: 1,
    }, filter
  );
};



export const null2str = (item) => item ? item : '';
export const null2strKey = (item, key) => item ? null2str(item[key]) : '';
export const null2bool = (item) => item ? item : false;
