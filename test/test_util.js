import tap from 'tap';
import Qty from 'js-quantities';
import util from '../src/util';

tap.test('vector summation', (t) => {
  const a = [Qty(10, 'm'), Qty(-3, 'm'), Qty(3, 'm')];
  const b = [Qty(-3, 'm'), Qty(5, 'm'), Qty(-10, 'm')];

  const r = [Qty(7, 'm'), Qty(2, 'm'), Qty(-7, 'm')];

  util.sumVecs([a, b]).map((c, i) => t.ok(c.eq(r[i])));
  t.end();
});

tap.test('distance scalar', (t) => {
  const a = [Qty(50, 'm'), Qty(-3, 'm'), Qty(45, 'm')];
  const b = [Qty(-5, 'm'), Qty(10, 'm'), Qty(-3, 'm')];

  const e = Qty(74.148, 'm');
  const r = util.distanceScalar(a, b);
  t.ok(e.eq(Qty(+r.scalar.toFixed(3), r.units())));
  t.end();
});

tap.test('unit vector', (t) => {
  const a = [Qty(50, 'm'), Qty(-3, 'm'), Qty(45, 'm')];

  const r = util.unitVector(a);
  const mag = (r[0].scalar ** 2 + r[1].scalar ** 2 + r[2].scalar ** 2) ** 0.5;
  t.ok(mag === 1);
  t.end();
});
