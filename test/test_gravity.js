import tap from 'tap';
import Qty from 'js-quantities';
import constants from '../src/constants';
import gravity from '../src/universe';

tap.test('moon earth gravitation', (t) => {
  // the earth
  const earth = {
    pos: [Qty(0, 'm'), Qty(0, 'm'), Qty(0, 'm')],
    mass: constants.m_earth,
  };

  // the moon
  const moon = {
    pos: [Qty(3.84 * 10 ** 5, 'km'), Qty(0, 'km'), Qty(0, 'm')],
    mass: constants.m_moon,
  };

  const e = 198617680612847200000;
  const r = gravity([earth, moon]);
  t.ok(r[0][0].scalar === e);
  // is the force on the other object the opposite? (attractiveness?)
  t.ok(r[1][0].scalar === -e);
  t.end();
});
