import React from "react";

import {
  ScheduleComponent,
  Week,
  Inject,
  ViewsDirective, ViewDirective
} from "@syncfusion/ej2-react-schedule";
// import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
// import labData from "../utils/labData";
import "../assets/scheduler.css";

class Scheduler2 extends React.Component {
  localData = {
    dataSource: [
      {
        Id: 1,
        Subject: "Half Wave Rectification",
        StartTime: new Date(2022, 10, 15, 9, 30),
        EndTime: new Date(2022, 10, 10, 11, 0),
        // IsBlock:true,
        IsReadonly: true,
        IsAllDay: true,
      },
      {
        Id: 2,
        Subject: "Full Wave Rectification",
        StartTime: new Date(2022, 9, 23, 12, 0),
        EndTime: new Date(2022, 9, 24, 14, 0),
        Description: "electronics na mutima",
        Status: "Completed",

        // IsBlock:true,
        IsReadonly: true,
      },
      {
        Id: 3,
        Subject: "Half Wave Rectification",
        StartTime: new Date(2022, 9, 18, 0, 0),
        EndTime: new Date(2022, 9, 21, 24, 0),
        IsBlock: true, // block appoitment for specified time
        IsReadonly: true, // disables delete/edit
        IsAllDay: true,
      },
      {
        Id: 4,
        Subject: "Full Wave Rectification",
        StartTime: new Date(2022, 9, 25, 22, 0),
        EndTime: new Date(2022, 9, 25, 23, 30),
        // IsBlock:true,
        IsReadonly: true,
        // RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
      },
      {
        Id: 5,
        Subject: "Digital electronics",
        StartTime: new Date(2022, 9, 20, 12, 0),
        EndTime: new Date(2022, 9, 20, 15, 30),
        // IsBlock:true,
        IsReadonly: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=3;COUNT=5",
      },
    ],
    // labData
  };
  remoteData = new DataManager({
    url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  onActionBegin(args) {
    console.log('Event args:', args)
    if (args.requestType === 'eventCreate' && args.data.length > 0) {
      let eventData = args.data[0];
      let eventField = this.scheduleObj.eventFields;
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];
      console.log("Start:", startDate, "End:", endDate)
      args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
    }
  }

  render() {
    var date = new Date()
    var yesterday = new Date(date.getTime());
    yesterday.setDate(date.getDate() - 1);
    return (
      <ScheduleComponent currentView='Week' eventSettings={this.localData} minDate={yesterday} allowMultiCellSelection={false}
        actionBegin={this.onActionBegin.bind(this)}  >
        <ViewsDirective>
          <ViewDirective option='Week' />
        </ViewsDirective>
        <Inject services={[ Week]} />
      </ScheduleComponent>
    );
  }
}

export default Scheduler2;
