import { objectTypes } from 'declarative-canvas';

const createEye = ({ x, y }) => ({
  type: objectTypes.CIRCLE,
  x,
  y,
  radius: 2,
  contextProps: { fillStyle: 'black' },
});

const createCreature = ({
  x,
  y,
  heading,
  eyeImage,
  visibilityAngle,
  visibilityRange,
  showVisibilityRange = false,
}) => {
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

  const visibilityResolution = eyeImage.length;
  const rightAngle = Math.PI / 2;
  const rangeCircles = new Array(visibilityResolution).fill(null).map((_, index) => ({
    type: 'ARC',
    x: 0,
    y: 0,
    radius: visibilityRange,
    startAngle:
      -visibilityAngle / 2 - rightAngle + (index * visibilityAngle) / visibilityResolution,
    endAngle:
      -visibilityAngle / 2 - rightAngle + ((index + 1) * visibilityAngle) / visibilityResolution,
    contextProps: {
      fillStyle: `rgba(255, 255, 255, ${eyeImage[index] ? 0.3 : index % 2 ? 0.2 : 0.2})`,
    },
  }));

  return {
    type: objectTypes.TRANSFORM,
    dx: x,
    dy: y,
    rotation: heading,
    contextProps: { fillStyle: 'white', strokeStyle: 'white' },
    children: [...headElements, body, ...(showVisibilityRange ? rangeCircles : [])],
  };
};

export default createCreature;
