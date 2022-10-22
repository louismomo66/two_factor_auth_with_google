import React from "react";

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
import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";
import "../assets/scheduler.css";

class Scheduler2 extends React.Component {
  constructor() {
    super(...arguments);
    this.data = [
      {
        Id: 1,
        Subject: "Explosion of Betelgeuse Star",
        StartTime: new Date(2022, 10, 15, 9, 30),
        EndTime: new Date(2022, 1, 10, 11, 0),
      },
      {
        Id: 2,
        Subject: "Thule Air Crash Report",
        StartTime: new Date(2022, 9, 12, 12, 0),
        EndTime: new Date(2022, 9, 12, 14, 0),
      },
      {
        Id: 3,
        Subject: "Blue Moon Eclipse",
        StartTime: new Date(2022, 9, 13, 9, 30),
        EndTime: new Date(2022, 9, 13, 11, 0),
      },
      {
        Id: 4,
        Subject: "Meteor Showers in 2022",
        StartTime: new Date(2022, 9, 18, 22, 0),
        EndTime: new Date(2022, 9, 18, 23, 30),
      },
    ];
  }
  render() {
    return (
      <ScheduleComponent
        currentView='Month'
        eventSettings={{ dataSource: this.data }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  }
}

export default Scheduler2;
