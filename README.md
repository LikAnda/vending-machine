# Vending Machine (raspi)
A small things vending machine with a raspberry.

----

## Installation

- `npm install` *(to install all dependencies)*

- Servo motor on pin 11 (GPIO 17)

- Piezo connected to pin 13 (GPIO 27)

<p align="center">
<img width="475", height="472" src="https://cdn.discordapp.com/attachments/719932115029852213/952576559372439632/vending-machine_LikAnda.png">
</p>

----

## Run

1. `sudo node index.js`

2. To activate the system remotely, go to `ip-of-the-raspberry:2000`

3. And you just have to activate it from here

----

### Packages

- express

- johny-five

- raspi-io

- socket.io