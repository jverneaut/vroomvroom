const Vec = require('./Vec.js');
const Angle = require('./Angle.js');

class Car {
  constructor(id) {
    this.id = id;
    this.color = Math.floor(Math.random() * 5) + 1;

    this.acceleration = 360;
    this.deceleration = 160;
    this.maxSpeed = 220;

    this.pos = new Vec;
    this.vel = 0;
    this.acc = 0;

    this.angle = new Angle;

    this.direction = 0;
    this.steering = 0;
    this.steeringAcceleration = 60;
    this.steeringAngle = 10;
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
    this.angle.degrees += this.steering;

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

    this.pos.x += dt * this.vel * this.angle.vec.x;
    this.pos.y += dt * this.vel * this.angle.vec.y;
  }
}

module.exports = Car;
