import Angle from './Angle.js';
import Vec from './Vec.js';

export default class Ball {
  constructor(x, y, color, upscale) {
    this.img = new Image();
    this.img.src = '/img/balle.png';
    this.upscale = upscale;
    this.pos = new Vec(x * this.upscale, y * this.upscale);
    this.anchor = new Vec(0.5, 0.5);
    this.rotation = new Angle;
    this.size = 0;
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
      -this.anchor.x * this.size,
      -this.anchor.y * this.size,
      this.size,
      this.size
    );
    context.restore();
  }
}