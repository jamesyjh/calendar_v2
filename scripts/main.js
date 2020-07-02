/*
 AUTHOR: James Hong (yjh0205@gmail.com)
 DATE CREATED: 2020-05-26
 
 Assignment02_JamesHong

 DESCRIPTION:
    Main script handling all logic for calendar data generation. Uses Calendar.js Calendar class.
 
 */
var go = {};

document.addEventListener("DOMContentLoaded", main, false);

function main() {
  go.holidays = {
    url: "ontario_holidays.json",
    type: "GET",
    dataType: "json",
  };

  $.ajax(go.holidays)
    .then((data) => {
      log("success");
      go.calendar = new Calendar();

      let year = go.calendar.year;
      go.calendar.events = data[year];

      $("#prevBtn").click(() => {
        getPrevious();
        buildCalendar();
      });

      $("#nextBtn").click(() => {
        getNext();
        buildCalendar();
      });
    })

    .catch((err) => {
      log("failed to load json");
    })
    .always(() => {
      buildCalendar();
    });
}

function buildCalendar() {
  // Dynamically change month-year at the top of the calendar
  let monthYear = document.getElementById("monthYear");
  monthYear.innerHTML = go.calendar.getMonthString() + " " + go.calendar.year;

  // Dynamically generate a 6x7 grid for the month dates
  let dateOfMonth = document.getElementById("dateOfMonth");
  dateOfMonth.innerHTML = "";

  // Dynamically fill the dates from the previous month with respect to first day of the current month
  let k =
    go.calendar.getLastDayOfPreviousMonth() -
    go.calendar.getFirstDayOfMonth() +
    2;

  for (let i = 1; i < go.calendar.getFirstDayOfMonth(); i++) {
    if (i == 1) {
      dateOfMonth.innerHTML +=
        '<div class="gridItem" id="previousMonth">' +
        go.calendar.getShortMonthString(-1) +
        " " +
        k +
        "</div>";
    } else {
      dateOfMonth.innerHTML +=
        '<div class="gridItem" id="previousMonth">' + k + "</div>";
    }
    k++;
  }

  // Dynamically generate the days of the current month with respect to the total number of days in the month
  for (let i = 1; i <= go.calendar.getDaysOfMonth(); i++) {
    if (i == go.calendar.time.getDate()) {
      dateOfMonth.innerHTML +=
        '<div class="gridItem" id="today">' +
        i +
        '<div class="holidayItem" id="holiday">' +
        getHoliday(go.calendar.year, go.calendar.month, i) +
        "</div>" +
        "</div>";
    } else {
      dateOfMonth.innerHTML +=
        '<div class="gridItem" id="currentMonth">' +
        i +
        '<div class="holidayItem" id="holiday">' +
        getHoliday(go.calendar.year, go.calendar.month, i) +
        "</div>" +
        "</div>";
    }
  }

  // Dynamically fill the dates from the next month with respect to last day of the current month
  let firstDayNextMonth = new Date(
    go.calendar.year,
    go.calendar.month,
    1
  ).getDay();

  for (let i = 1; i <= 7 - firstDayNextMonth; i++) {
    if (i == 1) {
      dateOfMonth.innerHTML +=
        '<div class="gridItem" id="nextMonth">' +
        go.calendar.getShortMonthString(1) +
        " " +
        i +
        "</div>";
    } else {
      dateOfMonth.innerHTML +=
        '<div class="gridItem" id="nextMonth">' + i + "</div>";
    }
  }
}

function getHoliday(y, m, d) {
  let holidays = go.calendar.events;
  if (holidays[m][d] != undefined) {
    // console.log(holidays[m][d])
    return holidays[m][d];
  } else {
    return "";
  }
}

function getNext() {
  go.calendar.year =
    go.calendar.month == 12 ? go.calendar.year + 1 : go.calendar.year;
  go.calendar.month = (go.calendar.month % 12) + 1;
  // console.log(go.calendar.month)
  go.calendar.setMonth(go.calendar.month);
  go.calendar.setYear(go.calendar.year);
}

function getPrevious() {
  go.calendar.year =
    go.calendar.month == 1 ? go.calendar.year - 1 : go.calendar.year;
  go.calendar.month = go.calendar.month == 1 ? 12 : go.calendar.month - 1;
  // console.log(go.calendar.month)
  go.calendar.setMonth(go.calendar.month);
  go.calendar.setYear(go.calendar.year);
}
