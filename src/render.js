import * as THREE from 'three';
import m from 'mithril';
import './main.css';

import nx from './textures/nx.png';
import px from './textures/px.png';
import ny from './textures/ny.png';
import py from './textures/py.png';
import nz from './textures/nz.png';
import pz from './textures/pz.png';

export default function canvas() {
  const zoomScale = 2;
  const zoomDecel = 0.95;
  const maxWheel = 60;
  const minWheel = 5;
  const zoomMin = 1e1;
  const zoomMax = 1e5;
  let zoomVel = 0;
  let lastZoom = new Date();
  let sign = 1;
  let fps = 1;

  const rotScale = 0.008;
  const decel = 0.95;
  const eps = 1e-5;
  let tracking = false;
  let vels = [
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  let vel = {
    x: 0,
    y: 0,
  };

  let scene;
  let renderer;
  let camera;
  let spherical;
  let last;

  function handleMouseWheel(e) {
    sign = Math.sign(e.deltaY);
    zoomVel = zoomScale * (1 / (Math.max(Math.min(new Date() - lastZoom, maxWheel), minWheel)));
    lastZoom = new Date();
  }

  function handleMouseMove(e) {
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;

    spherical.phi += dy * rotScale;
    spherical.theta += -dx * rotScale;

    spherical.phi = Math.min(Math.max(spherical.phi, -Math.PI + eps), 0 - eps);

    const dt = Math.max(new Date() - last.t, 10);

    vels.shift();
    vels.push([
      (dx * rotScale) / dt,
      (dy * rotScale) / dt,
    ]);

    last = {
      x: e.clientX,
      y: e.clientY,
      t: new Date(),
    };
  }

  function handleMouseDown(e) {
    tracking = true;

    vels = [
      [0, 0],
      [0, 0],
      [0, 0],
    ];

    renderer.domElement.addEventListener('pointermove', handleMouseMove);

    last = {
      x: e.clientX,
      y: e.clientY,
      t: new Date(),
    };
  }

  function handleMouseUp() {
    tracking = false;
    renderer.domElement.removeEventListener('pointermove', handleMouseMove);
    vel = {
      x: vels.reduce((x, y) => x + y[0], 0) / vels.length,
      y: vels.reduce((x, y) => x + y[1], 0) / vels.length,
    };
  }

  return {
    oncreate(vnode) {
      setInterval(m.redraw, 500);
      const container = vnode.dom;
      scene = new THREE.Scene();

      // (FOV, aspect, near frustum, far frustum)
      camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1e18,
      );

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

      camera.add(directionalLight);
      scene.add(camera);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);

      renderer.domElement.addEventListener('wheel', handleMouseWheel);
      renderer.domElement.addEventListener('mousedown', handleMouseDown);
      renderer.domElement.addEventListener('mouseup', handleMouseUp);

      const loader = new THREE.CubeTextureLoader();

      const texture = loader.load([
        nx,
        px,
        py,
        ny,
        nz,
        pz,
      ]);
      scene.background = texture;

      const axesHelper = new THREE.AxesHelper(1e7);
      scene.add(axesHelper);

      spherical = new THREE.Spherical(1e1, -Math.PI / 8, 0);

      const cart = new THREE.Vector3();
      cart.setFromSpherical(spherical);

      container.appendChild(renderer.domElement);

      vnode.attrs.obj.forEach((o) => scene.add(o.render(THREE)));
      let lastFrame = new Date();

      const animate = () => {
        const position = vnode.attrs.obj.filter((o) => o.track)[0].pos.map((o) => o.to('Mm').scalar);

        const dt = new Date() - lastFrame;
        fps = 1000 / dt;

        if (!tracking) {
          spherical.phi += vel.y * dt;
          spherical.phi = Math.min(Math.max(spherical.phi, -Math.PI + 1e-3), 0 - 1e-3);

          spherical.theta -= vel.x * dt;

          vel.x *= decel;
          vel.y *= decel;

          if (Math.abs(vel.x) <= eps) vel.x = 0;
          if (Math.abs(vel.y) <= eps) vel.y = 0;
        }
        spherical.radius *= (sign > 0 ? 1 + zoomVel : 1 - zoomVel);
        spherical.radius = Math.max(Math.min(spherical.radius, zoomMax), zoomMin);

        zoomVel *= zoomDecel;
        if (Math.abs(zoomVel) <= eps) zoomVel = 0;

        lastFrame = new Date();
        cart.setFromSpherical(spherical);
        camera.position.set(
          cart.x + position[0],
          cart.y + position[1],
          cart.z + position[2],
        );

        camera.lookAt(position[0], position[1], position[2]);

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    },
    view() {
      return m('div', { class: 'container' },
        m('div', { class: 'stats-container' },
          m('p', { class: 'stats-content' }, `${fps.toFixed(0)} FPS`),
          m('p', { class: 'stats-content' }, `${(1 / (fps / 1000)).toFixed(0)} ms`)
        ));
    },
  };
}
