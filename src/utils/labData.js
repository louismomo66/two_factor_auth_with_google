const labData = [
  {
    Id: 1,
    Subject: "Half Wave Rectification",
    StartTime: new Date(2022, 10, 15, 9, 30),
    EndTime: new Date(2022, 10, 10, 11, 0),
    
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
    
    IsReadonly: true,
    // RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
  },
  {
    Id: 5,
    Subject: "Digital electronics",
    StartTime: new Date(2022, 9, 20, 12, 0),
    EndTime: new Date(2022, 9, 20, 15, 30),
    
    IsReadonly: true,
    RecurrenceRule: "FREQ=DAILY;INTERVAL=3;COUNT=5",
  },
];
let count = 0;
const startDate = new Date();
for (let index = 0; index < labData.length; index++) {
  const element = labData[index];
  element.IsBlock = true
  let date = new Date();    
  date.setDate(startDate.getDate() + count++);
  element.StartTime = date;
  element.EndTime = new Date(date.getTime()+ 30*60000)
}

export default labData;
