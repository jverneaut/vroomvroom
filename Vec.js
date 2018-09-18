class Vec {
  constructor(x = 0, y = 0) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  get len() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }

  set len(l) {
    const vLen = this.len;
    const factor = l / vLen;
    this.x *= factor;
    this.y *= factor;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  normalize() {
    this.len = 1;
  }
}

module.exports = Vec;
