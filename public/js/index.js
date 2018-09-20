import Rect from './Rect.js';
import Car from './Car.js';
import Ball from './Ball.js';

const socket = io.connect('http://localhost:5000');

const UPSCALE = 3;

const canvas = document.getElementById('canvas');
canvas.width = 600 * UPSCALE;
canvas.height = 400 * UPSCALE;

const context = canvas.getContext('2d');

const bg = new Rect(0, 0, canvas.width, canvas.height);
bg.anchor.set(0, 0);
bg.color = '#E5E5E5';
bg.draw(context);

const wallLeft = new Rect(0, 0, 8 * UPSCALE, canvas.height);
wallLeft.color = '#aaa';
wallLeft.anchor.set(0, 0);

const wallRight = new Rect(canvas.width, 0, 8 * UPSCALE, canvas.height);
wallRight.color = '#aaa';
wallRight.anchor.set(1, 0);

const wallTop = new Rect(0, 0, canvas.width, 8 * UPSCALE);
wallTop.color = '#aaa';
wallTop.anchor.set(0, 0);

const wallBottom = new Rect(0, canvas.height, canvas.width, 8 * UPSCALE);
wallBottom.color = '#aaa';
wallBottom.anchor.set(0, 1);

const ballImg = new Ball;
ballImg.pos.set(500 * UPSCALE, canvas.height / 2);

socket.on('data', ({ cars, ball }) => {
  bg.draw(context);
  wallLeft.draw(context);
  wallRight.draw(context);
  wallTop.draw(context);
  wallBottom.draw(context);
  cars.forEach(car => {
    const carToDraw = new Car(car.pos.x, car.pos.y, car.color, UPSCALE);
    carToDraw.rotation.degrees = -car.angle.degrees;
    carToDraw.draw(context);
  });
  ballImg.pos.x = ball.pos.x * UPSCALE;
  ballImg.pos.y = ball.pos.y * UPSCALE;
  ballImg.size = ball.size * UPSCALE;
  ballImg.draw(context);
});

window.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft'
    || event.code === 'ArrowRight'
    || event.code === 'ArrowUp'
    || event.code === 'ArrowDown') {
    socket.emit('keydown', event.code);
  }
});
window.addEventListener('keyup', event => {
  if (event.code === 'ArrowLeft'
    || event.code === 'ArrowRight'
    || event.code === 'ArrowUp'
    || event.code === 'ArrowDown') {
    socket.emit('keyup', event.code);
  }
});
