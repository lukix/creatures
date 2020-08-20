import { visibilityAngle, visibilityRange, visibilityResolution } from './constants';
import { activationFunctions } from './brain';

const getInitialState = ({ weights, foodAvailability }) => {
  const foodObjects = new Array(foodAvailability).fill(null).map(() => ({
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
    brain: {
      weights,
      layersStructure: [
        { size: visibilityResolution, activateFunction: activationFunctions.SIGMOID },
        { size: 5, activateFunction: activationFunctions.SIGMOID },
        { size: 1, activateFunction: activationFunctions.SIGMOID },
      ],
    },
    tummyContent: 0,
  };

  return {
    objects: [...foodObjects, creature],
  };
};

export default getInitialState;
