import React from 'react';

import { AdminConstructionItem } from './AdminConstructionItem';


function hasEmpty(objects, length = null) {
  if (length === null) {
    length = objects.length;
  }
  for (let i = 0; i < length; ++i) {
    let obj = objects[i];
    if (Object.keys(obj).length === 0 && obj.constructor === Object)
      return true;
  }
  return false;
};


// Создать функцию выбора нового пункта в иерархии (вызов по клику на элемент выше по иерархии)
function generateSelector(cleanupChain, location) {
  return (data) => {
    let idx = location.idx;
    // let datasource = location.childDatasource();
    // if (datasource)
    //   datasource.setFilter(datasource.filter); // TODO

    let childsIsEmpty = data.childs !== null && data.childs !== undefined && !hasEmpty([data.childs])
    if (location.setSelected) {
      location.setSelected(data);
      if (childsIsEmpty) {

      }
      else if (cleanupChain.length > idx) {
        if (cleanupChain.length > idx + 1) {
          for (let i = idx + 1; i < cleanupChain.length; ++i) {
            cleanupChain[i].setSelected({});
            cleanupChain[i].setStateSelectedIdx(-1);
          }
        }
      }
    }
    let firstIdx = (idx > 0 ? idx-1 : 0);
    for (let i = cleanupChain.length-1; i > firstIdx ; --i) {
      cleanupChain[i].setStateSelectedIdx(-1);
    }
  };
};


export function RadiobuttonCRUDWithSearch({location, propCtx: { chain, sliderState, APPEND_TITLES, APPEND_TITLES2 }})
{
  const appendHandler = (event) => {
    sliderState.createAdd(APPEND_TITLES[location.idx], APPEND_TITLES2[location.idx], location);
  };

  let editHandler = (event, record) => {
    event.preventDefault();
    console.log(record);
    sliderState.setEditedData(record);
    sliderState.createEdit(event, record, APPEND_TITLES[location.idx], APPEND_TITLES2[location.idx], location);
  };

  let deleteHandler = (event, record) => {
    event.preventDefault();
    location.src.apiDel({id: record.key, sideId: record.sideId},
        promise => location.showCRUDMessageAndRefetch(promise, "Удаление"));
  }

  if (
    // 1й элемент
    !location.idx
    // текущий выделен
    || location.stateSelectedIdx >= 0
    // Текущий пуст, но выделен предыдущий
    || (location.stateSelectedIdx < 0 && location.parent && location.parent.stateSelectedIdx >= 0)
  )
    return <AdminConstructionItem
      location={location}
      title={location.title}
      selectHandler={
        generateSelector(chain, location)
      }
      appendHandler={appendHandler}
      editHandler={editHandler}
      deleteHandler={deleteHandler}
    />
  return <></>;
}
