import React from "react";
import styled from "styled-components";


const columns =  [
    {
        Header: 'Код',
        accessor: 'col1', // accessor is the "key" in the data
        sticky: 'left',
        width: 330,
    },
    {
        Header: 'Название',
        accessor: 'col2',
        width: 280,
    },
    {
        Header: 'Бренд',
        accessor: 'col3',
        width: 280,
    },
    {
        Header: 'Клиент',
        accessor: 'col4',
        width: 280,
    },

    {
        Header: 'Агентская комиссия',
        accessor: 'col5',
        maxWidth: 60,
        sticky: 'right',
    }
]

export default columns;
