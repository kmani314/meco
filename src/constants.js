import Qty from 'js-quantities';

export default {
  G: new Qty(6.67408 * 10 ** -11, 'm3 kg-1 s-2'), // gravitational constant
  c: new Qty(3.0 * 10 ** 8, 'm/s'), // speed of light in a vacuum
  m_earth: new Qty(5.972 * 10 ** 24, 'kg'),
  r_earth: new Qty(6371, 'km'),
  m_sun: new Qty(1.989 * 10 ** 30, 'kg'),
  r_sun: new Qty(6.963 * 10 ** 5, 'km'),
  m_moon: new Qty(7.348 * 10 ** 22, 'kg'),
  r_moon: new Qty(1737, 'km'),
};
