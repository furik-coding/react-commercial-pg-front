import React, { useEffect, useContext } from 'react';

import { ScheduleChartView1, ganttColumns } from './StyledGanttChart';
import { gql, useQuery } from '@apollo/client';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';
import { getConstructionSideCode } from '../../../components/Logic/constructionSideCode';
import { useHistory } from 'react-router';
import { createPopover } from './tabPopover';
import { adverContext } from './AdvertisingParties';

const SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION = gql`
  query SearchConstructionSideWithReservation(
    $dateFrom: DateTime
    $dateTo: DateTime
    $family: ID
    $format: String
    $side: String
    $size: String
    $statusConnection: Boolean
    $city: ID
    $district: ID
    $reservationType: String
    $owner: String
  ) {
    searchConstructionSide(
      reservation_DateFrom_Gte: $dateFrom
      reservation_DateTo_Lte: $dateTo
      advertisingSide_Side_Format_Model_Underfamily_Family_Id: $family
      advertisingSide_Side_Format_Title_Icontains: $format
      advertisingSide_Side_Title_Icontains: $side
      advertisingSide_Side_Size_Icontains: $size
      construction_StatusConnection: $statusConnection
      construction_Location_Postcode_District_City_Id: $city
      construction_Location_Postcode_District_Id: $district
      reservation_ReservationType_Title_Iregex: $reservationType
      construction_NonrtsOwner_Title_Icontains: $owner
    ) {
      edges {
        node {
          id
          advertisingSide {
            code
            side {
              code
              format {
                code
                title
              }
            }
          }
          construction {
            statusConnection
            numInDistrict
            location {
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
          reservation {
            edges {
              node {
                id
                dateFrom
                dateTo
                reservationType {
                  title
                  id
                }
                project {
                  title
                  salesManager {
                    firstName
                    firstName
                  }
                  backOfficeManager {
                    firstName
                    lastName
                  }
                  brand {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function GanttChartAdvertisingSides({ filter, setGanttUpdater }) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  const history = useHistory();
  const { chartItems, setChartItems, resCreated, setResCreated, period, setPeriod } = useContext(adverContext);

  const ganttSettings = (year, month) => ({
    // currentTime: new Date(year, month, 2, 12, 0, 0),
    // Optionally, initialize custom theme and templates (themes.js, templates.js).
    // initializeGanttChartTheme(settings, theme);
    // initializeGanttChartTemplates(settings, theme);
    // Set up continuous schedule (24/7).
    workingWeekStart: 0, // Sunday
    workingWeekFinish: 6, // Saturday
    visibleDayStart: 0, // 00:00
    visibleDayFinish: 24 * 60 * 60 * 1000, // 24:00
    timelineStart: period.start,
    timelineFinish: period.end,
    displayedTime: new Date(2020, 4, 11),
    currentTime: new Date(2020, 4, 11),
    // Set appropriate zoom level as 24 hours are diplayed per day.
    hourWidth: 2.5,
    barCornerRadius: 6,
    daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekStartDay: 1, // Monday
    headerHeight: 26 * 2,
    barHeight: 25,
    barMargin: 10,
    itemHeight: 40,
    isRelativeToTimezone: true,
    horizontalGridLines: '#D3DFF0',
    isBaselineVisible: false,
    isTaskCompletedEffortVisible: false,
    isMouseWheelZoomEnabled: false,
    selectionMode: 'ExtendedFocus',
    headerBackground: '#FFFFFF',
    isGridVisible: true,
    gridWidth: '20%',
    chartWidth: '80%',
    itemTemplate: (item) => createPopover(item),
    isTaskToolTipVisible: false,
    // interaction: 'TouchEnabled',
    scales: [
      {
        scaleType: 'NonworkingTime',
        isHeaderVisible: false,
        isHighlightingVisible: true,
        highlightingStyle: 'stroke-width: 0; fill: #f8f8f8',
      },
      {
        scaleType: 'Weeks',
        headerStyle: 'padding: 2.25px; border-right: solid 1px #D3DFF0;',
        // headerStyle: 'padding: 2.25px; border-right: solid 1px #c8bfe7; border-bottom: solid 1px #c8bfe7',
        headerTextFormat: (item) => {
          const MONTHS = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
          ];
          let nextDate = new Date(item);
          nextDate.setDate(item.getDate() + 13);
          let monthFirst = MONTHS[item.getMonth()];
          let monthNext = MONTHS[nextDate.getMonth()];
          let monthDayFirst = item.toLocaleString('ru-RU', { day: 'numeric' });
          let monthDayNext = nextDate.toLocaleString('ru-RU', { day: 'numeric' });
          return `${monthDayFirst} ${monthFirst} ${item.getFullYear()} – ${monthDayNext} ${monthNext} ${nextDate.getFullYear()}`;
        },
      },
      {
        scaleType: 'Days',
        headerTextFormat: 'DayOfWeek',
        headerStyle: 'padding: 2.25px; border-right: solid 1px #D3DFF0',
      },
      {
        scaleType: 'CurrentTime',
        isHeaderVisible: false,
        isSeparatorVisible: true,
        separatorStyle: 'stroke: #8bbf8a; stroke-width: 0.5px',
      },
    ],
  });

  // console.log(filter);
  let dstFilter = {};
  if (filter)
    dstFilter = filter.dstFilter;
  // console.log('compfilter', dstFilter);
  let searchQuery = useQuery(SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION, { variables: dstFilter });
  let loading = searchQuery.loading;
  let error = searchQuery.error;
  let data = searchQuery.data;
  let refetch = searchQuery.refetch;

  useEffect(() => {
    if (resCreated) {
      refetch().then(() => {
        setResCreated(false);
      });
    }
  }, [resCreated]);

  // let data = null;

  let getBarClass = (barClass) => {
    // console.log(barClass);
    if (barClass === 'Свободно') return 'gantt-bar-status-free';
    if (barClass === 'Забронировано') return 'gantt-bar-status-reserved';
    if (barClass === 'Утверждено') return 'gantt-bar-status-approved';
    if (barClass === 'Продано') return 'gantt-bar-status-saled';
    if (barClass === 'unavailable') return 'gantt-bar-status-unavailable';

    return 'gantt-bar-status-reserved';
  };
  let getBarTitle = (barClass) => {
    if (barClass === 'Свободно') return 'cвободно';
    if (barClass === 'Забронировано') return 'забронировано';
    if (barClass === 'Утверждено') return 'утверждено';
    if (barClass === 'Продано') return 'продано';
    if (barClass === 'unavailable') return 'недоступно';
    return 'забронировано';
  };
  let mapDate = (item) => {
    let date = Date.parse(item);
    let ndate = new Date();
    ndate.setTime(date);
    return ndate;
  };

  useEffect(() => {
    // console.log(data);
    if (data && data.searchConstructionSide) {
      let scheduleChartItems = [];
      for (let item of data.searchConstructionSide.edges) {
        if (item.node.advertisingSide)
          scheduleChartItems.push({
            content: item.node.id,
            start: new Date(2020, 1, 1, 0, 0, 0),
            code: getConstructionSideCode(item.node),
            format: item.node.advertisingSide.side.format.title,
            city:
              item.node.construction &&
              item.node.construction.location &&
              item.node.construction.location.postcode.district.city.title,
            // isSelected - свойство сообщающее, выбран элемент или нет
            ganttChartItems:
              item.node.reservation &&
              item.node.reservation.edges.map((reservation) => ({
                content: reservation.node.id,
                start: mapDate(reservation.node.dateFrom),
                finish: mapDate(reservation.node.dateTo),
                barClass: getBarClass(reservation.node.reservationType.title),
                textValue:
                  reservation.node.project.brand.title + ' - ' + getBarTitle(reservation.node.reservationType.title),
                history: history,
              })),
          });
      }
      setChartItems(scheduleChartItems);
    }
  }, [data]);

  if (loading || resCreated) return <LoadingAntd />;

  if (error) return <h3>Error (:</h3>;

  // console.log('len', chartItems.length)

  return (
    <>
      {/*<Tab cond={'sold'}/>*/}
      <ScheduleChartView1
        items={chartItems}
        settings={ganttSettings(year, month)}
        columns={ganttColumns}
        setGanttUpdater={setGanttUpdater}
      />
    </>
  );
}
