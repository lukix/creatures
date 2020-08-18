import createCreature from './canvasComponents/createCreature';
import createFood from './canvasComponents/createFood';

const mapStateToRendererObjects = (state) => {
  const { objects } = state;

  return objects.map((object) => {
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
};

export default mapStateToRendererObjects;
