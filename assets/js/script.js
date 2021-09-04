//DarkMode
const darkModeSwitch = document.querySelector(".dark-mode-switch");
const darkModeSwitchIdent = document.querySelector(".dark-mode-switch-ident");

darkModeSwitch.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("dark");
    document.querySelector("body").classList.toggle("light");
})

//Calendar
let calendar = document.querySelector(".calendar");
let month_list = calendar.querySelector('.month-list')
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))
}

getDayOfFeb = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

let month_picker = calendar.querySelector('#month-picker')
let year_picker = calendar.querySelector('#year-picker')

let currDate = new Date();

generateCalendar = (month, year) => {

    let calendarDates = calendar.querySelector('.calendar__date');

    let daysOfMonth  = [31, getDayOfFeb(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    calendarDates.innerHTML = "";

    let curr_month = `${monthNames[month]}`
    month_picker.innerHTML = curr_month
    year_picker.innerHTML = year;

    for(let i = 1; i <= daysOfMonth[month]; i++) {
        let day = document.createElement("div");
            day.innerHTML = i
          
            if (i === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('calendar__date-hover')
            } 
            calendarDates.appendChild(day);
    }
}

const currentDate = document.querySelector(".current-btn");
currentDate.addEventListener("click", () => {
    let date = new Date();
    // console.log(date.getMonth() + "\\" + date.getFullYear());
    generateCalendar(date.getMonth(), date.getFullYear())
})

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}
generateCalendar(curr_month.value, curr_year.value)

const prevMonth = document.querySelector("#prev-month");
const nextMonth = document.querySelector("#next-month");

prevMonth.addEventListener("click", () => {
    --curr_month.value;
    if(curr_month.value < 0) {
        curr_month.value = 11;
        --curr_year.value;
        generateCalendar(curr_month.value, curr_year.value)
    }
    generateCalendar(curr_month.value, curr_year.value)
})

nextMonth.addEventListener("click", () => {
    ++curr_month.value
    if(curr_month.value > 11) {
        curr_month.value = 0;
        ++curr_year.value;
        console.log(curr_year.value);
        generateCalendar(curr_month.value, curr_year.value)
    }
    generateCalendar(curr_month.value, curr_year.value)
})

//Click Month
const calendarHeaderLeft = document.querySelector(".calendar__header-left");
calendarHeaderLeft.addEventListener("click", () => {
    month_list.classList.add('show');
})

const monthItem = document.querySelector(".month-items")
const monthListYear = document.querySelector(".month-list-year");
monthListYear.innerHTML = curr_year.value;

monthNames.forEach((val, index) => {
    let month = document.createElement('div');

    month.innerHTML = val;
    month.onclick = () => {
        month_list.classList.remove("show")
        curr_month.value = index
        generateCalendar(curr_month.value, curr_year.value)
    }
    monthItem.appendChild(month);
})

//click year
const yearArr = [];
const yearList= document.querySelector(".year-list");

getListYears = (startYear, endYear) => {
    while( startYear <= endYear) {
        yearArr.push(startYear++);
    }
    return yearArr;
}
getListYears(1921, 2121);

yearArr.forEach((val, index) => {
    let year = document.createElement("div");
    year.innerHTML = val;
    if(val === curr_year.value) {
        year.classList.add("year-current");
    }

    year.onclick = () => {
        curr_year.value = val;
        monthListYear.innerHTML = curr_year.value;

        yearList.classList.remove("show");

    }    
    yearList.appendChild(year);
})

monthListYear.addEventListener("click", () => {
    yearList.classList.add("show");
})











