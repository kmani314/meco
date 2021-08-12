import Qty from 'js-quantities';
import m from 'mithril';
import * as THREE from 'three';
import svg from './svg';
import canvas from './render';
import gravity from './forces';
import './main.css';
import constants from './constants';
import Planet from './planet';
import earthmap from './textures/earthmap1k.jpg';
import earthspec from './textures/earthspec1k.jpg';
import earthbump from './textures/earthbump1k.jpg';

function meco() {
  let infoPane = true;
  let interval;
  let fac = 3;

  const texture = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(earthmap),
    bumpMap: new THREE.TextureLoader().load(earthbump),
    bumpScale: 0.5,
    specularMap: new THREE.TextureLoader().load(earthspec)
  });

  const earth = new Planet(
    {
      mass: constants.m_earth,
      radius: constants.r_earth,
      rotRate: Qty(2 * Math.PI, 'rad').div(Qty(1, 'day')),
      rotAxis: new THREE.Vector3().setFromSphericalCoords(1, Qty(23.5, 'deg').to('rad').scalar, 0),
      texture,
      // pos: [Qty(9.3e7, 'mi'), Qty(0, 'km'), Qty(0, 'm')],
      // vel: [Qty(0, 'km/s'), Qty(0, 'km/s'), Qty(6.7e4, 'mi/h')],
      track: true,
    },
  );

  const moon = new Planet(
    {
      mass: constants.m_moon,
      radius: constants.r_moon,
      pos: [Qty(385000, 'km'), Qty(0, 'km'), Qty(0, 'm')],
      vel: [Qty(0, 'km/s'), Qty(0, 'km/s'), Qty(1.018, 'km/s')],
      track: false,
    },
  );

  const sun = new Planet(
    {
      mass: constants.m_sun,
      radius: constants.r_sun,
      texture,
      track: true,
    },
  );

  const obj = [earth, moon];
  return {
    view() {
      clearInterval(interval);

      let last = new Date();
      interval = setInterval(() => {
        const forces = gravity(obj);

        forces.forEach((f, i) => { obj[i].force = f; });
        obj.forEach((o) => o.selfTick(Qty((new Date() - last) * (10 ** fac), 'ms')));
        last = new Date();
      }, 1);

      return [m(canvas, { obj }),
        m('div', { class: `${infoPane ? 'info-pane' : 'info-pane-open'}` },
          m('p', { style: 'position: absolute; left: 0; margin-left: 1em; user-select: none;' }, 'meco v0.1'),
          m(svg.arrow, {
            class: infoPane ? 'info-pane-pull' : 'info-pane-pull-rotated',
            onclick: () => { infoPane = !infoPane; },
          }),
          m('div', { class: 'info-pane-content' },
            m('input', {
              type: 'range',
              class: 'slider',
              min: 0,
              max: 10,
              value: fac,
              oninput: (e) => {
                fac = e.target.value;
              },
            }))),
      ];
    },
  };
}

m.mount(document.body, {
  view: () => m(meco),
});
