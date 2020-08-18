const stateReducer = (state, dt) => {
  return {
    ...state,
    objects: state.objects.map((object) => {
      if (object.type !== 'CREATURE') {
        return object;
      }
      return { ...object, y: object.y - 10 * dt };
    }),
  };
};

export default stateReducer;
