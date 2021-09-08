import { useState } from 'react';


import { message } from 'antd';
import { messageStyle } from '../components/Styled';
import '../../../components/SlidingBottomPanel/style.scss'

function defaultUpdFilter(values, sliderState) {
  return { title: values.name, id: sliderState.editedData.key };
}

export class LocationState {
  constructor({ datasource, title, idx, childType = null, updFilter = defaultUpdFilter }) {
    let [selected, setSelected] = useState({});
    let [stateSelectedIdx, setStateSelectedIdx] = useState(-1);

    // Состояние и сеттер состояния для поискового запроса
    const [searchTerm, setSearchTerm] = useState('');
    this.searchTerm = searchTerm;
    this.setSearchTerm = setSearchTerm;

    // Фильтр объекта переменных, передаваемых вызову api Update
    this.updFilter = updFilter;

    this.idx = idx;
    this.title = title;
    this.selected = selected;
    this.setSelected = setSelected;
    this.stateSelectedIdx = stateSelectedIdx;
    this.setStateSelectedIdx = setStateSelectedIdx;
    this.src = datasource;
    this.childType = childType;
    datasource.useAdd();
    datasource.useAdd2();
    datasource.useDel();
    datasource.useDel2();
    datasource.useUpd();
    this.parent = null;
    this.refetch = this.refetch.bind(this);
    this.showCRUDMessageAndRefetch = this.showCRUDMessageAndRefetch.bind(this);
  }

  showCRUDMessageAndRefetch(operation, operationName) {
    operation
      .then(value => {
        this.refetch();
        message.success({content: `${operationName} выполнено успешно.`, duration: 1, style: messageStyle});
      })
      .catch(reason => {
        console.log('catch', reason)
        message.error({content: `${operationName} не выполнено. Ошибка: ${reason.message}`,
          duration: 3, style: messageStyle});
      });
  }

  refetch() {
    this.src.refetch();
  }

  setParent(parent) {
    this.parent = parent;
  }

  childDatasource() { return this.childType ? this.childType.datasource : undefined; }

  getSearchVariables() {
    if (!this.idx || !this.parent)
      return "";
    return {id: this.parent.selected.key};
  }
}
