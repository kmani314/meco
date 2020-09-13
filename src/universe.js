import Qty from 'js-quantities';
import constants from './constants';
import util from './util';

function gravity(objects) {
  // forces on each object
  /* eslint-disable-next-line */
  const forces = Array.from(new Array(objects.length)).fill(Array.from(new Array(objects[0].pos.length)).fill(Qty(0, 'N')));

  for (let i = 0; i < objects.length; i += 1) {
    for (let j = i + 1; j < objects.length; j += 1) {
      const a = objects[i];
      const b = objects[j];
      const r = util.distanceScalar(a.pos, b.pos);

      // f = GmM/r^2
      const force = constants.G.mul(a.mass).mul(b.mass).div(Qty(r.scalar ** 2, 'm^2'));

      // the direction in which gravity points
      const dir = util.unitVector(
        util.sumVecs([a.pos, b.pos.map((x) => Qty(-x.scalar, x.units()))]),
      );

      // same force on both objects
      forces[i] = forces[i].map((c, k) => c.sub(dir[k].mul(force)));
      forces[j] = forces[j].map((c, k) => c.add(dir[k].mul(force)));
    }
  }
  return forces;
}

export default gravity;
