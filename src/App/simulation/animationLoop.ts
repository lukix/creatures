export const animationLoop = ({
  initialState,
  stateReducer,
  mapStateToRendererObjects,
  render,
  getTime = () => new Date().getTime(),
  maxDt = Infinity,
}) => {
  let state = initialState;
  let time = getTime();
  let isPaused = true;

  const executeIteration = () => {
    const currentTime = getTime();
    const dt = Math.min(currentTime - time, maxDt);
    time = currentTime;
    state = stateReducer(state, dt / 1000);
    const rendererObjects = mapStateToRendererObjects(state);
    render(rendererObjects);
    if (!isPaused) {
      requestAnimationFrame(executeIteration);
    }
  };

  const setPause = (paused) => {
    isPaused = typeof paused === 'function' ? paused(isPaused) : paused;
    if (!isPaused) {
      requestAnimationFrame(executeIteration);
    }
  };

  setPause(false);
  return { setPause };
};
