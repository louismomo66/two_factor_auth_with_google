import React from "react";

import {
  ScheduleComponent,
  Week,
  Inject,
  ViewsDirective, ViewDirective
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
// import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import labData from "../utils/labData";
import "../assets/scheduler.css";

class Scheduler2 extends React.Component {
  constructor() {
    super(...arguments);
    this.data = extend([],labData,null,true);
  }
  onEventRendered(args) {
    if (args.data.EndTime < this.scheduleObj.selectedDate) {
      args.element.classList.add("e-past-app");
    }
  }
  remoteData = new DataManager({
    url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  onActionBegin(args) {
    console.log("Event args:", args);
    if (args.requestType === "eventCreate" && args.data.length > 0) {
      let eventData = args.data[0];
      let eventField = this.scheduleObj.eventFields;
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];
      console.log("Start:", startDate, "End:", endDate);
      args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
    }
  }

  render() {
    var date = new Date();
    var yesterday = new Date(date.getTime());
    yesterday.setDate(date.getDate() - 1);
    let maxdate = new Date(date.getTime());
    maxdate.setDate(date.getDate() + 7);
    return (
      <ScheduleComponent
        currentView='Week'
        eventSettings={{ dataSource: this.data }}
        minDate={yesterday}
        maxDate={maxdate}
        allowMultiCellSelection={false}
        actionBegin={this.onActionBegin.bind(this)}
        ref={(schedule) => (this.scheduleObj = schedule)}
        eventRendered={this.onEventRendered.bind(this)}
      >
        <ViewsDirective>
          <ViewDirective option='Week' />
        </ViewsDirective>
        <Inject services={[Week]} />
      </ScheduleComponent>
    );
  }
}

export default Scheduler2;
