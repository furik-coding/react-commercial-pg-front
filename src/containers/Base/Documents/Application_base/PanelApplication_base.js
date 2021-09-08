import React from 'react';
import Table from '../../../../components/Tablea/Tablea';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../components/Styles/StyledBlocks';
import InputAnchor from '../../../../components/Inputs/InputAnchor';
import DatePicker from '../../../../components/Inputs/DatePicker';

const PanelDesign = () => {
  const columns = [
    {
      title: 'Код договора',
      dataIndex: 'code',

      width: 130,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',

      width: 100,
    },
    {
      title: 'Сектор деятельности',
      dataIndex: 'sector',
      width: 100,
    },
    {
      title: 'Создано',
      dataIndex: 'create',
      width: 100,
    },
    {
      title: 'Создатель',
      dataIndex: 'creator',
      width: 100,
    },
    {
      title: 'Приложение',
      dataIndex: 'application',
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 2,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 3,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 4,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 5,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
  ];

  return (
    <>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <Medium>
          <BlockTitle>Редактирование информации</BlockTitle>
          <BlockBody>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Наименование контрагента</InputTitle>
                <InputAnchor placeholder="Наименование контрагента" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Дата заключения</InputTitle>
                <DatePicker value={new Date()} />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Начало действия</InputTitle>
                <DatePicker value={new Date()} />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Окончание действия</InputTitle>
                <DatePicker value={new Date()} />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Создатель</InputTitle>
                <InputAnchor placeholder="Создатель" />
              </div>
              <div style={{ margin: '0 0 0 ц0.75vw' }}>
                <InputTitle>Инициатор</InputTitle>
                <InputAnchor placeholder="Инициатор" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Тип договора</InputTitle>
                <InputAnchor placeholder="Тип договора" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Срок оплаты</InputTitle>
                <InputAnchor placeholder="Срок оплаты" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Подписант в именительном падеже</InputTitle>
                <InputAnchor placeholder="Подписант в именительном падеже" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Подписант в родительном падеже</InputTitle>
                <InputAnchor placeholder="Подписант в родительном падеже" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>На основании какого документа действует подписант?</InputTitle>
                <InputAnchor placeholder="Документ" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Статус возврата</InputTitle>
                <InputAnchor placeholder="Нет" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Документы</InputTitle>
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Комментарий</InputTitle>
                <InputAnchor placeholder="Комментарий" />
              </div>
            </Row>
          </BlockBody>
        </Medium>
      </div>
      <div style={{ display: 'flex', overflowX: 'hidden', width: '100%' }}>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data} />
        </div>
        <style>
          {`.outdoor-table-bar {
            width: 100%;
          }
          `}
        </style>
      </div>
    </>
  );
};

export default PanelDesign;
