import React from 'react';
import { useHistory } from 'react-router';

import PanelPerson from './PanelPersons'
import { routes } from '../../../routes';
import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout'
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel'
import { PersonCRUDForm } from './PersonCRUDForm'
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import '../../../components/SlidingBottomPanel/style.scss'


function AddUserSlider({closeHandler}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title="Добавить нового сотрудника" onClose={closeHandler} classNameSuffix={'user'}>
      <PersonCRUDForm actionText={"Добавить"} onFinish={onFinish}/>
    </SlidingBottomPanel>
  )
}


function EditUserSlider({closeHandler, initialValues}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title="Редактировать данные сотрудника" onClose={closeHandler} classNameSuffix={'user'}>
      <PersonCRUDForm actionText={"Сохранить изменения"} onFinish={onFinish} initialValues={initialValues}/>
    </SlidingBottomPanel>
  )
}


function Person(props) {
  const history = useHistory();
  const sliderState = new SliderState({
    accessLevel: false,
    email: null,
    id: null,
    key: null,
    name: null,
    phone: null,
    position: null
  })

  return (
    <AdminTopLayout
      activeRoute={routes.administration.person}
      buttonName="Создать сотрудника"
      buttonClickHandler={sliderState.createAdd}
    >
      {sliderState.addShowed && <AddUserSlider closeHandler={sliderState.closeAdd}/>}
      {sliderState.editMustShowed() && <EditUserSlider closeHandler={sliderState.closeEdit}
                                                       initialValues={sliderState.editedData}/>}

      <PanelPerson style={{ flex: '0 1 auto' }} history={history} openEditSlider={sliderState.createEdit}/>
    </AdminTopLayout>
  );
};


export default Person;
