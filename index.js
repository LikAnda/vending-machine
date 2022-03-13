const { Board, Servo, Piezo } = require('johnny-five')
const Raspi = require('raspi-io').RaspiIO
const board = new Board({
  io: new Raspi(),
}) 

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

server.listen(2000, () => {})

let interfaces = require('os').networkInterfaces();
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && address.address !== '127.0.0.1' && !address.internal){
            console.log(`Go on : http://${address.address}:2000 to start the vending machine`);
        }
    }
}

const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
})

let servo = null;
let piezo = null;

board.on('ready', function () {
  servo = new Servo({
    pin: 'P1-11',
    type: 'continuous',
    pwmRange: [600, 2900],
  })
  piezo = new Piezo('P1-13')
  board.repl.inject({
    piezo: piezo,
  })
})

io.on('connection', (socket) => {

  socket.emit('state-change', { state: 'waiting' })

  console.log('A user is ready to activate the vending machine')

  socket.on('start-running', () => {

      socket.emit('state-change', { state: 'running' })

      console.log('Servo open')

      servo.cw()
      piezo.play({
        song: [
          ['C4', 1 / 4],
          ['D4', 1 / 4],
          ['F4', 1 / 4],
        ],
        tempo: 100,
      })

      const myInterval = setInterval(function () {
        console.log('Servo closed')

        servo.ccw()
        piezo.play({
          song: [
            ['C4', 1 / 4],
            ['D4', 1 / 4],
            ['F4', 1 / 4],
          ],
          tempo: 100,
        })
        
        socket.emit('state-change', { state: 'waiting' })

        clearInterval(myInterval)
      }, 2500)
    })
})
