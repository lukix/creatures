import { objectTypes } from 'declarative-canvas';

const createFood = ({ x, y }) => ({
  type: objectTypes.CIRCLE,
  x,
  y,
  radius: 2,
  contextProps: { fillStyle: '#99f' },
});

export default createFood;
