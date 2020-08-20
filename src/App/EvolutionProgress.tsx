import React, { useEffect, useCallback, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import styles from './App.module.scss';
import runEvolution from './simulation/evolution';

const EvolutionProgress = ({ iterations, foodAvailability, onFinish }) => {
  const [currentIteration, setCurrentIteration] = useState(0);

  const iterationCallback = useCallback((iteration) => {
    setCurrentIteration(iteration);
  }, []);

  useEffect(() => {
    const run = async () => {
      const { getHighestFitnessIndividual } = await runEvolution({
        iterations,
        foodAvailability,
        iterationCallback,
      });
      console.log(getHighestFitnessIndividual());
      const weights = getHighestFitnessIndividual().individual;
      onFinish(weights);
    };
    run();
  }, [foodAvailability, iterations, onFinish, iterationCallback]);

  const progress = (100 * currentIteration) / iterations;

  return (
    <div className={styles.settingsContainer}>
      <Typography variant="h3" component="h1">
        Evolution In Progress
      </Typography>
      <div className={styles.settingsInnerBox}>
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="static" value={progress} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div">{`${Math.round(progress)}%`}</Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default EvolutionProgress;
