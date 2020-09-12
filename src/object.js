export default class object {
  constructor(initialState) {
    this.mass = initialState.mass;
    this.vel = initialState.vel;
    this.force = initialState.force;
    this.pos = initialState.pos;
  }

  selfTick(tick) {
    this.vel = (this.force / this.mass) * tick;
    this.pos = this.vel * tick;
  }
}
