// Your code here
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => createEmployeeRecord(employee));
  }
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
  }
  function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(timeIn => timeIn.date);
    const allWages = allDates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return allWages;
  }
  function calculatePayroll(employeeRecords) {
    const allWages = employeeRecords.reduce((totalWages, employeeRecord) => {
      return totalWages + allWagesFor(employeeRecord);
    }, 0);
    return allWages;
  }
   
  