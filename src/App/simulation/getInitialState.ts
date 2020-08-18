const getInitialState = () => {
  const foodObjects = new Array(200).fill(1).map(() => ({
    type: 'FOOD',
    x: Math.random() * 1000,
    y: Math.random() * 600,
  }));

  const creature = { type: 'CREATURE', x: 500, y: 300, heading: 0 };

  return {
    objects: [...foodObjects, creature],
  };
};

export default getInitialState;
