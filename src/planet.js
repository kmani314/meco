import Qty from 'js-quantities';
import * as THREE from 'three';
import object from './object';

export default class Planet extends object {
  constructor(initialState) {
    super(initialState);
    this.radius = initialState.radius || Qty(0, 'm');
    this.looks = undefined;
    this.texture = initialState.texture;
    this.rotAxis = initialState.rotAxis || new THREE.Vector3(0, 1, 0);
    this.rotRate = initialState.rotRate || Qty(0.01, 'rad/hr');
  }

  selfTick(tick) {
    super.selfTick(tick);

    this.looks.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.rotRate.mul(tick).to('rad').scalar);
    [this.looks.position.x, this.looks.position.y, this.looks.position.z] = this.pos.map((o) => o.to('Mm').scalar);
  }

  render() {
    // Handle rendering logic
    const geometry = new THREE.SphereGeometry(this.radius.to('Mm').scalar, 32, 32);
    const material = this.texture || new THREE.MeshPhongMaterial({ color: 0xffffff });

    this.looks = new THREE.Mesh(geometry, material);
    this.looks.rotation.setFromVector3(this.rotAxis);
    return this.looks;
  }
}
