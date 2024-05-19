'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const delay = parseInt(form.elements.delay.value);
    const state = form.elements.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    promise
        .then((delay) => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${delay}ms`,
                backgroundColor: '#59a10d',
                messageColor: '#fff',
                position: 'topCenter'
            })
        })
        .catch((delay) => {
            iziToast.show({
                message: `❌ Rejected promise in ${delay}ms`,
                backgroundColor: '#ef4040',
                messageColor: '#fff',
                position: 'topCenter'
            })
        })
};