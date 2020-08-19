import { getBrainOutput, activationFunctions } from '../brain';

describe('brain', () => {
  describe('getBrainOutput', () => {
    it('should return correct output', () => {
      // given
      const weightsMatrix = [
        [1, 1, 2, 1, 1, 3],
        [1, 1, 4],
      ];
      const brain = {
        weights: [...weightsMatrix[0], ...weightsMatrix[1]],
        layersStructure: [
          { size: 2 },
          { size: 2, activateFunction: activationFunctions.IDENTITY },
          { size: 1, activateFunction: activationFunctions.IDENTITY },
        ],
      };
      const inputs = [0.2, 0.5];
      const expectedOutputs = [0.2 + 0.5 + 2 + 0.2 + 0.5 + 3 + 4];

      // when
      const outputs = getBrainOutput(brain, inputs);

      // then
      expect(outputs).toEqual(expectedOutputs);
    });

    it('should use activation function', () => {
      // given
      const brain = {
        weights: [1000000, 2000000],
        layersStructure: [{ size: 1 }, { size: 1, activateFunction: activationFunctions.SIGMOID }],
      };
      const inputs = [0.2];
      const expectedOutputs = [1];

      // when
      const outputs = getBrainOutput(brain, inputs);

      // then
      expect(outputs).toEqual(expectedOutputs);
    });
  });
});
