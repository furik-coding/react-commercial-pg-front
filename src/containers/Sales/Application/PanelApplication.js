import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea/Tablea';
import Tablea from '../../../components/Tablea/Tablea_estimate';
import { column, column_sorter, notnull, column_num, null2str, null2strKey, null2bool } from '../../../components/Table/utils'

const PanelDesign = ({ tableData, loading }) => {
  console.log(tableData)
  const [columns, setColumns] = useState([
    column('Город', 'city', 100),
    column('Формат', 'format', 100),
    column('Период', 'period', 100),
    column('Аренда', 'renta', 100),
    column('Печать', 'print', 100),
    column('Монтаж', 'install', 100),
    column('Доп Расходы', 'addexpense', 100),
    column('Налог', 'nalog', 100),
    column('Общая Сумма', 'amount', 100),
  ])

  return (
    <>
      <div className="outdoor-table-bar">
        <Tablea
          title="Адресная программа"
          // changeColumns={changeColumns}
          columns={columns}
          data={tableData}
          select={false}
          edit={false}
          loading={loading}
          notheader={false}
        />
      </div>

      <style>
        {
          `.outdoor-table-bar {
            width: 100%;
            overflow-x: hidden;
          }`
        }
      </style>
    </>
  );
};

export default PanelDesign;
