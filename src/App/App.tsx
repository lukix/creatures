import React from 'react';

import useSimulation from './simulation/useSimulation';
import styles from './App.module.scss';

const App = () => {
  const { canvasRef } = useSimulation();

  return (
    <div className={styles.canvasWrapper}>
      <canvas className={styles.canvas} ref={canvasRef} width={1000} height={600} />
    </div>
  );
};

export default App;
