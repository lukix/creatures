import { objectTypes, drawMethods } from "declarative-canvas";

const createEye = ({ x, y }) => ({
  type: objectTypes.CIRCLE,
  x,
  y,
  radius: 2,
  contextProps: { fillStyle: "black" },
});

const createCreature = ({ x, y }) => {
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
  const tail = {
    type: objectTypes.PATH,
    drawMethod: drawMethods.STROKE,
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 15 },
    ],
    contextProps: { lineWidth: 2 },
  };

  return {
    type: objectTypes.TRANSFORM,
    dx: x,
    dy: y,
    contextProps: { fillStyle: "white", strokeStyle: "white" },
    children: [...headElements, tail],
  };
};

export default createCreature;
