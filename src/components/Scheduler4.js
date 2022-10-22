// import React from "react";

// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject,
//   EventSettingsModel, 
//   ViewDirective,
//   ViewsDirective,
//   TimelineViews,
//   TimelineMonth,
//   DragAndDrop,
//   Resize,
// } from "@syncfusion/ej2-react-schedule";
// // import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";
// import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
// import labData from "../utils/labData";
// import "../assets/scheduler.css";

// class Scheduler4 extends React.Component {
//   localData: EventSettingsModel = {
//     dataSource: [
//       {
//         shedule._id: 1,
//         name: "",
//         StartTime: new Date(2002, 10, 15, 9, 30),
//         EndTime: new Date(2022, 9, 10, 11, 0),
//         IsBlock:true,
//         IsReadonly: true,
//         IsAllDay: true,
//       },
//       {
//         shedule._id: 2,
//         name: "Full Wave Rectification",
//         StartTime: new Date(2022, 9, 23, 12, 0),
//         EndTime: new Date(2022, 9, 24, 14, 0),
//         Description: "electronics na mutima",
//         Status: "Completed",

//         // IsBlock:true,
//         // IsReadonly: true,
//       },
//       {
//         shedule._id: 3,
//         name: "Half Wave Rectification",
//         StartTime: new Date(2022, 9, 18, 0, 0),
//         EndTime: new Date(2022, 9, 21, 24, 0),
//         IsBlock: true, // block appoitment for specified time
//         // IsReadonly: true, // disables delete/edit
//         IsAllDay: true,
//       },
//       {
//         shedule._id: 4,
//         name: "Full Wave Rectification",
//         StartTime: new Date(2022, 9, 25, 22, 0),
//         EndTime: new Date(2022, 9, 25, 23, 30),
//         // IsBlock:true,
//         // IsReadonly: true,
//         // RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
//       },
//       {
//         shedule._id: 5,
//         name: "Digital electronics",
//         StartTime: new Date(2022, 9, 20, 12, 0),
//         EndTime: new Date(2022, 9, 20, 15, 30),
//         // IsBlock:true,
//         // IsReadonly: true,
//         // RecurrenceRule: "FREQ=DAILY;INTERVAL=3;COUNT=5",
//       },
//       {
//         shedule._id: 6,
//         name: "Digital electronics",
//         StartTime: new Date(2022, 9, 21, 9, 0),
//         EndTime: new Date(2022, 9, 21, 10, 30),
//         // IsBlock:true,
//         // IsReadonly: true,
        
//       },
//       {
//         shedule._id: 7,
//         name: "Digital electronics",
//         StartTime: new Date(2022, 9, 21, 12, 0),
//         EndTime: new Date(2022, 9, 21, 15, 30),
//         // IsBlock:true,
//         // IsReadonly: true,
        
//       },
//     ],
//     // labData
//   };
//   remoteData = new DataManager({
//     url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
//     adaptor: new WebApiAdaptor(),
//     crossDomain: true,
//   });

//   render() {
//     return (
//       <ScheduleComponent
//         currentView='Month'
//         eventSettings={this. fields: {
//                 Id: 'schedule._id',
//                 Subject: { name: 'name' },
//                 // IsAllDay: { name: 'FullDay' },
                
//                 Description: { name: 'description' },
//                 StartTime: { name: 'startTime' },
//                 EndTime: { name: 'endTime' },
//                 // startTimezone: { name: 'Origin' },
//                 // endTimezone: { name: 'Destination' }
//             }}
//         // eventSettings={{ dataSource: this.remoteData }}
//       >
//         <ViewsDirective>
//           <ViewDirective
//             option='Day'
//             startHour='03:00'
//             endHour='21:00'
//           ></ViewDirective>
//           {/* <ViewDirective option="Week"></ViewDirective> */}
//           <ViewDirective
//             option='Month'
//             isSelected='true'
//             showWeekNumber='true'
//           ></ViewDirective>{" "}
//           {/*loads as current view by default */}
//           <ViewDirective option='WorkWeek'></ViewDirective>
//           <ViewDirective option='Agenda'></ViewDirective>
//           <ViewDirective option='TimelineDay'></ViewDirective>
//           <ViewDirective option='TimelineMonth'></ViewDirective>
//         </ViewsDirective>
//         <Inject
//           services={[
//             Day,
//             Week,
//             WorkWeek,
//             Month,
//             Agenda,
//             TimelineViews,
//             TimelineMonth,
//             DragAndDrop,
//             Resize,
//           ]}
//         />
//       </ScheduleComponent>
//     );
//   }
// }

// export default Scheduler4;
