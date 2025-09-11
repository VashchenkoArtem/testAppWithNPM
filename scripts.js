let moment = require("moment");

function getCurrentDay(){
    let currentDay = moment().format("dddd");
    console.log(currentDay);
    return currentDay;
}
function getCurrentMonth(){
    let currentMonth = moment().format("MMMM");
    console.log(currentMonth);
    return currentMonth;
}
function getCurrentYear(){
    let currentYear = moment().format("YYYY");
    console.log(currentYear);
    return currentYear;
}
function getDate(){
    let currentDate = moment().format("YYYY/MM/DD");
    let currentTime = moment().format("HH:mm:ss");
    let currentYear = getCurrentYear();
    let currentDayOfCalendar = moment().format('DD');
    let currentMonth = moment().format('MM');
    let currentHours = moment().format("HH");
    let currentMinutes = moment().format("mm");
    let currentSeconds = moment().format("ss");
    console.log(`${currentDate} ${currentTime}, де ${currentYear} - рік, ${currentDayOfCalendar} - число календаря, ${currentMonth} - місяць, ${currentHours} - година, ${currentMinutes} - хвилини, ${currentSeconds} - секунди`);
}
// getCurrentDay();
// getCurrentMonth();
// getCurrentYear();
getDate()