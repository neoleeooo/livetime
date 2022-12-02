import timeToStart from './util'
let timeQuery = new URL(document.location).searchParams.get('time');


let startTime = new Date(timeQuery);
console.log(startTime.getTimezoneOffset())
startTime = startTime.getTime() + 60 * 60 * 8;
setInterval(() => {
   
    document.querySelector("#duration").textContent = timeToStart(startTime);

}, 1000);