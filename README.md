# Vending Machine (raspi)
A small things vending machine with a raspberry.

----

## Installation

- `sudo npm install`

- Motion sensor on pin 11 (GPIO 17)

- Piezo connected to pin 13 (GPIO 27)

<p align="center">
<img src="https://o.remove.bg/downloads/47e4e7d9-cf0d-46c8-9a10-f52763df6b6f/GPIO-Pinout-Diagram-2-removebg-preview.png">
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