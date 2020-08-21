import React from 'react';

import useSimulation from './simulation/useSimulation';
import styles from './Canvas.module.scss';

const Canvas = ({ foodAvailability, weights }) => {
  const { canvasRef } = useSimulation({ foodAvailability, weights });

  return <canvas className={styles.canvas} ref={canvasRef} width={1000} height={600} />;
};

export default Canvas;
