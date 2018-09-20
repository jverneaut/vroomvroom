const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

const Car = require('./Car.js');

let cars = [];

const DELAY = 0;
const UPDATE_RATE = 60;
const STREAM_RATE = 60;

io.on('connection', socket => {
  const playerCar = new Car(socket.id);
  playerCar.pos.set(100, 200);
  cars.push(playerCar);

  socket.on('keydown', key => {
    setTimeout(() => {
      playerCar.handleKeydown(key);
    }, DELAY)
  });

  socket.on('keyup', key => {
    setTimeout(() => {
      playerCar.handleKeyup(key);
    }, DELAY)
  });

  socket.on('disconnect', () => {
    cars = cars.filter(car => car.id !== playerCar.id);
  });
});

function update() {
  cars.forEach(car => car.update(1 / UPDATE_RATE));
};
setInterval(update, 1000 / UPDATE_RATE);

function stream() {
  io.emit('data', cars);
};
setInterval(stream, 1000 / STREAM_RATE);

server.listen(5000);
