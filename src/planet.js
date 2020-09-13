import Qty from 'js-quantities';
import object from './object';

export default class Planet extends object {
  constructor(initialState) {
    super(initialState);
    this.radius = initialState.radius || Qty(0, 'm');
    // TODO: figure out rotation math (quaternions?)
    // this.rot = [0, 0, 0];
  }

  selfTick(tick) {
    // Use basic object tick then do planet specific logic
    super.selfTick(tick);
  }

  render(three) {
    // Handle rendering logic
  }
}
