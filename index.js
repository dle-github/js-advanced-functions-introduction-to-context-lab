// Your code here
function createEmployeeRecord(a){
    const eObj = {
        firstName: a[0],
        familyName: a[1],
        title: a[2],
        payPerHour: a[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return eObj;
}

function createEmployeeRecords(aoa){
    let aoo = []
    aoa.forEach(x => aoo.push(createEmployeeRecord(x)))
    return aoo;
}

function createTimeInEvent(o, d){
    const tObj = {
        type: 'TimeIn',
        date: d.split(' ')[0],
        hour: parseInt(d.split(' ')[1])
    }
    o.timeInEvents.push(tObj)
    return o;
}

function createTimeOutEvent(o, d) {
    const tObj = {
        type: 'TimeOut',
        date: d.split(' ')[0],
        hour: parseInt(d.split(' ')[1])
    }
    o.timeOutEvents.push(tObj)
    return o;
}

function hoursWorkedOnDate(o, d) {
    let fIn = Math.floor(o.timeInEvents.find(record => record.date == d).hour / 1e2);
    let fOut = Math.floor(o.timeOutEvents.find(record => record.date == d).hour / 1e2);
    return fOut - fIn;
}

function wagesEarnedOnDate(o, d){
    let wage = o.payPerHour * hoursWorkedOnDate(o, d)
    return wage
}

function allWagesFor(o){
    let wages = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for (let i = 0; i < o.timeInEvents.length; i++) {
        let d = o.timeInEvents[i].date
        wages.push(wagesEarnedOnDate(o, d))
    }
    let w = wages.reduce(reducer)
    return w;
}

function calculatePayroll(a){
    
    let wages = []
    for (let i = 0; i < a.length; i++) {
        wages.push(allWagesFor(a[i]))
    }
    console.log(wages)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let w = wages.reduce(reducer)
    return w;
}

function findEmployeeByFirstName(a, s){
    let obj = a.find(o => o.firstName === s);
    console.log(obj)
    return obj;
}