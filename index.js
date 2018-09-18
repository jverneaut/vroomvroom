const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

const Car = require('./Car.js');

let cars = [];

const delay = 0;

io.on('connection', socket => {
  const playerCar = new Car(socket.id);
  playerCar.pos.set(100, 200);
  cars.push(playerCar);

  socket.on('keydown', key => {
    setTimeout(() => {
      playerCar.handleKeydown(key);
    }, delay)
  });

  socket.on('keyup', key => {
    setTimeout(() => {
      playerCar.handleKeyup(key);
    }, delay)
  });

  socket.on('disconnect', () => {
    cars = cars.filter(car => car.id !== playerCar.id);
  });
});

function update() {
  cars.forEach(car => car.update(1 / 30));
};
setInterval(update, 1000 / 30);

function stream() {
  io.emit('data', cars);
};
setInterval(stream, 1000 / 30);

server.listen(5000);
