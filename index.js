/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employeeArray){
    /* 
    takes a 4 element array corresponding to:
        first name (str), last name (str), title(str), and pay rate per hour (number)
    returns a javascript object with keys:
        firstName
        familyName
        title
        payPerHour
        timeInEvents
        timeOutEvents
    behavior: loads array elements into corresponding Object properties,
    initializes empty arrays on timeInEvents and timeOutEvents
    */

    //initialize a list of keys that correspond to elements in the employee array
    const keys = ["firstName", "familyName", "title", "payPerHour"]

    const employee = employeeArray.reduce((acc, value, index) => {
        //for each element in employeeArray, assign it to the accumulator object
        //with properties that match the index in the keys array
        acc[keys[index]] = value;
        return acc;
    }, {"timeInEvents": [], "timeOutEvents": []})
    
    return employee
}

function createEmployeeRecords(nestedArrays){
    /*
    takes an array of arrays
        converts each nested array into an employee record using createEmployeeRecord, and accumulates into a new Array
    returns an array of objects
    */
    return nestedArrays.map((employee) => createEmployeeRecord(employee))
}

function createTimeInEvent(timestamp){
    /*
    takes an employee record and a "YYYY-MM-DD HHMM" timestamp,
        adds an object with keys to the timeInEvents array on the record:
        with keys:
            "type": "TimeIn",
            "hour": hour derived from timestamp,
            "date": date derived from timestamp
    */
   const keys = ["date", "hour"]
   let dateTime = timestamp.split(" ")

   const time = dateTime.reduce((acc, value, index) => {
        acc[keys[index]] = value;
        if (keys[index] === "hour"){
            acc.hour = Number(value)
        }
        return acc;
   }, {"type": "TimeIn"})

   this.timeInEvents.push(time)
   return this
}

function createTimeOutEvent(timestamp) {
    const keys = ["date", "hour"]

    const time = timestamp.split(" ").reduce((acc, value, index) => {
        acc[keys[index]] = value;
        if (keys[index] === "hour"){
            acc.hour = Number(value);
        }
        return acc;
    }, {"type": "TimeOut"})

    this.timeOutEvents.push(time);
    return this
}

function hoursWorkedOnDate(date) {
    /*
    takes an employee record and a date,
    returns the number of hours elapsed between that date's timeInEvent
    and timeOutEvent
    */
    function findHour(events, date) {
        // Use reduce to find the event for the given date
        return events.reduce((acc, event) => {
            //if the time in/out event date matches input date, return the time in/out hour, 0 if not
            return event.date === date ? event.hour : acc;
        }, 0);
    }

    let timeInHour = findHour(this.timeInEvents, date);
    let timeOutHour = findHour(this.timeOutEvents, date);
    return (timeOutHour - timeInHour) * 0.01;

}

function wagesEarnedOnDate(date){
    /*
    gets the hours worked on the input date and calculates total wage
    by employee pay per hour
    */
    let hours = hoursWorkedOnDate.call(this, date);
    return this.payPerHour * hours
}


function findEmployeeByFirstName(employees, firstName){
    /* 
    finds an employee record from an array of records by the input first name
    */
    return employees.reduce((acc, employee) => {
        //return the employee record if the first name matches the input name, undefined if not
        return employee.firstName === firstName ? employee : acc ;
    }, undefined)
}

function calculatePayroll(employees){
    /*
    takes an array of employee records, and returns sum of pay owed to all employees for all dates, as a number
    */
   return employees.reduce((totalWages, employee) => {
        return totalWages + allWagesFor.call(employee)
   }, 0)
}


