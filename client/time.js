import timeToStart from './util'
import './time.css'

let timeQuery = new URL(document.location).searchParams.get('time');


let startTime = new Date(timeQuery);

setInterval(() => {
    document.querySelector("#duration").textContent = timeToStart(startTime);

}, 1000);