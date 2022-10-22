import { useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  // EventSettingsModel
} from "@syncfusion/ej2-react-schedule";
const dataArray = [
  {
    Id: 1,
    Subject: "Half Wave Rectification",
    StartTime: new Date(2022, 10, 15, 9, 30),
    EndTime: new Date(2022, 10, 10, 11, 0),
  },
  {
    Id: 2,
    Subject: "Full Wave Rectification",
    StartTime: new Date(2022, 9, 12, 12, 0),
    EndTime: new Date(2022, 9, 12, 14, 0),
  },
  {
    Id: 3,
    Subject: "Half Wave Rectification",
    StartTime: new Date(2022, 9, 13, 9, 30),
    EndTime: new Date(2022, 9, 13, 11, 0),
  },
  {
    Id: 4,
    Subject: "Full Wave Rectification",
    StartTime: new Date(2022, 9, 18, 22, 0),
    EndTime: new Date(2022, 9, 18, 23, 30),
  },
];
const Scheduler3 = (props) => {
  //   const [info, setInfo] = useState([]);
  const [data, setData] = useState(dataArray);

  return (
    <ScheduleComponent currentView='Week' eventSettings={{ dataSource: data }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};
export default Scheduler3;
