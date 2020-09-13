import tap from 'tap';
import Qty from 'js-quantities';
import constants from '../src/constants';
import Signal from '../src/signal';

tap.test('properties of a signal', (t) => {
  const s1 = new Signal({
    txPower: Qty(100, 'W'),
    frequency: Qty(100, 'hz'),
  });

  s1.selfTick(Qty(1, 's'));
  // defaults to c
  t.ok(s1.radius.eq(constants.c.mul(Qty(1, 's'))));

  const e = 8.84194128288308e-17;
  // intensity must decrease
  t.ok(s1.intensity.eq(Qty(e, 'W/m^2')));
  t.end();
});

tap.test('intersection conditions', (t) => {
  const s1 = new Signal({
    txPower: Qty(100, 'W'),
    frequency: Qty(100, 'hz'),
  });

  const a = [Qty(100, 'm'), Qty(100, 'm'), Qty(100, 'm')];

  t.notOk(s1.hasIntersected(a));

  s1.selfTick(Qty(1, 's'));
  t.ok(s1.hasIntersected(a));

  t.end();
});

tap.test('doppler shift', (t) => {
  const s1 = new Signal({
    txPower: Qty(100, 'W'),
    ple: 1,
    frequency: Qty(100, 'hz'),
  });

  const v = [constants.c.div(Qty(2 ** 0.5, '1')), constants.c.div(Qty(2 ** 0.5, '1')), Qty(0, 'm/s')];
  const p = [Qty(2 ** 0.5, 'm'), Qty(2 ** 0.5, 'm'), Qty(0, 'm')];

  const r = s1.dopplerShift(v, p);
  // moving at the propagation speed away from the source, the frequency should be zero
  const e = Qty(0, 'hz');
  t.ok(r.eq(e));

  // moving at the propagation speed towards the source, the frequency should be 2f
  const v2 = [constants.c.div(Qty(-(2 ** 0.5), '1')), constants.c.div(Qty(-(2 ** 0.5), '1')), Qty(0, 'm/s')];

  const r2 = s1.dopplerShift(v2, p);
  const e2 = Qty(200, 'hz');

  t.ok(r2.eq(e2));
  t.end();
});
