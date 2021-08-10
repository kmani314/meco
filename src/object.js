import Qty from 'js-quantities';

export default class object {
  constructor(initialState) {
    this.mass = initialState.mass || Qty(0, 'kg');
    this.vel = initialState.vel || [Qty(0, 'm/s'), Qty(0, 'm/s'), Qty(0, 'm/s')];
    this.force = initialState.force || [Qty(0, 'N'), Qty(0, 'N'), Qty(0, 'N')];
    this.pos = initialState.pos || [Qty(0, 'm'), Qty(0, 'm'), Qty(0, 'm')];
    this.track = initialState.track;
  }

  selfTick(tick) {
    // a step forward in time of some value tick
    const a = this.force.map((f) => f.div(this.mass));
    this.vel = this.vel.map((k, i) => k.add(a[i].mul(tick)));
    this.pos = this.pos.map((k, i) => k.add(this.vel[i].mul(tick)));
  }
}
