import { objectTypes } from 'declarative-canvas';

const createEye = ({ x, y }) => ({
  type: objectTypes.CIRCLE,
  x,
  y,
  radius: 2,
  contextProps: { fillStyle: 'black' },
});

const createCreature = ({ x, y, heading, showVisibilityRange = false }) => {
  const headElements = [
    {
      type: objectTypes.CIRCLE,
      x: 0,
      y: 0,
      radius: 8,
    },
    createEye({ x: -3, y: -3 }),
    createEye({ x: 3, y: -3 }),
  ];
  const body = {
    type: objectTypes.CIRCLE,
    x: 0,
    y: 12,
    radius: 8,
  };
  const rangeCircle = {
    type: 'ARC',
    x: 0,
    y: 0,
    radius: 100,
    startAngle: -Math.PI / 5 - Math.PI / 2,
    endAngle: Math.PI / 5 - Math.PI / 2,
    contextProps: { fillStyle: 'rgba(255, 255, 255, 0.2)' },
  };

  return {
    type: objectTypes.TRANSFORM,
    dx: x,
    dy: y,
    rotation: heading,
    contextProps: { fillStyle: 'white', strokeStyle: 'white' },
    children: [...headElements, body, ...(showVisibilityRange ? [rangeCircle] : [])],
  };
};

export default createCreature;
