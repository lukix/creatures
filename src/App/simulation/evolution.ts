import Genemo from 'genemo';

import getInitialState from './getInitialState';
import stateReducer from './stateReducer';

const evaluateIndividual = (weights) => {
  const initialState = getInitialState(weights);
  const simulationTime = 90; // seconds
  const dt = 6 / 60;
  const timeSteps = new Array((simulationTime * 1) / dt).fill(null);
  const finalState = timeSteps.reduce((state) => {
    return stateReducer(state, dt);
  }, initialState);
  return finalState.objects.find(({ type }) => type === 'CREATURE').tummyContent;
};

const fitnessFunction = (weights) => {
  const attempt1 = evaluateIndividual(weights);
  const attempt2 = evaluateIndividual(weights);
  const attempt3 = evaluateIndividual(weights);
  return (attempt1 + attempt2 + attempt3) / 3;
};

const generateIndividual = () => {
  const weights = new Array(4 * 5 + 6 * 1).fill(null).map(() => 2 * Math.random() - 1);
  return weights;
};

const POPULATION_SIZE = 20;

const runEvolution = () => {
  return Genemo.run({
    generateInitialPopulation: Genemo.generateInitialPopulation({
      generateIndividual,
      size: POPULATION_SIZE,
    }),
    selection: Genemo.selection.roulette({ minimizeFitness: false }),
    succession: Genemo.elitism({ keepFactor: 1 / POPULATION_SIZE, minimizeFitness: false }),
    reproduce: Genemo.reproduce({
      // crossover: Genemo.crossover.kPoint(2),
      crossover: Genemo.crossover.uniform(),
      mutate: Genemo.mutation.transformRandomGene((weight) => weight + Math.random() - 0.5),
      mutationProbability: 0.03,
    }),
    evaluatePopulation: Genemo.evaluatePopulation({
      fitnessFunction,
    }),
    stopCondition: Genemo.stopCondition({ maxIterations: 100 }),
    iterationCallback: Genemo.logIterationData({
      include: {
        iteration: { show: true },
        avgFitness: { show: true },
        maxFitness: { show: true },
        logsKeys: [{ key: 'lastIteration' }, { key: 'fitness' }],
      },
    }),
  });
};

export default runEvolution;
