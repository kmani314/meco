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

  const texture = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(earthmap),
    bumpMap: new THREE.TextureLoader().load(earthbump),
  });

  const earth = new Planet(
    {
      mass: constants.m_earth,
      radius: constants.r_sun,
      texture,
      pos: [Qty(9.3e7, 'mi'), Qty(0, 'km'), Qty(0, 'm')],
      vel: [Qty(0, 'km/s'), Qty(0, 'km/s'), Qty(6.7e4, 'mi/h')],
    },
  );

  // const moon = new Planet(
  //   {
  //     mass: constants.m_moon,
  //     radius: constants.r_moon,
  //     pos: [Qty(385000, 'km'), Qty(0, 'km'), Qty(0, 'm')],
  //     vel: [Qty(0, 'km/s'), Qty(0, 'km/s'), Qty(1.018, 'km/s')],
  //     track: false,
  //   },
  // );

  const sun = new Planet(
    {
      mass: constants.m_sun,
      radius: constants.r_sun,
      track: true,
    },
  );

  const obj = [earth, sun];
  return {
    view() {
      clearInterval(interval);

      interval = setInterval(() => {
        const forces = gravity(obj);

        forces.forEach((f, i) => { obj[i].force = f; });
        obj.forEach((o) => o.selfTick(Qty(1000, 's')));
      }, 1);

      return [m(canvas, { obj }),
        m('div', { class: `${infoPane ? 'info-pane' : 'info-pane-open'}` },
          m('p', { style: 'position: absolute; left: 0; margin-left: 1em;' }, 'meco v0.1'),
          m(svg.arrow, {
            class: infoPane ? 'info-pane-pull' : 'info-pane-pull-rotated',
            stroke: '#fff',
            onclick: () => { infoPane = !infoPane; },
          }),
          m('div', { class: 'info-pane-content' })),
      ];
    },
  };
}

m.mount(document.body, {
  view: () => m(meco),
});
