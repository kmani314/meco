import object from './object';

export default class Planet extends object {
  constructor(initialState) {
    super(initialState);
    this.radius = initialState.radius;
  }

  selfTick(tick) {
    super.selfTick(tick);
  }

  render(three) {
    // Handle rendering logic
  }
}
