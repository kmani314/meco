import m from 'mithril';
import Qty from 'js-quantities';
import ui from './ui';
import Signal from './signal';
import constants from './constants';
import Planet from './planet';
import gravity from './universe';

const earth = new Planet(
  {
    mass: constants.m_earth,
    radius: constants.r_earth,
  },
);

// earth.force = [Qty(0, 'N'), Qty(0, 'N'), Qty(1000000000000000000000000000, 'N')];

const moon = new Planet(
  {
    mass: constants.m_earth,
    radius: constants.r_earth,
    pos: [Qty(0, 'km'), Qty(0, 'km'), Qty(0, 'm')],
    vel: [Qty(0, 'km/s'), Qty(0, 'km/s'), Qty(0, 'km/s')],
  },
);

const body3 = new Planet(
  {
    mass: constants.m_moon,
    radius: constants.r_moon,
    pos: [Qty(385000, 'km'), Qty(0, 'km'), Qty(0, 'm')],
    vel: [Qty(0, 'km/s'), Qty(0, 'km/s'), Qty(1.018, 'km/s')],
  },
);

const obj = [earth, body3];

m.mount(document.body, {
  view: () => m(ui, { obj }),
});

const s1 = new Signal({
  txPower: Qty(100, 'W'),
  ple: 1,
  frequency: Qty(100, 'hz'),
});

s1.selfTick(Qty(1, 's'));

console.log(s1.intensity);

// magnitude of 10000 km/s
const v = [constants.c.div(Qty(2 ** 0.5, '1')), constants.c.div(Qty(2 ** 0.5, '1')), Qty(0, 'm/s')];
const p = [Qty(2 ** 0.5, 'm'), Qty(2 ** 0.5, 'm'), Qty(0, 'm')];

console.log(s1.dopplerShift(v, p));

setInterval(() => {
  let forces = gravity(obj);

  forces.forEach((f, i) => { obj[i].force = f; });
  obj.forEach((o) => o.selfTick(Qty(10000, 's')));
}, 1);
