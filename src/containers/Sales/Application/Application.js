import React from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { Input } from 'antd';
import PanelDesign from './PanelApplication';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { ReservationSlider } from './BottomSlider'
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { routes } from '../../../routes';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';
import { QUERY_ATTACHMENT } from './attachmentQuery';
// ICONS
import dollarIcon from '../../../img/dollar.svg';
import collapseIcon from '../../../img/collapse-icon.svg';
import personIcon from '../../../img/person.svg';
import paperIcon from '../../../img/paper.svg';

import { fmtPrice, fmtPrice0, fmtPeriod, fmtPriceNum0 } from '../Estimate/utils/utils';

let trDate = (v) => v ? new Date(v).toLocaleDateString() : '';

let getSliderCountData = (estimateItogs) => {
  return {
    info: [
      { title: 'Номер договора', data: estimateItogs?.attachment?.contract?.serialNumber, },
      { title: 'Номер приложения', data: estimateItogs?.attachment?.code },
      { title: 'Реквизиты',
        data: 'БИН: ' + estimateItogs?.attachment?.project?.client?.binNumber || ''
           + ' БИК: ' + estimateItogs?.attachment?.project?.client?.bik || '' },
      { title: 'Дата договора', data: trDate(estimateItogs?.attachment?.contract?.registrationDate) }
    ],
    count: [
      { title: "Налог", data: fmtPriceNum0(estimateItogs?.nalogAfterDiscount) },
      { title: "Аренда со скидкой", data: fmtPriceNum0(estimateItogs?.rentToClentDiscounted) },
      { title: "Доп. расходы", data: fmtPriceNum0(estimateItogs?.staticAdditional) },
      { title: "Монтаж", data: fmtPriceNum0(estimateItogs?.staticMounting) },
      { title: "Печать", data: fmtPriceNum0(estimateItogs?.staticPrinting) }
    ]
  }

}

const Application = () => {
  const history = useHistory();
  const { appId } = useParams();
  const sliderState = new SliderState({name: "", key: ""})

  const { loading, error, data } = useQuery(QUERY_ATTACHMENT, {variables: {attachmentId: appId }});
  if (error)
    return <h3>Error (:</h3>

  let mappedData = {};

  console.log('[data]', data)

  let sliderCountData = getSliderCountData(null);
  let estimateItogs = null;

  if (!loading && data) {
    estimateItogs = data?.searchSalesEstimateItogs?.edges.length ? data.searchSalesEstimateItogs.edges[0]?.node : null;
    mappedData = {
      code: estimateItogs?.code || '',
      createdDate: trDate(estimateItogs?.attachment?.createdDate),
      startedDate: trDate(estimateItogs?.attachment?.periodStartDate),
      endDate: trDate(estimateItogs?.attachment?.periodEndDate),
      contractCode: estimateItogs?.attachment?.contract?.code || '',
      contractDate: trDate(estimateItogs?.attachment?.contract?.registrationDate),
      contractPaymentDate: trDate(estimateItogs?.attachment?.contract?.paymentDate),
      signatoryOne: estimateItogs?.attachment?.signatoryOne || '',
      smetaSummary: fmtPrice0(estimateItogs?.summaryEstimateValue),
      addressProgramm: estimateItogs?.addressProgramm?.edges.map((item) => {
        return {
          key: item.node.id,
          format: item.node.formatTitle,
          city: item.node.cityTitle,
          period: fmtPeriod(item.node.dateFrom, item.node.dateTo),
          renta: fmtPrice0((item.node.rent || 0) - (item.node.discountClientValue || 0)),
          print: fmtPrice0(item.node.printing),
          install: fmtPrice0(item.node.mounting),
          addexpense: fmtPrice0(item.node.additional),
          nalog: fmtPrice0((item.node.nalog || 0) - (item.node.nalogDiscountValue || 0)),
          amount: fmtPrice0(item.node.itogSummary),
        };
      }) || [],
    };
    sliderCountData = getSliderCountData(estimateItogs);
  }



  const links = [
    { id: routes.root.root.path, value: 'Главная' },
    { id: routes.sales.root.path, value: 'Продажи' },
    { id: routes.sales.com_projects.path, value: 'Проекты' },
    { id: routes.sales.project_card.url(estimateItogs?.attachment?.project?.id || ''), value: 'Проект' },
    { id: routes.sales.application.url(appId), value: 'Приложение' },
  ];

  return (
    !loading && (
      <div style={{ display: 'flex', height: '100%' }}>
        <LeftBar className="left-bar">
          <SearchBtn />
          <CreateBtn text="Создать новое" />
          <PackageBtn text="Изменить текущее" />
          <BoxBtn text="Архив дизайнов" />
        </LeftBar>
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            margin: '0 2vw 0 0',
          }}>
          <BreadCrumbs links={links} fromRoot={true} />
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Приложение №{mappedData.code} - CocaCola</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton
                backgroundColor="#008556"
                onClick={() => { sliderState.setAddShowed(true); }}>
                Выставить счет
              </StyledButton>
              <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              <StyledButton
                backgroundColor="#2C5DE5"
                onClick={() => history.push(routes.sales.application_estimate.url(appId))}

              >Смета приложения</StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex' }}>
            <InfoList>
              <InfoItem>
                <InfoTitle>
                  <img src={collapseIcon} alt="collapse icon" />
                  <span>Информация о приложении</span>
                </InfoTitle>
                <InfoLine>
                  <span>Дата создания:</span>
                  <InfoValue>{mappedData.createdDate}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Дата начала:</span>
                  <InfoValue>{mappedData.startedDate}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Дата окончания:</span>
                  <InfoValue>{mappedData.endDate}</InfoValue>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>
                  <img src={paperIcon} alt="paper icon" />
                  <span>Информация о договоре</span>
                </InfoTitle>
                <InfoLine>
                  <span>Номер:</span>
                  <InfoValue>№{mappedData.contractCode}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Подписан:</span>
                  <InfoValue>{mappedData.contractDate}</InfoValue>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>
                  <img src={personIcon} alt="person icon" />
                  <span>Информация о подписанте</span>
                </InfoTitle>

                <InfoLine>
                  <span>ФИО:</span>
                  <InfoValue>{mappedData.signatoryOne}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Должность:</span>
                  <InfoValue>Директор</InfoValue>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>
                  <img src={dollarIcon} alt="dollar icon" />
                  <span>Оплата</span>
                </InfoTitle>

                <InfoLine>
                  <span>Срок оплаты:</span>
                  <InfoValue>{mappedData.contractPaymentDate}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Стоимость:</span>
                  <InfoValue>{mappedData.smetaSummary}</InfoValue>
                </InfoLine>
              </InfoItem>
            </InfoList>
            <PanelDesign style={{ flex: '0 1 auto' }} tableData={mappedData.addressProgramm} loading={loading}/>
          </div>
        </div>

        <style>
          {`
          .left-bar {
            margin: 0 2vw 0 0;
          }

        `}
        </style>
        { sliderState.addShowed && <ReservationSlider sliderState={sliderState} dataCount={sliderCountData} />}
      </div>
    )
  );
};

export default Application;
const InfoList = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  height: 100%;
  padding: 1.5%;
  flex: 0 1 auto;
  margin: 0 2vw 0 0;
  max-width: 370px;
  box-sizing: border-box;
  width: 40vw;
`;
const InfoItem = styled.li`
  margin: 4% 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d3dff0;
`;
const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const InfoLine = styled.div`
  margin: 4% 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;
const InfoValue = styled.span`
  font-weight: 600;
  text-align: right;
`;
const InfoInput = styled(Input)`
  font-weight: 600;

  margin-left: auto;
  width: 150px;
`;
