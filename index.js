const five = require('johnny-five')
const Raspi = require('raspi-io').RaspiIO
const board = new five.Board({
  io: new Raspi(),
})

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

server.listen(2000, () => {
  console.log('listening on *:2000')
})

const { Server } = require('socket.io')
const io = new Server(server)

let runStatus = 'waiting'

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('A user is ready to activate the vending machine')
})

socket.on('start-running', function (vending) {
  if (runStatus === 'waiting') {
    runStatus = 'running'
  }
})

board.on('ready', function () {

  const servo = new Servo({
    pin: 'P1-15',
    type: 'continuous',
    pwmRange: [600, 2900],
  })
  const piezo = new five.Piezo('P1-13')
  board.repl.inject({
    piezo: piezo,
  })

  if (runStatus === 'running') {
    
    servo.cw()
    piezo.play({
      song: [
        ['C4', 1 / 4],
        ['D4', 1 / 4],
        ['F4', 1 / 4],
      ],
      tempo: 100, 
    })

    // attendre 3 secondes

    servo.ccw()
    piezo.play({
      song: [
        ['C4', 1 / 4],
        ['D4', 1 / 4],
        ['F4', 1 / 4],
      ],
      tempo: 100, 
    })
    runStatus = 'waiting'

  } else if (runStatus === 'waiting') {
      console.log('An error has occurred')
  }
})