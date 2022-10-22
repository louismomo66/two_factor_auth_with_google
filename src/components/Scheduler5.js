import React from "react";

import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  EventSettingsModel,
  ViewDirective,
  ViewsDirective,
  TimelineViews,
  TimelineMonth,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
// import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import labData from "../utils/labData";
import "../assets/scheduler.css";
import "../assets/customScheduler.css";

class Scheduler5 extends React.Component {
  localData = [
      {
        Id: 1,
        Subject: "Half Wave Rectification",
        StartTime: new Date(2022, 10, 15, 9, 30),
        EndTime: new Date(2022, 10, 15, 11, 0),
        // IsBlock:true,
        // IsReadonly: true,
        IsAllDay: true,
      },
      {
        Id: 2,
        Subject: "Full Wave Rectification",
        StartTime: new Date(2022, 9, 23, 12, 0),
        EndTime: new Date(2022, 9, 23, 14, 0),
        Description: "electronics na mutima",
        Status: "Completed",

        // IsBlock:true,
        // IsReadonly: true,
      },
      {
        Id: 3,
        Subject: "Half Wave Rectification",
        StartTime: new Date(2022, 9, 24, 0, 0),
        EndTime: new Date(2022, 9, 24, 24, 0),
        // IsBlock: true, // block appoitment for specified time
        // IsReadonly: true, // disables delete/edit
        IsAllDay: true,
      },
      {
        Id: 4,
        Subject: "Full Wave Rectification",
        StartTime: new Date(2022, 9, 25, 22, 0),
        EndTime: new Date(2022, 9, 25, 22, 30),
        // IsBlock:true,
        // IsReadonly: true,
        // RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
      },
      {
        Id: 5,
        Subject: "Digital electronics",
        StartTime: new Date(2022, 9, 20, 12, 0),
        EndTime: new Date(2022, 9, 20, 15, 30),
        // IsBlock:true,
        // IsReadonly: true,
        // RecurrenceRule: "FREQ=DAILY;INTERVAL=3;COUNT=5",
      },
      {
        Id: 6,
        Subject: "Digital electronics",
        StartTime: new Date(2022, 9, 21, 9, 0),
        EndTime: new Date(2022, 9, 21, 10, 30),
        // IsBlock:true,
        // IsReadonly: true,
      },
      {
        Id: 7,
        Subject: "Digital electronics",
        StartTime: new Date(2022, 9, 21, 12, 0),
        EndTime: new Date(2022, 9, 21, 15, 30),
        // IsBlock:true,
        // IsReadonly: true,
      },
    ]
    // labData
  
  remoteData = new DataManager({
    url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });
  eventTemplate(props: { [key: string]: Object }): JSX.Element {
    return (<div className='template-wrap'>{props.Subject}</div>);
  }

  render() {
    return (
      <ScheduleComponent
        currentView='Month'
        eventSettings={{
          dataSource: this.localData,
          template: this.eventTemplate.bind(this),
        }}
        // eventSettings={{ dataSource: this.remoteData }}
      >
        <ViewsDirective>
          <ViewDirective option='Day'></ViewDirective>
          <ViewDirective
            option='Month'
            isSelected='true'
            showWeekNumber='true'
          ></ViewDirective>{" "}
          <ViewDirective option='Week'></ViewDirective>
          {/* <ViewDirective option='WorkWeek'></ViewDirective> */}
          <ViewDirective option='Agenda'></ViewDirective>
          <ViewDirective option='TimelineDay'></ViewDirective>
          <ViewDirective option='TimelineMonth'></ViewDirective>
        </ViewsDirective>
        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            Agenda,
            TimelineViews,
            TimelineMonth,
          ]}
        />
      </ScheduleComponent>
    );
  }
}

export default Scheduler5;
