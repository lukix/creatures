import { visibilityAngle, visibilityRange, visibilityResolution } from './constants';
import { getBrainOutput } from './brain';

const normalizeAngle = (angle) => {
  if (angle > Math.PI) {
    return angle - 2 * Math.PI;
  }

  if (angle < -Math.PI) {
    return angle + 2 * Math.PI;
  }

  return angle;
};

const getFoodAngle = (foodObject, creatureObject) => {
  const dx = foodObject.x - creatureObject.x;
  const dy = foodObject.y - creatureObject.y;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  if (dx < 0 && dy >= 0) {
    // range: from -PI to PI/2
    return -Math.PI + Math.atan(adx / ady);
  }
  if (dx < 0 && dy < 0) {
    // range: from -PI/2 to 0
    return -Math.atan(adx / ady);
  }
  if (dx >= 0 && dy < 0) {
    // range: from 0 to PI/2
    return Math.atan(adx / ady);
  }
  if (dx >= 0 && dy >= 0) {
    // range: from PI/2 to PI
    return Math.PI - Math.atan(adx / ady);
  }
};

const getEyeImage = (creatureObject, objects) => {
  const foodObjects = objects.filter(({ type }) => type === 'FOOD');
  const objectsInRange = foodObjects.filter(
    ({ x, y }) => Math.hypot(x - creatureObject.x, y - creatureObject.y) < visibilityRange
  );
  const objectsAngles = objectsInRange.map((object) => {
    return {
      angle: normalizeAngle(getFoodAngle(object, creatureObject) - creatureObject.heading),
      x: object.x - 500,
      y: object.y - 300,
    };
  });
  return new Array(visibilityResolution).fill(null).map((_, index) => {
    return objectsAngles.filter(
      ({ angle }) =>
        angle > -visibilityAngle / 2 + (index * visibilityAngle) / visibilityResolution &&
        angle < -visibilityAngle / 2 + ((index + 1) * visibilityAngle) / visibilityResolution
    ).length;
  });
};

const updateCreature = (creatureObject, dt, objects) => {
  const eyeImage = getEyeImage(creatureObject, objects);

  const velocity = 60;
  const [output] = getBrainOutput(creatureObject.brain, eyeImage);
  const angularVelocity = 2 * output;

  const ds = velocity * dt;
  const dx = ds * Math.sin(creatureObject.heading);
  const dy = ds * Math.cos(creatureObject.heading);

  return {
    ...creatureObject,
    x: creatureObject.x + dx,
    y: creatureObject.y - dy,
    heading: normalizeAngle(creatureObject.heading + angularVelocity * dt),
    eyeImage,
  };
};

const stateReducer = (state, dt) => {
  const creatureObject = state.objects.find(({ type }) => type === 'CREATURE');
  const objectsWithoutEatenFood = state.objects.filter((object) => {
    if (object.type === 'FOOD') {
      return Math.hypot(creatureObject.x - object.x, creatureObject.y - object.y) > 8;
    }
    return true;
  });
  const eatenFoodsNumber = state.objects.length - objectsWithoutEatenFood.length;
  return {
    ...state,
    objects: objectsWithoutEatenFood.map((object) => {
      if (object.type === 'CREATURE') {
        return {
          ...updateCreature(object, dt, state.objects),
          tummyContent: object.tummyContent + eatenFoodsNumber,
        };
      }
      return object;
    }),
  };
};

export default stateReducer;
