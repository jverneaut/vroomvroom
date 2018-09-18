import Rect from './Rect.js';
import Car from './Car.js';

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

socket.on('data', cars => {
  bg.draw(context);
  cars.forEach(car => {
    const carToDraw = new Car(car.pos.x, car.pos.y, car.color, UPSCALE);
    carToDraw.rotation.degrees = -car.angle.degrees;
    carToDraw.draw(context);
  });
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
