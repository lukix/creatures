import chunk from 'lodash.chunk';
import zip from 'lodash.zip';

export const activationFunctions = {
  SIGMOID: 'SIGMOID',
  IDENTITY: 'IDENTITY',
};

export const activate = (fnName, value) => {
  return {
    [activationFunctions.SIGMOID]: (x) => 2 / (1 + Math.exp(-x)) - 1,
    [activationFunctions.IDENTITY]: (x) => x,
  }[fnName](value);
};

const BIAS_NEURON_VALUE = 1;

export const getBrainOutput = (brain, inputs) => {
  const { weights, layersStructure } = brain;

  if (layersStructure.length < 2) {
    throw new Error('Network must have at least 2 layers');
  }

  const firstLayerWeightsNumber = (layersStructure[0].size + 1) * layersStructure[1].size;
  const firstLayerWeights = weights.slice(0, firstLayerWeightsNumber);
  const secondLayerValues = chunk(firstLayerWeights, layersStructure[0].size + 1).map((weights) => {
    const inputsSum = zip(weights, [...inputs, BIAS_NEURON_VALUE])
      .map(([weight, value]) => weight * value)
      .reduce((acc, curr) => acc + curr, 0);
    console.log(inputsSum);
    return activate(layersStructure[1].activateFunction, inputsSum);
  });

  if (layersStructure.length === 2) {
    return secondLayerValues;
  }

  return getBrainOutput(
    {
      ...brain,
      weights: weights.slice(firstLayerWeightsNumber),
      layersStructure: layersStructure.slice(1),
    },
    secondLayerValues
  );
};
