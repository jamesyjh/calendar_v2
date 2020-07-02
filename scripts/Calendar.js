/*
 AUTHOR: James Hong (yjh0205@gmail.com)
 DATE CREATED: 2020-05-26
 
 Assignment01_JamesHong

 DESCRIPTION:
    Calendar.js contains the model for the calendar used in this project.
 
 */

/** Class representing a calendar. */
class Calendar {
  /**
   * Create a point.
   * @param {Date} time - The current time.
   * @param {number} year - The current year.
   * @param {number} month - The current month.
   * @param {number} date - The current date.
   * @param {number} day - The current day.
   */

  constructor(year, month, date) {
    this.time = new Date(Date.now());
    this.year = this.time.getFullYear();
    this.month = this.time.getMonth() + 1;
    this.date = this.time.getDate();
    this.day = this.time.getDay() + 1;
  }

  /**
   * Change the calendar's date.
   */
  set(year, month, date) {
    this.time = new Date(year, month, date);
  }

  setYear(year) {
    this.year = year;
  }

  setMonth(month) {
    this.month = month;
  }

  setDate(date) {
    this.date = date;
  }

  /**
   * Get the current month.
   * @return {string} The month value as a string - full length.
   */
  getMonthString() {
    switch (this.month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
    }
  }

  /**
   * Get the current month.
   * @param {number} shift - Value added to get previous or next month value.
   * @return {number} The month as a string - shortened length.
   */

  getShortMonthString(shift) {
    switch (this.month + shift) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }

  /**
   * Get the current day of the week.
   * @return {number} The day of the week as a string.
   */
  getDayString() {
    switch (this.day) {
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
      case 7:
        return "Saturday";
    }
  }

  /**
   * Get the number of days in the current month.
   * @return {number} The total number of days in the month.
   */
  getDaysOfMonth() {
    return new Date(this.year, this.month, 0).getDate();
  }

  /**
   * Get the first day of the month.
   * @return {number} The first day of the month.
   */
  getFirstDayOfMonth() {
    return new Date(this.year, this.month - 1, 1).getDay() + 1;
  }

  /**
   * Get the last day of the month.
   * @return {number} The last day of the month..
   */
  getLastDayOfMonth() {
    return new Date(this.year, this.month, 0).getDay() + 1;
  }

  /**
   * Get the last day of the previous month.
   * @return {number} The last day of the previous month.
   */
  getLastDayOfPreviousMonth() {
    return new Date(this.year, this.month - 1, 0).getDate();
  }
}
