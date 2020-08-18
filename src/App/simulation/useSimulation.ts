import { useRef, useEffect } from 'react';
import { createDrawFunction } from 'declarative-canvas';

import drawArc from './drawArc';
import { animationLoop } from './animationLoop';
import getInitialState from './getInitialState';
import stateReducer from './stateReducer';
import mapStateToRendererObjects from './mapStateToRendererObjects';

const customDrawHandlers = {
  ARC: drawArc,
};

const useSimulation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const draw = createDrawFunction(customDrawHandlers);

    const { setPause } = animationLoop({
      initialState: getInitialState(),
      stateReducer,
      mapStateToRendererObjects,
      render: (objectsToRender) => draw({ context, objects: objectsToRender }),
    });

    return () => {
      setPause(true);
    };
  }, []);

  return { canvasRef };
};

export default useSimulation;
