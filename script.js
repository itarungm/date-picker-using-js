const datePickerBtn = document.querySelector('#dt-picker-btn');
const datePicker = document.querySelector('#dt-picker');
const datePickerHeader = document.querySelector('.current-month');
const prevMonth = document.querySelector('.prev-month-button');
const nxtMonth = document.querySelector('.next-month-button');
const datePickerGrid = document.querySelector('.date-picker-grid-dates');
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';

let currentDate = new Date();
let selectedDate = new Date();

function toggleShowClass(){
        datePicker.classList.toggle('show');
        setUpDatePicker(currentDate);
}

function setDate(date){
    datePickerBtn.innerHTML = format(date, 'MMMM do, yyyy');
  
}

function setUpDatePicker(currentDate){
    datePickerHeader.innerText = format(currentDate, 'MMMM - yyyy');
    fillUpDates()

}

function fillUpDates(){
    let startWeek = startOfWeek(startOfMonth(currentDate));
     let endWeek = endOfWeek(endOfMonth(currentDate));
     datePickerGrid.innerHTML='';
     eachDayOfInterval({start:startWeek,end:endWeek}).forEach((date)=>{
         let button = document.createElement('button');
         button.classList.add('date');
         button.innerText = date.getDate();
         if(isSameDay(date,selectedDate)){
             button.classList.add('selected')
         }
         if(!isSameMonth(date, currentDate)){
             console.log('Hello Ji')
             button.classList.add('date-picker-other-month-date')
         }
         button.dataset.date = date;
         button.addEventListener('click',function(){
            selectedDate = new Date(button.dataset.date);
            setDate(selectedDate);
             setUpDatePicker(selectedDate);
             removeShowClass()

         })
         datePickerGrid.appendChild(button);
     })
   
    // for(let  dt=startWeek; dt<=endWeek;dt++){
    //     console.log(dt);
    // }
}


function previousMonth(){
    currentDate = subMonths(currentDate,1)
    setUpDatePicker(currentDate);
}

function nextMonth(){
    currentDate = addMonths(currentDate,1)
    setUpDatePicker(currentDate);
}
function removeShowClass(){
    datePicker.classList.remove('show');
}


setDate(new Date());
datePickerBtn.addEventListener('click',toggleShowClass);
prevMonth.addEventListener('click',previousMonth);
nxtMonth.addEventListener('click',nextMonth);
