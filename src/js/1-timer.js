'use strict';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const textInput = document.querySelector("#datetime-picker"); 
let userSelectedDate = null;
let timerInterval = null;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            iziToast.show({
                message: "Please choose a date in the future",
                backgroundColor: '#ef4040',
                messageColor: '#fff',
                messageSize: '16px',
                messageLineHeight: '150%',
                position: 'topCenter'
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};
flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", startTimer);
function startTimer() {
    timerInterval = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = userSelectedDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateTimer({ days, hours, minutes, seconds });
        if (deltaTime <= 0) {
            clearInterval(timerInterval);
            startBtn.disabled = true;
            textInput.disabled = false;
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
            startBtn.disabled = true;
            textInput.disabled = true;
        }
    }, 1000)
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

function updateTimer({ days, hours, minutes, seconds }) {
    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[ data-seconds]").textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}
