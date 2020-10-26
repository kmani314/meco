import * as THREE from 'three';
import m from 'mithril';
import './main.css';
import Qty from 'js-quantities';

export default function canvas() {
  let scene;
  let renderer;
  let camera;

  // objects that should be rendered

  return {
    oncreate(vnode) {
      const container = vnode.dom;
      scene = new THREE.Scene();

      // (FOV, aspect, near frustum, far frustum)
      camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        100000000000,
      );

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);

      container.appendChild(renderer.domElement);

      camera.position.y = Qty(900000, 'km').to('m').scalar;
      camera.rotation.x = -Math.PI / 2;

      vnode.attrs.obj.forEach((o) => scene.add(o.render(THREE)));

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    },
    view() {
      // camera.position = vnode.attrs.pos;
      return m('div', { class: 'container' });
    },
  };
}
