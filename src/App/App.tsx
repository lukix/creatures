import React, { useRef, useEffect } from "react";
import { createDrawFunction, objectTypes } from "declarative-canvas";

import createCreature from "./createCreature";
import styles from "./App.module.scss";

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const objectsToRender = [
      createCreature({ x: 500, y: 300 }),
      createCreature({ x: 340, y: 270 }),
    ];

    const draw = createDrawFunction();

    draw({ context, objects: objectsToRender });
  }, []);

  return (
    <div className={styles.canvasWrapper}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={1000}
        height={600}
      />
    </div>
  );
};

export default App;
