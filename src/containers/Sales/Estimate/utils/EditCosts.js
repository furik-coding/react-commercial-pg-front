import React, { useContext, useEffect, useState } from 'react';
import { EstimateContext } from '../Estimate';
import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Select } from 'antd';
import { useMutation } from '@apollo/client';
import { UPDATE_ADDITIONAL_COSTS, UPDATE_NON_RTS, UPDATE_RESERVATION_NON_RTS, CITIES_QUERY } from '../q_mutations';
import moment from 'moment';
import arrowDown from '../../../../img/icon_dropdown_select.svg';
import { ReactComponent as ExitIcon } from '../../../../img/sales/exitIcon.svg';
import { agencyComissionDistributed } from './utils';
import { DebouncedSelect } from '../../../../components/SearchSelect/DebouncedSelect';

let FormItem = ({name, rules, label, children, required=true,
                  marginTop=undefined, initialValue=undefined}) => {
  let fontStyle = {
    color: '#1A1A1A',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: marginTop,
  };
  return (
    <Form.Item
      className="editForm-item"
      labelAlign="left"
      colon={false}
      name={name}
      rules={[{ required: required, message: rules }]}
      label={<span style={fontStyle}>{label}</span>}
      initialValue={initialValue}
    >{children}</Form.Item>
  )
};

let SaveButton = ({confirmLoading}) => {
  return (<Button
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
    Сохранить
  </Button>);
}

export const EditCosts = ({ openModal, setOpenModal, block, editingItem, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  let FormInputs = () => {
    return 'no edit';
  };
  const [updateAddCosts] = useMutation(UPDATE_ADDITIONAL_COSTS);
  const [updateNonRts] = useMutation(UPDATE_NON_RTS);
  const [updateReservationNonRts] = useMutation(UPDATE_RESERVATION_NON_RTS);


  let toPrice = (val) => {
    if (typeof val == 'number')
      return val;
    if (!val)
      return 0;
    return parseFloat(val.replace(/ /g, '').split(' ')[0])
  };

  useEffect(() => {
    switch (block) {
      case 'extra-charge': {
        const start = editingItem.period
          ? moment(editingItem.period.split(' - ')[0].split('.').join('-'), 'DD-MM-YYYY')
          : '';
        const end = editingItem.period
          ? moment(editingItem.period.split(' - ')[1].split('.').join('-'), 'DD-MM-YYYY')
          : '';
        let agSum = null;
        let agPercent = null;
        if (editingItem.agencyCommission) {
          let ak = editingItem.agencyCommission;
          let cat = editingItem.category;
          if (agencyComissionDistributed(ak, cat))  {
            agSum = ak.value;
            agPercent = ak.percent;
          }
        }
        form.setFieldsValue({
          name: editingItem.nameOfService || '',
          count: toPrice(editingItem.quantity),
          price: toPrice(editingItem.price),
          discount: toPrice(editingItem.discount),
          agPercent: agPercent === null ? null : toPrice(agPercent),
          agSumm: agSum === null ? null : toPrice(agSum),
          city: editingItem.cityId ? editingItem.cityId : '',
          period: [start, end],
        });
      }
        break;
      case 'hot-ptc': {
        let agPercent = editingItem?.agencyCommission?.toNonrts && editingItem.agencyCommission.percent;
        if (agPercent === false)
          agPercent = null;
        let agSumm = editingItem?.agencyCommission?.toNonrts && editingItem.agencyCommission.value;
        if (agSumm === false)
          agSumm = null;

        form.setFieldsValue({
          inputRent: toPrice(editingItem.rentInput),
          inputTax: toPrice(editingItem.taxInput),
          inputPrint: toPrice(editingItem.printInput),
          inputMount: toPrice(editingItem.mountInput),
          inputCosts: toPrice(editingItem.costsInput),
          inputManufcature: toPrice(editingItem.manufactureInput),
          summRent: toPrice(editingItem.rentSell),
          summTax: toPrice(editingItem.taxSell),
          summPrint: toPrice(editingItem.printSell),
          summMount: toPrice(editingItem.mountSell),
          summManufacture: toPrice(editingItem.manufactureSell),
          summCosts: toPrice(editingItem.costsSell),
          type: editingItem.code,
          count: editingItem.quantity,
          agPercent: agPercent,
          agSumm: agSumm,
          city: editingItem.cityId ? editingItem.cityId : '',
        });
      }
        break;
    }
  }, [editingItem, form]);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  let fontStyle = {
    color: '#1A1A1A',
    fontSize: '14px',
    fontWeight: 'bold',
  };
  let isReservationNonRts = editingItem.category === 'nonrtsReservation';
  let cityFormItem = (
    <DebouncedSelect
      dropdownAlignTop
      disabled={isReservationNonRts}
      name="city"
      rules='Пожалуйста выберите город.'
      label='Город'
      formitem={FormItem}
      query={CITIES_QUERY}
      valueSelector={node => node.id}
      dataPredicate={data => data.searchCity.edges && data.searchCity.edges.length > 0}
      dataUnpack={ (data) => {
        let arr = [...data.searchCity.edges];
        arr.sort((a,b) => a.node.title.localeCompare(b.node.title));
        return arr;
      }}
    />
  )
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
            <FormItem name='name' rules='Пожалуйста введите наименование услуги.' label='Наименование услуги'>
              <Input size="large" />
            </FormItem>
            {cityFormItem}
            <FormItem name='period' rules='Пожалуйста укажите период.' label='Период'>
              <RangePicker
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                format="DD-MM-YYYY"
                size="large"
                placement="topLeft"
              />
            </FormItem>
            <FormItem name="count" rules='Пожалуйста введите количество.' label='Кол-во' initialValue={0}>
              <InputNumber type="number" size="large" />
            </FormItem>
            <FormItem name='price' rules='Пожалуйста введите цену.' label='Цена' initialValue={0}>
              <InputNumber size="large" formatter={(value) => `${value} тг`} />
            </FormItem>
            <FormItem name='discount' label='Скидка' initialValue={0}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </FormItem>
            <FormItem name='agPercent' label='Процент АК' initialValue={0}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </FormItem>
            <FormItem name='agSumm' label='Сумма АК' initialValue={0}>
              <InputNumber size='large' formatter={(value) => { return `${value} тг`; }}/>
            </FormItem>
            <Form.Item className="editForm-item">
              <SaveButton loading={confirmLoading}/>
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
              <FormItem name='inputRent' label='Аренда' initialValue={0}>
                <InputNumber style={{ width: '100%' }} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name='inputTax' label='Налог' initialValue={0}>
                <InputNumber style={{ width: '100%', }} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name='inputPrint' label='Печать' initialValue={0}>
                <InputNumber style={{ width: '100%', }} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name="inputMount" label='Монтаж' initialValue={0}>
                <InputNumber style={{ width: '100%', }} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name='inputCosts' label='Доп.расходы' initialValue={0}>
                <InputNumber style={{ width: '100%' }} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name='inputManufcature' label='Производство' initialValue={0}>
                <InputNumber style={{ width: '100%' }} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
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
              <FormItem name='summRent' label='Аренда' initialValue={0}>
                <InputNumber style={{width: '100%'}} size="large" formatter={(value) => `${value} тг` }/>
              </FormItem>
              <FormItem name='summTax' label='Налог' initialValue={0}>
                <InputNumber style={{width: '100%'}} size="large" formatter={(value) => `${value} тг` }/>
              </FormItem>
              <FormItem name='summPrint' label='Печать' initialValue={0}>
                <InputNumber style={{width: '100%'}} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name='summMount' label='Монтаж' initialValue={0}>
                <InputNumber style={{width: '100%'}} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name='summCosts' label='Доп.расходы' initialValue={0}>
                <InputNumber style={{width: '100%'}} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
              <FormItem name='summManufacture' label='Производство' initialValue={0}>
                <InputNumber style={{width: '100%'}} size="large" formatter={(value) => `${value} тг`}/>
              </FormItem>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                columnGap: '30px',
                rowGap: '0px',
                minHeight: '123px',
              }}>
              <FormItem name='type' label='Тип'>
                <Input style={{width: '100%'}} size="large" disabled={isReservationNonRts}/>
              </FormItem>
              <FormItem name='count' label='Кол-во' initialValue={0}>
                <InputNumber style={{width: '100%'}} size="large" disabled={isReservationNonRts}/>
              </FormItem>
              <FormItem name='agPercent' label='Процент АК'>
                <InputNumber style={{width: '100%'}}
                             size="large"
                             defaultValue={''}
                             formatter={(value) => {
                               return value === '' || value === null || value === undefined || value === 'null' ? ' %' : `${value}%`;
                             }}
                />
              </FormItem>
              <FormItem name='agSumm' label='Сумма АК'>
                <InputNumber style={{width: '100%'}}
                             size="large"
                             defaultValue={null}
                             formatter={(value) => {
                               return value === '' || value === null || value === undefined || value === 'null' ? ' тг' : `${value} тг`;
                             }}
                />
              </FormItem>
              {cityFormItem}
              <Form.Item className="editForm-item">
                <SaveButton loading={confirmLoading}/>
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
        paddingBottom: 10,
      }}
      title={
        <span
          style={{
            color: '#003360',
            fontSize: 14,
            textTransform: 'uppercase',
          }}>
          Редактирование
        </span>
      }
      placement="bottom"
      closable={true}
      onClose={() => setOpenModal(false)}
      closeIcon={<ExitIcon />}
      visible={openModal}
      maskStyle={{backgroundColor: 'transparent'}}
      key={'12qwe'}>
      <Form
        layout="inline"
        style={{
          flexDirection: block === 'hot-ptc' ? 'column' : 'row',
        }}
        onFinish={(values) => {
          setConfirmLoading(true);
          let toNumber = (val) => {
            if (val === null)
              return null;
            if (val === false || val === '')
              return 0;
            if (typeof val === 'number')
              return val;
            return parseFloat(val);
          };
          switch (block) {
            case 'extra-charge':
              const start = moment(values.period[0]).toDate();
              const end = moment(values.period[1]).toDate();
              let ak = editingItem.agencyCommission;
              let input = {
                title: values.name,
                count: values.count,
                discountPercent: values.discount,
                price: values.price,
                agencyCommission: {
                  value: values.agSumm === 'null' ? null : toNumber(values.agSumm),
                  percent: values.agPercent === 'null' ? null : toNumber(values.agPercent),
                },
                city: values.city,
                startPeriod: start,
                endPeriod: end,
              };
              if (ak) {
                switch (editingItem.category) {
                  case 'A_0':
                    input.agencyCommission.toNalog = true;
                    break;
                  case 'A_1':
                    input.agencyCommission.toMount = true;
                    break;
                  case 'A_2':
                    input.agencyCommission.toPrint = true;
                    break;
                  case 'A_3':
                    input.agencyCommission.toRent = true;
                    break;
                  case 'A_4':
                    input.agencyCommission.toAdditional = true;
                    break;
                }
              }
              updateAddCosts({
                variables: {
                  input,
                  id: editingItem.key,
                },
              })
                .then(() => {
                  setOpenModal(false);
                  form.resetFields();
                  setConfirmLoading(false);
                  message.success('Успешно изменено.');
                  refetch();
                })
                .catch((err) => {
                  setConfirmLoading(false);
                  setOpenModal(false);
                  message.error('Что-то пошло не так попробуйте ещё раз.');
                  console.log(err);
                });
              break;
            case 'hot-ptc': {
              console.log(values.agPercent, values.agSumm)
              let promise = null;
              if (editingItem.category === 'nonrtsAdditional') {
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
                    value: (values.agSumm === null || values.agSumm === 'null' ? null : toNumber(values.agSumm)),
                    percent: (values.agPercent === null || values.agPercent === 'null' ? null : toNumber(values.agPercent)),
                    toNonrts: true
                  },
                  city: values.city,
                };
                promise = updateNonRts({ variables: { input: nonRtsInput, id: editingItem.key } });
              }
              else {
                let nonRtsInput = {
                  dateFrom: editingItem.dateFrom,
                  dateTo: editingItem.dateTo,
                  count: values.count,
                  title: editingItem.code,
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
                  agencyCommissionValue: values.agSumm === 'null' ? null : toNumber(values.agSumm),
                  agencyCommissionPercent: values.agPercent === 'null' ? null : toNumber(values.agPercent),
                };
                promise = updateReservationNonRts({ variables: { ...nonRtsInput, id: editingItem.key } });
              }
              if (promise) {
                promise.then(() => {
                  setOpenModal(false);
                  form.resetFields();
                  setConfirmLoading(false);
                  message.success('Успешно изменено.');
                  refetch();
                })
                  .catch((err) => {
                    setConfirmLoading(false);
                    message.error('Что-то пошло не так попробуйте ещё раз.');
                    setOpenModal(false);
                    console.log(err);
                  });
              }
            }
              break;
          }
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
        .editBtn>div {
          display: flex !important;
          justify-content: flex-end;
        }
        .editForm-item {
          display: flex;
          flex-direction: column;
          margin-right: 0 !important;
        }
        `}
      </style>
    </Drawer>
  );
};
