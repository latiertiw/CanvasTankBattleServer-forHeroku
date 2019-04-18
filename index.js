var host = location.origin.replace(/^http/, 'ws')
const WebSocket = require('ws')
const wss = new WebSocket.Server(host)

let players = [] ;
let player;
let col = 0;
let p = 0;
let d = 0;



//module.exports = wss;
wss.on('connection', ws => {
   
  ws.on('message', message => {
    player = JSON.parse(message);
    player.timer = 200;


  
    for(let i = 0;i<players.length;i+=1){
        players[i].timer-=1;   
        if(player.id==players[i].id) {
            players[i] = player;
            col = 1
        }
        else if(players[i].timer<=0) {
            d = 1;
            p = i;
        };
    }

    if(d==1){
        players.splice(players.indexOf(d), 1);

        d=0;
    }

    if(col == 0) players.push(player);
    else col=0;  

    ws.send(JSON.stringify(players));
  })
  ws.send(JSON.stringify(players));
})
