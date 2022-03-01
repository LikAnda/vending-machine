const five = require('johnny-five')
const Raspi = require('raspi-io').RaspiIO
const board = new five.Board({
  io: new Raspi(),
})

board.on('ready', function () {

    const delay = require('delay');
    const {Board, Servo} = require("johnny-five");
    const board = new Board();
    const piezo = new five.Piezo('P1-13')
    board.repl.inject({
      piezo: piezo,
    })

    board.on("ready", () => {
    const servo = new Servo(11);
        var servo = new five.Servo({
            pin: 11,
            startAt: 90, 
        })
        servo.to(250);
        servo.sweep();
    })

    await delay(2000)

    piezo.play({
        song: [
          ['C4', 1 / 4],
          ['D4', 1 / 4],
          ['F4', 1 / 4],
        ],
        tempo: 100,
    })

})