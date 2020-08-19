import { visibilityAngle, visibilityRange, visibilityResolution } from './constants';
import { activationFunctions } from './brain';

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
    brain: {
      weights: new Array(4 * 3 + 4 * 1).fill(null).map(() => 2 * Math.random() - 1),
      layersStructure: [
        { size: visibilityResolution, activateFunction: activationFunctions.SIGMOID },
        { size: 3, activateFunction: activationFunctions.SIGMOID },
        { size: 1, activateFunction: activationFunctions.SIGMOID },
      ],
    },
  };

  return {
    objects: [...foodObjects, creature],
  };
};

export default getInitialState;
