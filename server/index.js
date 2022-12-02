const express = require('express');
const axios = require('axios')
var cors = require('cors')


const port = 3200;
const app = express();
app.use(cors({
    origin: '*'
}));

app.use(express.static('dist'))


const roomStartTime = {}
const TEN_MINS = 1000 * 60 * 10;

const instance = axios.create({
    timeout: 1000,
    headers: {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "cross-site"
      },
      responseEncoding: "utf8",
      responseType: 'arraybuffer',
      decompress: true 

  });
app.get("/roomInfo/:roomId",  (req, res)=>{
    let roomId = req.params.roomId;
    instance.get(`https://live.bilibili.com/${roomId}`)
    .then((resp)=>{
            let result;
            if(roomStartTime[roomId] != null) {
                console.log(`Hit Cache of ${roomId}`)
                if(diffTime(roomStartTime[roomId], TEN_MINS)) {
                    roomStartTime[roomId] = null;
                } else {
                    result = roomStartTime[roomId];
                }
            }

            if(result == null){
                let html = resp.data.toString()
                const match = html.match(/window.__NEPTUNE_IS_MY_WAIFU__\s*=\s*({.*\s*})\s*</);
                let roomInfo = JSON.parse(match[1]);
                console.log(roomInfo.roomInfoRes.data.room_info.live_start_time)
                let startTime = new Date(roomInfo.roomInfoRes.data.room_info.live_start_time * 1000);
                roomStartTime[roomId] = startTime;
                result = startTime;
            }

            return result;
        }).then((startDate) => {
            
            res.json({"time": startDate})
        }).catch((err)=>{
            console.log(err.message)
        })
        
       
    })

app.listen(port, ()=>{
    console.log(`Server Starting at ${port}`)
})


function diffTime(time, diff) {
    return new Date() - time > diff;
}