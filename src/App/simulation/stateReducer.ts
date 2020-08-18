const mapObjectsOfType = (type, mappingFn) => (object) => {
  if (object.type !== type) {
    return object;
  }
  return mappingFn(object);
};

const updateCreature = (creatureObject, dt) => {
  const eyeImage = [true, false, false, false, true];

  const velocity = 30;
  const angularVelocity = 0.6;

  const ds = velocity * dt;
  const dx = ds * Math.sin(creatureObject.heading);
  const dy = ds * Math.cos(creatureObject.heading);

  return {
    ...creatureObject,
    x: creatureObject.x + dx,
    y: creatureObject.y - dy,
    heading: creatureObject.heading + angularVelocity * dt,
    eyeImage,
  };
};

const stateReducer = (state, dt) => {
  return {
    ...state,
    objects: state.objects.map(
      mapObjectsOfType('CREATURE', (object) => {
        return updateCreature(object, dt);
      })
    ),
  };
};

export default stateReducer;
