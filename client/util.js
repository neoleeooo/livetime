export default function timeToStart(startTime){
    console.log(`Input Time ${startTime}`);
    let duration = Math.floor((new Date().getTime() - startTime) / 1000);
    if(duration < 0) {
        return "00:00:00";
    }

    var hours   = Math.floor(duration / 3600);
    var minutes = Math.floor((duration - (hours * 3600)) / 60);
    var seconds = duration - (hours * 3600) - (minutes * 60);
    
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

