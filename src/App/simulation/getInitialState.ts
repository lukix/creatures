import { visibilityAngle, visibilityRange } from './constants';

const getInitialState = () => {
  const foodObjects = new Array(200).fill(null).map(() => ({
    type: 'FOOD',
    x: Math.random() * 1000,
    y: Math.random() * 600,
  }));

  const creature = {
    type: 'CREATURE',
    x: 500,
    y: 300,
    heading: 0,
    visibilityAngle,
    visibilityRange,
  };

  return {
    objects: [...foodObjects, creature],
  };
};

export default getInitialState;
