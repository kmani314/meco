import Qty from 'js-quantities';
import constants from './constants';
import util from './util';

export default class Signal {
  constructor(props) {
    this.origin = props.origin || [Qty(0, 'm'), Qty(0, 'm'), Qty(0, 'm')];

    // speed of light if propagation value is not provided
    this.propagation = props.propagation || constants.c;

    // signal has intensity of infinity at the moment of transmission
    this.intensity = Qty(0, 'W/m^2');
    this.txPower = props.txPower;

    // Path loss exponent
    // not used yet (zero attenuation in free space)
    this.ple = props.ple || 1;
    this.frequency = props.frequency;
    this.wavelength = this.propagation.div(this.frequency);
    this.radius = Qty(0, 'm');
  }

  selfTick(tick) {
    // new radius is old radius + speed of light * time
    this.radius = this.radius.add(this.propagation.mul(tick));

    // inverse square law
    // this will break if r = 0 (some power over zero area must yield infinite power per area)
    // note: this is assumes the signal is isotropically radiated signal.
    const a = Qty(this.radius.scalar ** 2, `${this.radius.units()}^2`).mul(Qty(4 * Math.PI, '1'));
    this.intensity = this.txPower.div(a);
  }

  hasIntersected(a) {
    // has the signal reached some point a?
    const d = util.distanceScalar(a, this.origin);
    return this.radius.gt(d);
  }

  // TODO: this is non-relativistic. delete and rewrite for electromagnetic waves and speeds
  // approaching c
  dopplerShift(v, p) {
    // for some object at p moving with v⃗, what doppler shift does it experience?
    // this breaks when they are at the same point
    const dir = util.unitVector(
      util.sumVecs([this.origin, p.map((x) => Qty(-x.scalar, x.units()))]),
    );

    // dot product
    const dot = v.map((c, k) => c.mul(dir[k])).reduce((a, b) => a.add(b));

    // doppler shift assuming source is stationary
    return ((dot.add(this.propagation)).div(this.propagation)).mul(this.frequency);
  }
}
