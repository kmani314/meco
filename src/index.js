import m from 'mithril';
import Qty from 'js-quantities';
import render from './render';
import Signal from './signal';

m.mount(document.body, {
  view: () => m(render),
});

const s1 = new Signal({
  txPower: Qty(100, 'W'),
  ple: 1,
  frequency: Qty(100, 'hz'),
});

s1.selfTick(Qty(1, 's'));

console.log(s1.intensity);

const v = [Qty(5000 ** 0.5, 'km/s'), Qty(5000 ** 0.5, 'km/s'), Qty(0, 'm/s')];
const p = [Qty(2 ** 0.5, 'm'), Qty(2 ** 0.5, 'm'), Qty(0, 'm')];

console.log(s1.dopplerShift(v, p));
