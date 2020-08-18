const mapObjectsOfType = (type, mappingFn) => (object) => {
  if (object.type !== type) {
    return object;
  }
  return mappingFn(object);
};

const moveCreature = (creatureObject, dt) => {
  const ds = 30 * dt;
  const dx = ds * Math.sin(creatureObject.heading);
  const dy = ds * Math.cos(creatureObject.heading);

  return {
    ...creatureObject,
    x: creatureObject.x + dx,
    y: creatureObject.y - dy,
    heading: creatureObject.heading + 0.6 * dt,
  };
};

const stateReducer = (state, dt) => {
  return {
    ...state,
    objects: state.objects.map(
      mapObjectsOfType('CREATURE', (object) => {
        return moveCreature(object, dt);
      })
    ),
  };
};

export default stateReducer;
