import Angle from './Angle.js';
import Vec from './Vec.js';

export default class Rect {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.width = width;
    this.height = height;
    this.pos = new Vec(x, y);
    this.color = '#000';
    this.anchor = new Vec(0.5, 0.5);
    this.rotation = new Angle;
  }

  draw(context) {
    context.save();
    context.translate(
      this.pos.x,
      this.pos.y
    );
    context.rotate(-this.rotation.radians);
    context.fillStyle = this.color;
    context.fillRect(
      -this.anchor.x * this.width,
      -this.anchor.y * this.height,
      this.width,
      this.height
    );
    context.restore();
  }
}