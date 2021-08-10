import Qty from 'js-quantities';
import object from './object';

export default class Planet extends object {
  constructor(initialState) {
    super(initialState);
    this.radius = initialState.radius || Qty(0, 'm');
    this.looks = undefined;
    this.texture = initialState.texture;
  }

  selfTick(tick) {
    super.selfTick(tick);

    this.looks.position.x = this.pos[0].to('m').scalar;
    this.looks.position.y = this.pos[1].to('m').scalar;
    this.looks.position.z = this.pos[2].to('m').scalar;
  }

  render(three) {
    // Handle rendering logic
    const geometry = new three.SphereGeometry(this.radius.to('m').scalar, 32, 32);
    const material = this.texture || new three.MeshPhongMaterial({ color: 0xffffff });

    this.looks = new three.Mesh(geometry, material);
    return this.looks;
  }
}
