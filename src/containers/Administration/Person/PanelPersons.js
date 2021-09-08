import React from 'react';
import styled from "styled-components";
import { gql } from '@apollo/client';

import Table from '../../../components/Tablea/Tablea';

import { StyledPen, TrashSpacer, PenSpacer, StyledTrash } from '../components/Styled'
import '../../../components/SlidingBottomPanel/style.scss'
import { GqlDatasource } from '../components/gql_datasource';

const sorterObj = { compare: (a, b) => a.localeCompare(b), multiple: 1 }


const personColumns = [
  { title: 'Код',       dataIndex: 'key',      width: 100, sorter: sorterObj },
  { title: 'Ф.И.О',     dataIndex: 'name',     width: 100, sorter: sorterObj },
  { title: 'Должность', dataIndex: 'position', width: 100, sorter: sorterObj },
  { title: 'Телефон',   dataIndex: 'phone',    width: 100, sorter: sorterObj },
  { title: 'E-mail',    dataIndex: 'email',    width: 100, sorter: sorterObj },
  {
    width: 50,
    fixed: 'right',
    render: (text, record) => (
      <>
        <PenSpacer />
        <StyledPen onClick={(event) => record.openEditSlider(event, record)} />
        <TrashSpacer/>
        <StyledTrash onClick={(event) => deleteUser(event, record)} />
      </>
    ),
  },
];

const StyledOutdoorTableBar = styled.div`
    width: 100%;
`;

const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          id
          username
          firstName
          lastName
          isStaff
          phone
          email
          employeePosition {
            title
          }
        }
      }
    }
  }
`;


const srcUsers = new GqlDatasource({
  query: GET_USERS,
  method: "users",
  stub: [],
  filterFunEmpty: true,
  selectorFun: (data => (
    data.users.edges.map(item => ({
      key: item.node.username,
      name: `${item.node.firstName} ${item.node.lastName}`,
      position: item.node.employeePosition && item.node.employeePosition.title,
      phone: item.node.phone,
      email: item.node.email,
      accessLevel: item.node.isStaff,
      id: item.node.id
  })))),
  loaderBig: false
});


function deleteUser(event, record) {
  console.log('Delete', event, record)
}

function PanelDesign({openEditSlider}) {
  let [values, isReactComponent] = srcUsers.apiQuery();
  if (isReactComponent)
    return values;

  for (let value of values) {
    value["openEditSlider"] = openEditSlider;
  }


  // let values = srcUsers.stubData;
  return (
    <StyledOutdoorTableBar>
      <Table style={{ width: '100%' }} columns={personColumns} data={values} notheader={true} />
    </StyledOutdoorTableBar>
  );
};

export default PanelDesign;
