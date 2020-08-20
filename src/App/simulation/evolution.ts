import Genemo from 'genemo';
import zip from 'lodash.zip';
import chunk from 'lodash.chunk';

import getInitialState from './getInitialState';
import stateReducer from './stateReducer';

const executeAsynchronously = (fn) =>
  new Promise((res) => {
    setTimeout(() => res(fn()), 1);
  });

const updateStateByMultipleSteps = (initialState, iterations, dt) => {
  return new Array(iterations).fill(null).reduce((prevState) => {
    return stateReducer(prevState, dt);
  }, initialState);
};

const evaluateIndividual = async (weights, foodAvailability) => {
  const initialState = getInitialState({ weights, foodAvailability });
  const simulationTime = 90; // seconds
  const dt = 6 / 60;
  const timeSteps = chunk(new Array(simulationTime / dt).fill(null), 100);
  const finalState = await timeSteps.reduce((prevState, { length: timeStepsNumber }) => {
    return prevState.then((s) =>
      executeAsynchronously(() => updateStateByMultipleSteps(s, timeStepsNumber, dt))
    );
  }, Promise.resolve(initialState));
  return finalState.objects.find(({ type }) => type === 'CREATURE').tummyContent;
};

const generateIndividual = () => {
  const weights = new Array(4 * 5 + 6 * 1).fill(null).map(() => 10 * (Math.random() - 0.5));
  return weights;
};

const POPULATION_SIZE = 20;

const runEvolution = ({ iterations, foodAvailability, iterationCallback }) => {
  return Genemo.run({
    generateInitialPopulation: Genemo.generateInitialPopulation({
      generateIndividual,
      size: POPULATION_SIZE,
    }),
    selection: Genemo.selection.roulette({ minimizeFitness: false }),
    succession: Genemo.elitism({ keepFactor: 1 / POPULATION_SIZE, minimizeFitness: false }),
    reproduce: Genemo.reproduce({
      crossover: ([parentA, parentB]) => {
        return [
          zip(parentA, parentB).map(([a, b]) => 0.6 * a + 0.4 * b),
          zip(parentA, parentB).map(([a, b]) => 0.4 * a + 0.6 * b),
        ];
      },
      mutate: Genemo.mutation.transformRandomGene((weight) => weight + Math.random() - 0.5),
      mutationProbability: 0.1,
    }),
    evaluatePopulation: (individuals) =>
      Promise.all(
        individuals.map((individual) => evaluateIndividual(individual, foodAvailability))
      ),
    stopCondition: Genemo.stopCondition({ maxIterations: iterations }),
    iterationCallback: (...args) => {
      Genemo.logIterationData({
        include: {
          iteration: { show: true },
          avgFitness: { show: true },
          maxFitness: { show: true },
          logsKeys: [{ key: 'lastIteration' }, { key: 'fitness' }],
        },
      })(...args);
      iterationCallback(args[0].iteration);
    },
  });
};

export default runEvolution;
