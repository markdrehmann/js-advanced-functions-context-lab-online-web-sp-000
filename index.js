let createEmployeeRecord = function(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(array) {
  return array.map(eachArray => createEmployeeRecord(eachArray))
}

let createTimeInEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  let obj = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  };
  this.timeInEvents.push(obj)
  return this
}

let createTimeOutEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  let obj = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  };
  this.timeOutEvents.push(obj)
  return this
}

let hoursWorkedOnDate = function(givenDate) {
  let timeInEvent = this.timeInEvents.find(el => el.date === givenDate);
  let timeOutEvent = this.timeOutEvents.find(el => el.date === givenDate);
  return (timeOutEvent.hour - timeInEvent.hour) / 100
}

let wagesEarnedOnDate = function(givenDate) {
  return hoursWorkedOnDate.call(this, givenDate) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, searchName) {
  return srcArray.find(el => el.firstName === searchName)
}

let calculatePayroll = function(empArray) {
  return empArray.reduce(function(total, eachEmp) {
    return total + allWagesFor.call(eachEmp)
  }, 0)
} 