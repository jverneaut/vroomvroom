import Vec from './Vec.js';

export default class Angle {
  constructor(degrees = 0) {
    this.degrees = degrees;
  }

  set radians(radians) {
    this.degrees = 180 * radians / Math.PI;
  }

  get radians() {
    return Math.PI * this.degrees / 180;
  }

  get vec() {
    return new Vec(Math.cos(this.radians), Math.sin(this.radians));
  }
}