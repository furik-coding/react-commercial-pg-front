import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { routes } from '../../../routes';
import React from 'react';
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { PersonCRUDForm } from '../Person/PersonCRUDForm';
import { PenSpacer, StyledPen, StyledTrash, TrashSpacer } from '../components/Styled';
import styled from 'styled-components';
import Table from '../../../components/Tablea/Tablea';

import { srcCrews } from './AdminCrewsDatasource';
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { CrewsCRUDForm } from './AdminCrewsCRUDForm';

import '../../../components/SlidingBottomPanel/style.scss'


const sorterObj = { compare: (a, b) => a.localeCompare(b), multiple: 1 }


const crewsColumns = [
  { title: 'Код',         dataIndex: 'key',   width: 100, sorter: sorterObj },
  { title: 'Имя экипажа', dataIndex: 'name',  width: 100, sorter: sorterObj },
  { title: 'Телефон',     dataIndex: 'phone', width: 100, sorter: sorterObj },
  { title: 'Город',       dataIndex: 'city',  width: 100, sorter: sorterObj },
  {
    width: 50,
    fixed: 'right',
    render: (text, record) => (
      <>
        <PenSpacer />
        <StyledPen onClick={(event) => record.openEditSlider(event, record)} />
        <TrashSpacer/>
        <StyledTrash onClick={(event) => deleteCrew(event, record)} />
      </>
    ),
  },
];

function deleteCrew(event, record) {
  console.log('Delete', event, record)
}


const StyledOutdoorTableBar = styled.div`
    width: 100%;
`;


function AddCrewSlider({closeHandler}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title="Добавить новый экипаж" onClose={closeHandler} classNameSuffix={'crew'}>
      <CrewsCRUDForm actionText={"Добавить"} onFinish={onFinish}/>
    </SlidingBottomPanel>
  )
}


function EditCrewSlider({closeHandler, initialValues}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title="Редактировать данные экипажа" onClose={closeHandler} classNameSuffix={'crew'}>
      <CrewsCRUDForm actionText={"Сохранить изменения"} onFinish={onFinish} initialValues={initialValues}/>
    </SlidingBottomPanel>
  )
}


function PanelCrews({openEditSlider}) {
  let [values, isReactComponent] = srcCrews.apiQuery();

  if (isReactComponent)
    return values;

  for (let value of values) {
    value["openEditSlider"] = openEditSlider;
  }

  return (
    <StyledOutdoorTableBar>
      <Table style={{ width: '100%' }} columns={crewsColumns} data={values} notheader={true} />
    </StyledOutdoorTableBar>
  );
};


const AdminCrews = () => {
  const sliderState = new SliderState({
    id: null,
    name: null,
    phone: null,
    city: null,
  })

  return (
    <AdminTopLayout
      activeRoute={routes.administration.crews}
      buttonName="Создать экипаж"
      buttonClickHandler={sliderState.createAdd}
    >
      {sliderState.addShowed && <AddCrewSlider closeHandler={sliderState.closeAdd}/>}
      {sliderState.editMustShowed() && <EditCrewSlider closeHandler={sliderState.closeEdit}
                                                       initialValues={sliderState.editedData}/>}
      <PanelCrews style={{ flex: '0 1 auto' }} openEditSlider={sliderState.createEdit}/>
    </AdminTopLayout>
  );
};
export default AdminCrews;
