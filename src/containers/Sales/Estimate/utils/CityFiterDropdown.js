import React, { useContext, useState } from 'react';
import { EstimateContext } from '../Estimate';
import worldIcon from '../../../../img/header-bar/world.svg';
import { Select } from 'antd';

export const CityFilterDropdown = (props) => {
  const { cities, setSort, sort } = useContext(EstimateContext);
  const [selectedCity, setSelectedCity] = useState(null);
  const Placeholder = (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <img
        style={{
          marginRight: '9px',
        }}
        src={worldIcon}
        alt="world icon"
      />
      Выбрать город
    </p>
  );
  const { Option } = Select;
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
            color: sort.length ? '#2C5DE5' : '#1A1A1A',
            marginBottom: 16,
            cursor: 'pointer',
          }}
          onClick={() => {
            setSort('abc');
            props.clearFilters();
            setSelectedCity(null);
            props.confirm();
          }}>
          Сортировать от А до Я
        </p>
        <p
          style={{
            fontSize: 14,
            color: '#1A1A1A',
            marginBottom: 0,
            cursor: 'pointer',
          }}
          onClick={() => {
            setSort('');
            props.confirm();
            props.clearFilters();
            setSelectedCity(null);
          }}>
          Сортировать по умолчанию
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

          <Select
            style={{
              width: '100%',
            }}
            size="middle"
            allowClear
            value={selectedCity}
            onClear={() => {
              props.clearFilters();
              setSelectedCity(null);
            }}
            loading={!cities.loaded}
            placeholder={Placeholder}
            onSelect={(val) => {
              props.setSelectedKeys([val]);
              props.confirm();
              setSelectedCity(val);
              setSort('');
            }}>
            {cities.data.map((city) => {
              return (
                <Option key={city.id} value={city.title}>
                  {city.title}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};
