import React, { useContext } from 'react';
import { EstimateContext } from '../Estimate';
import { DatePicker } from 'antd';

export const PeriodFilterDropdown = (props) => {
  const { periodFilter, setPeriodFilter } = useContext(EstimateContext);

  return (
    <div
      style={{
        width: 260,
      }}>
      <div
        style={{
          padding: '16px',
        }}>
        <p
          style={{
            fontSize: 14,
            color: periodFilter === 'increase' ? '#2C5DE5' : '#1A1A1A',
            marginBottom: 16,
            cursor: 'pointer',
          }}
          onClick={() => {
            setPeriodFilter((prevState) => {
              switch (prevState) {
                case 'increase':
                  return '';
                default:
                  return 'increase';
              }
            });
            props.clearFilters();
            props.confirm();
          }}>
          Сортировать по увеличению
        </p>
        <p
          style={{
            fontSize: 14,
            color: periodFilter === 'decrease' ? '#2C5DE5' : '#1A1A1A',
            marginBottom: 0,
            cursor: 'pointer',
          }}
          onClick={() => {
            props.confirm();
            props.clearFilters();
            setPeriodFilter((prevState) => {
              switch (prevState) {
                case 'decrease':
                  return '';
                default:
                  return 'decrease';
              }
            });
          }}>
          Сортировать по уменьшению
        </p>
      </div>
      <div
        style={{
          borderTop: '1px solid #D3DFF0',
        }}>
        <div
          style={{
            padding: 16,
          }}>
          <p
            style={{
              color: '#656565',
              fontSize: 12,
            }}>
            ОПЦИИ
          </p>
          <DatePicker
            style={{
              width: '100%',
            }}
            onChange={(val) => {
              if (!val) {
                props.clearFilters();
              }
            }}
            format="DD.MM.YYYY"
            onSelect={(val) => {
              props.setSelectedKeys([val.toDate().setHours(0, 0, 0, 0)]);
              props.confirm();
              console.log('cleared');
            }}
            placeholder="Выберите дату"
          />
        </div>
      </div>
    </div>
  );
};
