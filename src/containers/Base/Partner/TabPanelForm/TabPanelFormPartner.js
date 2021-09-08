import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

import { partnerContext } from '../Partner';
import { Input, message } from 'antd';
import PartnerInfo from '../../../../components/Panels/Partners/PartnerInfo/PartnerInfo';
import RelatedProjects from '../../../../components/Panels/Partners/RelatedProjects/RelatedProjects';
import RelatedBrands from '../../../../components/Panels/Partners/RelatedBrands/RelatedBrands';
import RelatedAdvertisers from '../../../../components/Panels/Partners/RelatedAdvertisers/RelatedAdvertisers';

import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar, ToolbarControl } from '../../../../components/Styles/ControlToolbarStyle';
import { BtnExport, BtnPrint, BtnSettings } from '../../../../components/Styles/ButtonStyles';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';

import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../../components/Styles/DesignList/styles';

import print_icon from '../../../../img/outdoor_furniture/table_icons/print.svg';
import export_icon from '../../../../img/outdoor_furniture/table_icons/export_icon.svg';
import settings_icon from '../../../../img/outdoor_furniture/table_icons/setting.svg';
import searchInputIcon from '../../../../img/header-bar/search-icon.svg';
STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';
STabPanel.tabsRole = 'TabPanel';

const tabs = [
  {
    value: 'Общая информация',
  },
  {
    value: 'Связанные проекты',
  },
  {
    value: 'Связанные бренды',
  },
  {
    value: 'Связанные рекламодатели',
  },
];

const panel1 = <PartnerInfo />;
const panel2 = <RelatedProjects />;
const panel3 = <RelatedBrands />;
const panel4 = <RelatedAdvertisers />;

const PARTNER_DELETE = gql`
  mutation Delete($id: ID!) {
    deletePartner(id: $id) {
      deletedId
    }
  }
`;

const PARTNER_UPDATE = gql`
  mutation(
    $id: ID!
    $title: String
    $comment: String
    $workingSectors: [ID]
    $partnerType: ID
    $clientType: ID
    $binNumber: String
    $legalAddressPostcode: ID
    $district: ID
    $legalAddress: ID
    $actualAddress: ID
    $bankRecipient: String
    $iik: String
    $bik: String
    $kbe: String
    $agencyCommission: UpdateAgencyCommissionInput
  ) {
    updatePartner(
      id: $id
      input: {
        title: $title
        comment: $comment
        workingSectorsAdd: $workingSectors
        binNumber: $binNumber
        partnerType: $partnerType
        clientType: $clientType
        district: $district
        legalAddress: $legalAddress
        actualAddress: $actualAddress
        legalAddressPostcode: $legalAddressPostcode
        bankRecipient: $bankRecipient
        iik: $iik
        bik: $bik
        kbe: $kbe
        agencyCommission: $agencyCommission
      }
    ) {
      partner {
        id
      }
    }
  }
`;

export default function TabPaneForm(props) {
  const [item, , commissionForm] = useContext(partnerContext);
  const [block, setBlock] = useState(0);
  const history = useHistory();
  const checkService = (arr, service) => arr.includes(service);

  const [updatePartner] = useMutation(PARTNER_UPDATE);
  const [deleteConstruction] = useMutation(PARTNER_DELETE);
  const Update = (e) => {
    e.preventDefault();
    const commision = commissionForm.getFieldsValue();
    updatePartner({
      variables: {
        ...item,
        workingSectors: item.workingSectors.edges.length ? [item.workingSectors.edges[0].node.id] : [], // TODO: workingSectors - это массив
        partnerType: item.partnerType && item.partnerType.id,
        clientType: item.clientType && item.clientType.id,

        district:
          item.legalAddressPostcode && item.legalAddressPostcode.district && item.legalAddressPostcode.district.id,
        legalAddressPostcode: item.legalAddressPostcode && item.legalAddressPostcode.id,
        actualAddress: item.actualAddress && item.actualAddress.id,
        legalAddress: item.legalAddress && item.legalAddress.id,
        isAgencyCommissionWithNds: commision.nds === 'nds' ? true : false,
        agencyCommission: {
          percent: commision.type === 'percent' ? commision.value : null,
          value: commision.type === 'summ' ? commision.value : null,
          toNalog: commision.services && checkService(commision.services, 'tax'),
          toPrint: commision.services && checkService(commision.services, 'print'),
          toMount: commision.services && checkService(commision.services, 'mount'),
          toRent: commision.services && checkService(commision.services, 'rent'),
          toAdditional: commision.services && checkService(commision.services, 'addCosts'),
          toNonrts: commision.services && checkService(commision.services, 'nonRts'),
        },
      },
    })
      .then(() => message.success('Успешно сохранено.'))
      .catch(() => message.error('Что-то пошло не так попробуйте ещё раз.'));
  };
  const Delete = () => {
    deleteConstruction({ variables: { id: item.id } });
    history.push(`/base/partners`);
    history.go(0);
  };

  const addBrand = (e) => {
    e.preventDefault();

    history.push(`/base/partners/partner/${item.id}/brands`);
    history.go(0);
  };
  const addAdvertisers = (e) => {
    e.preventDefault();

    history.push(`/base/partners/partner/${item.id}/advertisers`);
    history.go(0);
  };

  const btnAddSome = () => {
    switch (block) {
      case 1:
        return <StyledButton backgroundColor="#2c5de5">Добавить проект</StyledButton>;
      case 2:
        return (
          <StyledButton backgroundColor="#2c5de5" type="button" onClick={addBrand}>
            Привязать бренд
          </StyledButton>
        );
      case 3:
        return (
          <StyledButton backgroundColor="#2c5de5" type="button" onClick={addAdvertisers}>
            Добавить контрагента
          </StyledButton>
        );
      default:
        return;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Контрагент - {item.title}</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          {btnAddSome()}
          <StyledButton backgroundColor="#008556" onClick={Update}>
            Сохранить
          </StyledButton>
          <StyledButton backgroundColor="#d42d11" onClick={Delete}>
            Удалить
          </StyledButton>
          {/* <StyledButton backgroundColor="#2c5de5">Создать договор</StyledButton> */}
        </ButtonGroup>
      </HeaderWrapper>
      <div>
        <STabs selectedTabClassName="is-selected" selectedTabPanelClassName="is-selected">
          <ControlToolbar position="static">
            <STabList>
              {tabs.map((tab, index) => (
                <STab
                  key={index}
                  onClick={() => {
                    setBlock(index);
                  }}>
                  {tab.value}
                </STab>
              ))}
            </STabList>

            <ToolbarControl>
              {block == 1 && (
                <Input
                  style={{ marginLeft: '20px', overflowX: 'hidden', minWidth: '35px' }}
                  placeholder="Быстрый поиск"
                  suffix="Найти"
                  prefix={<img src={searchInputIcon} alt="search" />}
                />
              )}

              <BtnPrint>
                <img src={print_icon} alt="print" />
              </BtnPrint>
              <BtnExport>
                <img src={export_icon} alt="" />
                Экспорт
              </BtnExport>
              <BtnSettings>
                <img src={settings_icon} alt="" />
              </BtnSettings>
            </ToolbarControl>
          </ControlToolbar>
          <STabPanel>{panel1}</STabPanel>
          <STabPanel>{panel2}</STabPanel>
          <STabPanel>{panel3}</STabPanel>
          <STabPanel>{panel4}</STabPanel>
        </STabs>
      </div>
    </div>
  );
}
