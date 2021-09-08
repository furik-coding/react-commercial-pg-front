import React, { useEffect, useRef } from 'react';
import './styles_adv_part.scss';
import { ScheduleChartView } from './GanttChart/DlhGanttChart';


export const ScheduleChartView1 = function ({ style, items, settings, change, columns, setGanttUpdater }) {
  // let [state, setState] = useState([]);
  // let [ganttUpdaterIsSetted, setGanttUpdaterIsSetted] = useState(false);

  // useEffect(() => {
  //   if (!ganttUpdaterIsSetted) {
  //     setGanttUpdater(setState);
  //     setGanttUpdaterIsSetted(true);
  //   }
  // }, [ganttUpdaterIsSetted, setGanttUpdater]);



  let ref = useRef(null);
  if (!ref) ref = React.createRef();
  let changeHandler = settings.itemPropertyChangeHandler;
  let dl_columns = ScheduleChartView.getDefaultColumns(items, settings);
  let copied_settings = { ...settings };
  if (columns) {
    for (let col of columns) {
      dl_columns.push(col);
    }
    copied_settings.columns = dl_columns;
  }

  useEffect(function () {
    if (ref.current && items) {
      ScheduleChartView.initialize(ref.current, items, copied_settings);
      if (change) {
        settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
          if (changeHandler) changeHandler(item, propertyName, isDirect, isFinal);
          change(item, propertyName, isDirect, isFinal);
        };
      }
    }
  });

  return <div ref={ref} style={style}></div>;
};

export const ganttColumns = [
  {
    header: 'Код',
    width: 200,
    cellTemplate: (item) => item.scheduleChartView.ownerDocument.createTextNode(item.code),
  },
  {
    header: 'Формат',
    width: 200,
    cellTemplate: (item) => item.scheduleChartView.ownerDocument.createTextNode(item.format),
  },
  {
    header: 'Город',
    width: 130,
    cellTemplate: (item) => item.scheduleChartView.ownerDocument.createTextNode(item.city),
  },
];
