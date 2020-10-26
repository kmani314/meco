import Qty from 'js-quantities';
import object from './object';

export default class Planet extends object {
  constructor(initialState) {
    super(initialState);
    this.radius = initialState.radius || Qty(0, 'm');
    this.looks = undefined;
    // TODO: figure out rotation math (quaternions?)
    // this.rot = [0, 0, 0];
  }

  selfTick(tick) {
    // Use basic object tick then do planet specific logic
    super.selfTick(tick);

    this.looks.position.x = this.pos[0].to('m').scalar;
    this.looks.position.y = this.pos[1].to('m').scalar;
    this.looks.position.z = this.pos[2].to('m').scalar;
  }

  render(three) {
    // Handle rendering logic
    const geometry = new three.SphereGeometry(this.radius.to('m').scalar, 32, 32);
    const material = new three.MeshBasicMaterial({ color: 0x000000 });

    const geo = new three.EdgesGeometry(geometry); // or WireframeGeometry
    const mat = new three.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const wireframe = new three.LineSegments(geo, mat);

    this.looks = new three.Mesh(geometry, material);
    this.looks.add(wireframe);
    return this.looks;
  }
}
