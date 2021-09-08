import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import dateFormat from 'dateformat';
import { gql, useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';

import SearchBtn from '../../../components/LeftBar/SearchBtn';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import SidebarInfo from '../../../components/SidebarInfo';

import { PanelProjectCard } from './PanelProject_card';
import { getConstructionSideCode } from '../../../components/Logic/constructionSideCode';
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { ReservationSlider } from './BottomSlider';

import collapseIcon from '../../../img/collapse-icon.svg';
import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';
import { routes } from '../../../routes';

const PROJECT_QUERY = gql`
  query($id: ID!) {
    searchProject(id: $id) {
      edges {
        node {
          id
          title
          code
          createdAt
          title
          creator {
            id
            firstName
            lastName
            lastLogin
          }
          client {
          title
          id
        }
        agency {
          title
        }
          comment
          brand {
            title
            workingSector {
              title
            }
          }
          salesManager {
            firstName
            lastName
          }
          backOfficeManager {
            firstName
            lastName
          }
          agencyCommission {
            value
            percent
          }
          projectAttachments {
            edges {
              node {
                id
                code
                createdDate
                periodStartDate
                periodEndDate
                returnStatus
              }
            }
          }
          reservations {
            edges {
              node {
                id
                dateFrom
                dateTo
                branding
                constructionSide {
                  package {
                    title
                  }
                  advertisingSide {
                    code
                    title
                    side {
                      title
                      code
                      format {
                        code
                        title
                      }
                    }
                  }
                  construction {
                    numInDistrict
                    statusConnection
                    location {
                      marketingAddress {
                        address
                      }
                      postcode {
                        title
                        district {
                          city {
                            title
                          }
                        }
                      }
                    }
                  }
                }
                reservationType {
                  title
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Project_card = (props) => {
  const sliderState = new SliderState({ name: '', key: '' });

  const history = useHistory();
  const { id } = useParams();
  const [block, setBlock] = useState(0);

  const { loading, error, data } = useQuery(PROJECT_QUERY, { variables: { id: id } });
  if (error) return <h3>Error (:</h3>;

  let dataItem = data ? data.searchProject.edges[0].node : null;

  let sideBarResData = dataItem
    ? [
        {
          id: 1,
          title: 'О проекте',
          icon: collapseIcon,
          isShowed: true,
          sumBlock: false,
          content: [
            {
              title: 'Код проекта:',
              value: '#' + dataItem.code,
            },
            {
              title: 'Менеджер бэк-офиса:',
              value: dataItem.backOfficeManager.firstName + ' ' + dataItem.backOfficeManager.lastName,
            },
            {
              title: 'Менеджер по продажам:',
              value: dataItem.salesManager.firstName + ' ' + dataItem.salesManager.lastName,
            },
          ],
        },
        {
          id: 2,
          title: 'Информация о бренде',
          icon: collapseIcon,
          isShowed: true,
          sumBlock: false,
          content: [
            {
              title: 'Бренд:',
              value: dataItem.brand.title,
            },
            {
              title: dataItem.brand.workingSector ? 'Сектор деятельности:' : '',
              value: dataItem.brand.workingSector ? dataItem.brand.workingSector.title : '',
            },
          ],
        },
        {
          id: 3,
          title: 'Доп. инфо',
          icon: collapseIcon,
          isShowed: true,
          sumBlock: false,
          content: [
            {
              title: 'Рекламодатель:',
              value: (dataItem.client && dataItem.client.title) || '-',
            },
            {
              title: 'Рекламное агентство:',
              value: (dataItem.agency && dataItem.agency.title) || '',
            },
            {
              title: 'Брендинг',
              value: '9 999 тг.',
            },
            {
              title: dataItem.agencyCommission ? 'Агентская комиссия::' : '',
              value: dataItem.agencyCommission
                ? dataItem.agencyCommission.value
                  ? dataItem.agencyCommission.value
                  : dataItem.agencyCommission.percent
                : '',
            },
          ],
        },
        {
          id: 4,
          title: 'Комментарий к проекту',
          icon: collapseIcon,
          isShowed: true,
          sumBlock: false,
          content: [
            {
              title: dataItem.comment,
            },
          ],
        },
      ]
    : null;

  let panelDataAttachments =
    (dataItem &&
      dataItem.projectAttachments &&
      dataItem.projectAttachments.edges.map((item) => ({
        id: item.node.id,
        key: item.node.id,
        attachment_code: '#' + item.node.code,
        attachment_summa: '', // item.node.additionalCosts.edges[0].node.summa, TODO:
        attachment_createDate: dateFormat(item.node.createdDate, 'dd.mm.yyyy'),
        attachment_reservDates: `${dateFormat(item.node.periodStartDate, 'dd.mm.yyyy')} – ${dateFormat(
          item.node.periodEndDate,
          'dd.mm.yyyy',
        )}`,
        dateForRouter: [item.node.dateFrom, item.node.dateTo],
      }))) ||
    [];

  let panelReservations =
    (dataItem &&
      dataItem.reservations &&
      dataItem.reservations.edges.map((item) => ({
        id: item.node.id,
        key: item.node.id,
        reservation_code: getConstructionSideCode(item.node.constructionSide),
        reservation_city: item.node.constructionSide
          ? item.node.constructionSide.construction.location.postcode.district.city.title
          : '',
        reservation_address:
          (item.node.constructionSide &&
            item.node.constructionSide.construction.location.marketingAddress &&
            item.node.constructionSide.construction.location.marketingAddress.address) ||
          '',
        reservation_format: item.node.constructionSide
          ? item.node.constructionSide.advertisingSide.side.format.title
          : '',
        reservation_side: item.node.constructionSide ? item.node.constructionSide.advertisingSide.title : '',
        reservation_startDate: dateFormat(item.node.dateFrom, 'dd.mm.yyyy'),
        reservation_expirationDate: dateFormat(item.node.dateTo, 'dd.mm.yyyy'),
        reservation_status: item.node.reservationType.title,
        reservation_lighting:
          (item.node.constructionSide && item.node.constructionSide.statusConnection && 'Да') || 'Нет',
        reservation_package:
          (item.node.constructionSide &&
            item.node.constructionSide.package &&
            item.node.constructionSide.package.title) ||
          '',
      }))) ||
    [];

  let panelData = {
    attachments: panelDataAttachments,
    reservations: panelReservations,
  };

  const links = [
    { id: routes.root.root.path, value: 'Главная' },
    { id: routes.sales.root.path, value: 'Продажи' },
    { id: routes.sales.com_projects.path, value: 'Проекты' },
    { id: routes.sales.project_card.url(id), value: 'Проект' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
        <CreateBtn text="Добавить бронь" onClick={() => history.push(routes.sales.advertising_parties.path)} />
        <PackageBtn text="Добавить пакет" onClick={() => history.push(routes.sales.batch_placement.path)} />
        <EditBtn text="Перейти в монтажи" onClick={() => history.push(routes.installations.projects.path)} />
        <PaperBtn text="Сводка проекта" />
        <BoxBtn text="Архив дизайнов" />
      </LeftBar>

      <div style={{ width: '100%', overflowX: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} fromRoot={true} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>{'Проект ' + (dataItem && dataItem.title) || 'без имени'}</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            <StyledButton
              backgroundColor="#D42D11"
              onClick={() => {
                history.push(routes.sales.summary.url(id));
              }}>
              Формирование сводки проекта
            </StyledButton>
            <StyledButton
              backgroundColor="#2C5DE5"
              onClick={() => {
                history.push('/sales/application');
              }}>
              Создать приложение
            </StyledButton>
            <StyledButton
              backgroundColor="#2C5DE5"
              onClick={() => {
                history.push(routes.sales.project_estimate.url(id));
              }}>
              Смета проекта
            </StyledButton>
          </ButtonGroup>
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 30 }}>
            <SidebarInfo data={sideBarResData} />
          </div>
          {panelData !== null && (
            <PanelProjectCard
              style={{ flex: '0 1 auto' }}
              sliderState={sliderState}
              choosedBlock={block}
              loading={loading}
              setBlock={setBlock}
              panelData={panelData}
            />
          )}
        </div>
      </div>
      {sliderState.addShowed && (
        <ReservationSlider
          sliderState={sliderState}
          data={panelData}
          reserveCode={props.history.location.state.reserveId}
        />
      )}
      {/* {block === 0 ? null : <FilterBar />} */}
      <style>
        {`
          .left-bar {
            margin: 0 2vw 0 0;
          }
        `}
      </style>
    </div>
  );
};

export default Project_card;
