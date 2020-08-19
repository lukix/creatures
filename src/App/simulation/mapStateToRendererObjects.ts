import createCreature from './canvasComponents/createCreature';
import createFood from './canvasComponents/createFood';
import createPointsText from './canvasComponents/createPointsText';

const mapStateToRendererObjects = (state) => {
  const { objects } = state;

  const gameObjects = objects.map((object) => {
    switch (object.type) {
      case 'FOOD':
        return createFood({ x: object.x, y: object.y });
      case 'CREATURE':
        return createCreature({
          x: object.x,
          y: object.y,
          heading: object.heading,
          eyeImage: object.eyeImage,
          visibilityAngle: object.visibilityAngle,
          visibilityRange: object.visibilityRange,
          showVisibilityRange: true,
        });
      default:
        throw new Error('Unexpected simulation object type');
    }
  });

  const uiObjects = [
    createPointsText({
      x: 20,
      y: 20,
      text: `Points: ${objects.find(({ type }) => type === 'CREATURE').tummyContent}`,
    }),
  ];

  return [...gameObjects, ...uiObjects];
};

export default mapStateToRendererObjects;
