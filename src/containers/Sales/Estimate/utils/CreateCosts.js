import { useParams } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { EstimateContext } from '../Estimate';
import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Select } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_ADDITIONAL_COSTS, CREATE_NON_RTS_COSTS } from '../q_mutations';
import arrowDown from '../../../../img/icon_dropdown_select.svg';
import { ReactComponent as ExitIcon } from '../../../../img/sales/exitIcon.svg';
import moment from 'moment';

export const CreateCosts = ({ block, refetch }) => {
  const InputLabel = (title) => {
    return (
      <span
        style={{
          color: '#1A1A1A',
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        {title}
      </span>
    );
  };
  const { id, appId } = useParams();
  const currentId = appId ? appId : id ? id : '';

  const { createModal, setCreateModal, cities } = useContext(EstimateContext);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  let FormInputs = () => {
    return 'no create';
  };
  const [createAddCosts] = useMutation(CREATE_ADDITIONAL_COSTS);
  const [createNonRts] = useMutation(CREATE_NON_RTS_COSTS);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  switch (block) {
    case 'extra-charge':
      FormInputs = () => {
        const [selectOpened, setSelectOpened] = useState(false);
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr 2fr',
              gap: '30px',
              minHeight: '123px',
            }}>
            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="name"
              rules={[{ required: true, message: 'Пожалуйста введите наименование услуги.' }]}
              label={
                <span
                  style={{
                    color: '#1A1A1A',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>
                  Наименование услуги
                </span>
              }>
              <Input size="large" />
            </Form.Item>
            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="city"
              rules={[{ required: true, message: 'Пожалуйста выберите город.' }]}
              label={
                <span
                  style={{
                    color: '#1A1A1A',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>
                  Город
                </span>
              }>
              <Select
                allowClear
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                suffixIcon={
                  <>
                    <img
                      src={arrowDown}
                      alt="arrow top"
                      style={{
                        transform: selectOpened ? 'rotate(180deg)' : '',
                      }}
                    />
                  </>
                }
                onDropdownVisibleChange={(opened) => {
                  setSelectOpened(opened);
                }}
                loading={!cities.loaded}
                size="large">
                {cities.data.map((city) => {
                  return (
                    <Option key={city.id} value={city.id}>
                      {city.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="period"
              rules={[{ required: true, message: 'Пожалуйста укажите период.' }]}
              label={
                <span
                  style={{
                    color: '#1A1A1A',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>
                  Период
                </span>
              }>
              <RangePicker
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                size="large"
                placement="topLeft"
              />
            </Form.Item>
            <Form.Item
              name="count"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              rules={[{ required: true, message: 'Пожалуйста введите количество.' }]}
              label={InputLabel('Кол-во')}>
              <InputNumber type="number" size="large" />
            </Form.Item>
            <Form.Item
              name="price"
              className="editForm-item"
              labelAlign="left"
              initialValue={0}
              colon={false}
              rules={[{ required: true, message: 'Пожалуйста введите цену.' }]}
              label={InputLabel('Цена')}>
              <InputNumber size="large" formatter={(value) => `${value} тг`} />
            </Form.Item>
            <Form.Item
              name="discount"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Скидка')}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </Form.Item>
            <Form.Item
              name="agPercent"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Процент АК')}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </Form.Item>
            <Form.Item
              name="agSumm"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Сумма АК')}>
              <InputNumber
                size="large"
                formatter={(value) => {
                  return `${value} тг`;
                }}
              />
            </Form.Item>
            <Form.Item className="editForm-item">
              <Button
                type="primary"
                htmlType="submit"
                loading={confirmLoading}
                style={{
                  width: '100%',
                  height: '38px',
                  marginTop: '40px',
                  borderRadius: '4px',
                  backgroundColor: '#2C5DE5',
                }}>
                Добавить
              </Button>
            </Form.Item>
          </div>
        );
      };
      break;
    case 'hot-ptc':
      FormInputs = () => {
        const [selectOpened, setSelectOpened] = useState(false);
        return (
          <>
            <p
              style={{
                fontSize: 12,
                color: '#656565',
                marginBottom: 0,
              }}>
              ВХОДЯЩАЯ СТОИМОСТЬ
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '30px',
              }}>
              <Form.Item
                name="inputRent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputTax"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputPrint"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputMount"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputCosts"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                    // minWidth: '260px',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputManufcature"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
            </div>

            <p
              style={{
                fontSize: 12,
                color: '#656565',
                marginBottom: 0,
                marginTop: '15px',
              }}>
              СУММА ПРОДАЖИ
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6,1fr)',
                gridColumnGap: '30px',
                gridRowGap: '0px',
              }}>
              <Form.Item
                name="summRent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summTax"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summPrint"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summMount"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summCosts"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summManufacture"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                columnGap: '30px',
                rowGap: '0px',
                minHeight: '123px',
              }}>
              <Form.Item
                name="type"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                label={InputLabel('Тип')}>
                <Input
                  style={{
                    width: '100%',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="count"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Кол-во')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="agPercent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Процент АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value}%`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="agSumm"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Сумма АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                className="editForm-item"
                labelAlign="left"
                colon={false}
                name="city"
                rules={[{ required: true, message: 'Пожалуйста выберите город.' }]}
                label={InputLabel('Город')}>
                <Select
                  allowClear
                  dropdownAlign={{
                    points: ['bl', 'tl'],
                    offset: [0, -4],
                    overflow: {
                      adjustX: 0,
                      adjustY: 1,
                    },
                  }}
                  suffixIcon={
                    <>
                      <img
                        src={arrowDown}
                        alt="arrow top"
                        style={{
                          transform: selectOpened ? 'rotate(180deg)' : '',
                        }}
                      />
                    </>
                  }
                  onDropdownVisibleChange={(opened) => {
                    setSelectOpened(opened);
                  }}
                  loading={!cities.loaded}
                  size="large">
                  {cities.data.map((city) => {
                    return (
                      <Option key={city.id} value={city.id}>
                        {city.title}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="editForm-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={confirmLoading}
                  style={{
                    width: '100%',
                    height: '38px',
                    marginTop: '40px',
                    borderRadius: '4px',
                    backgroundColor: '#2C5DE5',
                  }}>
                  Добавить
                </Button>
              </Form.Item>
            </div>
          </>
        );
      };
      break;
  }
  return (
    <Drawer
      height="auto"
      destroyOnClose
      bodyStyle={{
        paddingBottom: '10px',
      }}
      title={
        <span
          style={{
            color: '#003360',
            fontSize: 14,
            textTransform: 'uppercase',
          }}>
          Добавление
        </span>
      }
      placement="bottom"
      closable={true}
      onClose={() => {
        setCreateModal(false);
      }}
      closeIcon={<ExitIcon />}
      visible={createModal}
      maskStyle={{
        backgroundColor: 'transparent',
      }}>
      <Form
        layout="inline"
        style={{
          flexDirection: block === 'hot-ptc' ? 'column' : 'row',
        }}
        onFinish={(values) => {
          // console.log(values);
          setConfirmLoading(true);
          form.validateFields().then(() => {
            switch (block) {
              case 'extra-charge':
                const start = moment(values.period[0]).toDate();
                const end = moment(values.period[1]).toDate();
                console.log(values);
                let input = {
                  title: values.name,
                  count: values.count,
                  discountPercent: values.discount,
                  price: values.price,
                  agencyCommission: {
                    value: values.agSumm === 'null' || values.agSumm == '0' ? null : values.agSumm,
                    percent: values.agPercent === 'null' || values.agPercent == '0' ? null : values.agPercent,
                  },
                  city: values.city,
                  startPeriod: start,
                  endPeriod: end,
                  project: currentId,
                };
                createAddCosts({
                  variables: {
                    input,
                  },
                })
                  .then(() => {
                    setCreateModal(false);
                    form.resetFields();
                    setConfirmLoading(false);
                    message.success('Успешно создано.');
                    refetch();
                  })
                  .catch((err) => {
                    setConfirmLoading(false);
                    setCreateModal(false);
                    message.error('Что-то пошло не так попробуйте ещё раз.');
                    console.log(err);
                  });
                break;
              case 'hot-ptc':
                let nonRtsInput = {
                  count: values.count,
                  title: values.type,
                  incomingTax: values.inputTax,
                  incomingRent: values.inputRent,
                  incomingPrinting: values.inputPrint,
                  incomingAdditional: values.inputCosts,
                  incomingInstallation: values.inputMount,
                  incomingManufacturing: values.inputManufcature,
                  saleTax: values.summTax,
                  saleRent: values.summRent,
                  salePrinting: values.summPrint,
                  saleAdditional: values.summCosts,
                  saleInstallation: values.summMount,
                  saleManufacturing: values.summManufacture,
                  agencyCommission: {
                    value: values.agSumm === 'null' || values.agSumm == '0' ? null : values.agSumm,
                    percent: values.agPercent === 'null' || values.agPercent == '0' ? null : values.agPercent,
                    toNonrts: true,
                  },
                  city: values.city,
                  project: currentId,
                };
                console.log(currentId);
                // console.log(nonRtsInput);
                createNonRts({
                  variables: {
                    input: nonRtsInput,
                  },
                })
                  .then(() => {
                    setCreateModal(false);
                    form.resetFields();
                    setConfirmLoading(false);
                    message.success('Успешно создано.');
                    refetch();
                  })
                  .catch((err) => {
                    setConfirmLoading(false);
                    message.error('Что-то пошло не так попробуйте ещё раз.');
                    setCreateModal(false);
                    console.log(err);
                  });
                break;
            }
          });
        }}
        form={form}>
        <FormInputs />
      </Form>
      <style>
        {`

        .editBtn {
          width: 100%;
          // max-width: 270px;
          margin-right: 0 !important;
        }

       .editForm-item {
         display: flex;
         flex-direction: column;
         margin-right: 0 !important;
         margin-bottom: 0 !important;
       }

        .rangePicker-dropdown {
          top: 532px !important;
        }

        // .select-dropdown {
        //   top: 542px !important;
        // }

        `}
      </style>
    </Drawer>
  );
};
