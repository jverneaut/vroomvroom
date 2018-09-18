import Angle from './Angle.js';
import Vec from './Vec.js';

const width = 599;
const height = 403;

export default class Car {
  constructor(x, y, color, upscale) {
    this.img = new Image();
    this.img.src = `/img/car_${color}.png`;
    this.upscale = upscale;
    this.pos = new Vec(x * this.upscale, y * this.upscale);
    this.width = width / (15 / this.upscale);
    this.height = height / (15 / this.upscale);
    this.anchor = new Vec(0.25, 0.5);
    this.rotation = new Angle;
  }

  draw(context) {
    context.save();
    context.translate(
      this.pos.x,
      this.pos.y
    );
    context.rotate(-this.rotation.radians);
    context.drawImage(
      this.img,
      -this.anchor.x * this.width,
      -this.anchor.y * this.height,
      this.width,
      this.height
    );
    context.restore();
  }
}