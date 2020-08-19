import { useRef, useEffect } from 'react';
import { createDrawFunction } from 'declarative-canvas';

import drawArc from './drawArc';
import { animationLoop } from './animationLoop';
import getInitialState from './getInitialState';
import stateReducer from './stateReducer';
import mapStateToRendererObjects from './mapStateToRendererObjects';
import runEvolution from './evolution';

const customDrawHandlers = {
  ARC: drawArc,
};

const useSimulation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const draw = createDrawFunction(customDrawHandlers);

    let pause = () => {};
    const run = async () => {
      const { getHighestFitnessIndividual } = await runEvolution();

      console.log(getHighestFitnessIndividual());
      const weights = getHighestFitnessIndividual().individual;

      const { setPause } = animationLoop({
        initialState: getInitialState(weights),
        stateReducer,
        mapStateToRendererObjects,
        render: (objectsToRender) => draw({ context, objects: objectsToRender }),
        maxDt: 100,
      });
      pause = () => setPause(true);
    };

    run();

    return () => {
      pause();
    };
  }, []);

  return { canvasRef };
};

export default useSimulation;
