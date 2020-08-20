import React, { useState, useCallback } from 'react';

import Settings from './Settings';
import EvolutionProgress from './EvolutionProgress';
import Canvas from './Canvas';
import styles from './App.module.scss';

const App = () => {
  const [step, setStep] = useState(0);
  const [iterations, setIterations] = useState(20);
  const [foodAvailability, setFoodAvailability] = useState(200);
  const [weights, setWeights] = useState(null);

  const start = async () => {
    setStep((s) => s + 1);
    console.log('START');
  };

  const onEvolutionFinish = useCallback((trainedWeights) => {
    setWeights(trainedWeights);
    setStep((s) => s + 1);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.mainContainer}>
        {
          {
            0: (
              <Settings
                iterations={iterations}
                foodAvailability={foodAvailability}
                setIterations={setIterations}
                setFoodAvailability={setFoodAvailability}
                onStart={start}
              />
            ),
            1: (
              <EvolutionProgress
                iterations={iterations}
                foodAvailability={foodAvailability}
                onFinish={onEvolutionFinish}
              />
            ),
            2: (
              <Canvas
                iterations={iterations}
                foodAvailability={foodAvailability}
                weights={weights}
              />
            ),
          }[step]
        }
      </div>
    </div>
  );
};

export default App;
