import React from 'react';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import styles from './App.module.scss';

const Settings = ({
  iterations,
  foodAvailability,
  setIterations,
  setFoodAvailability,
  onStart,
}) => {
  return (
    <div className={styles.settingsContainer}>
      <Typography variant="h3" component="h1">
        Simulation Settings
      </Typography>
      <div className={styles.settingsInnerBox}>
        <div className={styles.settingSection}>
          <Typography id="discrete-slider-small-steps" gutterBottom>
            Iterations
          </Typography>
          <Slider
            value={iterations}
            aria-labelledby="discrete-slider-small-steps"
            step={5}
            marks
            min={5}
            max={100}
            valueLabelDisplay="auto"
            onChange={(event, value) => setIterations(value)}
          />
        </div>
        <div className={styles.settingSection}>
          <Typography id="discrete-slider-small-steps" gutterBottom>
            Food Availability
          </Typography>
          <Slider
            value={foodAvailability}
            aria-labelledby="discrete-slider-small-steps"
            step={25}
            marks
            min={50}
            max={400}
            valueLabelDisplay="auto"
            onChange={(event, value) => setFoodAvailability(value)}
          />
        </div>
        <Button variant="contained" color="primary" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default Settings;
