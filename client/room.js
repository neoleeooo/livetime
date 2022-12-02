import timeToStart from './util'
let roomId = new URL(document.location).searchParams.get('room');

fetch(`http://127.0.0.1:3200/roomInfo/${roomId}`)
.then((resp)=>resp.json())
.then((body)=>{
    let startTime = new Date(body.time);
    setInterval(() => {
   
        document.querySelector("#duration").textContent = timeToStart(startTime);
    
    }, 1000);
})

