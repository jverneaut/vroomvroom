const Vec = require('./Vec.js');
const Angle = require('./Angle.js');

const width = (599 / 15) * 1;
const height = (403 / 15) * 0.86;

class Car {
  constructor(id) {
    this.id = id;
    this.color = Math.floor(Math.random() * 5) + 1;

    this.acceleration = 360;
    this.deceleration = 200;
    this.maxSpeed = 220;

    this.pos = new Vec;
    this.nextPos = new Vec;
    this.vel = 0;
    this.acc = 0;

    this.angle = new Angle;

    this.direction = 0;
    this.steering = 0;
    this.steeringAcceleration = 2000;
    this.steeringAngle = 300;

    this.frontLeft = new Vec;
    this.frontRight = new Vec;
  }

  handleKeydown(key) {
    switch (key) {
      case 'ArrowLeft':
        this.direction = -1;
        break;
      case 'ArrowRight':
        this.direction = 1;
        break;
      case 'ArrowUp':
        this.acc = this.acceleration;
        break;
      case 'ArrowDown':
        this.acc = -this.acceleration;
        break;
      default:
        break;
    }
  }

  handleKeyup(key) {
    switch (key) {
      case 'ArrowLeft':
        this.direction = 0;
        break;
      case 'ArrowRight':
        this.direction = 0;
        break;
      case 'ArrowUp':
        this.acc = 0;
        break;
      case 'ArrowDown':
        this.acc = 0;
        break;
      default:
        break;
    }
  }

  update(dt) {
    if (this.direction === - 1) {
      if (this.vel < 0) {
        this.steering += this.steeringAcceleration * dt;
      } else {
        this.steering -= this.steeringAcceleration * dt;
      }
    } else if (this.direction === 1) {
      if (this.vel < 0) {
        this.steering -= this.steeringAcceleration * dt;
      } else {
        this.steering += this.steeringAcceleration * dt;
      }
    } else {
      if (this.steering < 0) {
        this.steering += this.steeringAcceleration * dt;
        this.steering = Math.min(0, this.steering);
      } else {
        this.steering -= this.steeringAcceleration * dt;
        this.steering = Math.max(0, this.steering);
      }
    }
    this.steering = Math.min(this.steeringAngle, Math.max(this.steering, -this.steeringAngle));
    this.angle.degrees += this.steering * dt;

    if (this.acc) {
      this.vel += this.acc * dt;
    } else {
      if (this.vel < 0) {
        this.vel += this.deceleration * dt;
        this.vel = Math.min(0, this.vel);
      } else {
        this.vel -= this.deceleration * dt;
        this.vel = Math.max(0, this.vel);
      }
    }
    this.vel = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.vel));

    this.nextPos.x = this.pos.x + dt * this.vel * this.angle.vec.x;
    this.nextPos.y = this.pos.y + dt * this.vel * this.angle.vec.y;

    if (this.nextPos.x < width
      || this.nextPos.x > 600 - width
      || this.nextPos.y < width
      || this.nextPos.y > 400 - width) {

      this.frontLeft.x = this.nextPos.x + 0.75 * width * this.angle.vec.x + this.angle.vec.y * height / 2;
      if (this.frontLeft.x >= 600 - 8) {
        this.nextPos.x = 600 - 8 - this.angle.vec.x * 0.75 * width - this.angle.vec.y * height / 2;
      }
      if (this.frontLeft.x <= 8) {
        this.nextPos.x = 8 - this.angle.vec.x * 0.75 * width - this.angle.vec.y * height / 2;
      }

      this.frontRight.x = this.nextPos.x + 0.75 * width * this.angle.vec.x - this.angle.vec.y * height / 2;

      if (this.frontRight.x >= 600 - 8) {
        this.nextPos.x = 600 - 8 - this.angle.vec.x * 0.75 * width + this.angle.vec.y * height / 2;
      }
      if (this.frontRight.x <= 8) {
        this.nextPos.x = 8 - this.angle.vec.x * 0.75 * width + this.angle.vec.y * height / 2;
      }

      this.frontLeft.y = this.nextPos.y + 0.75 * width * this.angle.vec.y - this.angle.vec.x * height / 2;
      if (this.frontLeft.y <= 8) {
        this.nextPos.y = 8 + width * 0.75 * -this.angle.vec.y + this.angle.vec.x * height * 0.5;
      }
      if (this.frontLeft.y >= 400 - 8) {
        this.nextPos.y = 400 - 8 + width * 0.75 * -this.angle.vec.y + this.angle.vec.x * height * 0.5;
      }

      this.frontRight.y = this.nextPos.y + 0.75 * width * this.angle.vec.y + this.angle.vec.x * height / 2;
      if (this.frontRight.y <= 8) {
        this.nextPos.y = 8 + width * 0.75 * -this.angle.vec.y - this.angle.vec.x * height * 0.5;
      }
      if (this.frontRight.y >= 400 - 8) {
        this.nextPos.y = 400 - 8 + width * 0.75 * -this.angle.vec.y - this.angle.vec.x * height * 0.5;
      }

      this.pos.x = this.nextPos.x;
      this.pos.y = this.nextPos.y;
    } else {
      this.pos.x = this.nextPos.x;
      this.pos.y = this.nextPos.y;
    }
  }
}

module.exports = Car;
