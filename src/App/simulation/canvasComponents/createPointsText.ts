import { objectTypes } from 'declarative-canvas';

const createPointsText = ({ x, y, text }) => ({
  type: objectTypes.TEXT,
  x,
  y,
  text,
  contextProps: { fillStyle: 'white', font: '20px seif', textAlign: 'left', textBaseline: 'top' },
});

export default createPointsText;
