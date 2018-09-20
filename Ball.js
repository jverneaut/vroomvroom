const Vec = require('./Vec.js');

class Ball {
  constructor() {
    this.size = 32;
    this.pos = new Vec;
    this.vel = new Vec(1, 1);
    this.decceleration = 0.3;
  }

  update(dt) {
    if (this.pos.x > 600 - 8 - this.size / 2
      || this.pos.x < 8 + this.size / 2) {
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y > 400 - 8 - this.size / 2
      || this.pos.y < 8 + this.size / 2) {
      this.vel.y = -this.vel.y;
    }
    this.vel.len *= 1 - (this.decceleration * dt);

    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
  }

  collide(car) {
    function checkCollision(x1, y1, x2, y2, radius) {
      const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      if (distance < radius / 2) {
        return true;
      } else {
        return false;
      }
    }

    if (checkCollision(
      car.frontLeft.x,
      car.frontLeft.y,
      this.pos.x,
      this.pos.y,
      this.size
    ) || checkCollision(
      car.frontRight.x,
      car.frontRight.y,
      this.pos.x,
      this.pos.y,
      this.size
    )) {
      this.vel.x = 0.8 * car.angle.vec.x * car.vel + 0.5 * this.vel.x;
      this.vel.y = 0.8 * car.angle.vec.y * car.vel + 0.5 * this.vel.y;
    }
  }
}

module.exports = Ball;
