import React, { useRef, useEffect } from "react";
import { createDrawFunction } from "declarative-canvas";

import createCreature from "./canvasComponents/createCreature";
import createFood from "./canvasComponents/createFood";
import drawArc from "./drawArc";
import styles from "./App.module.scss";

const customDrawHandlers = {
  ARC: drawArc,
};

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const foodObjects = new Array(200).fill(1).map(() => ({
      x: Math.random() * 1000,
      y: Math.random() * 600,
    }));

    const objectsToRender = [
      ...foodObjects.map(({ x, y }) => createFood({ x, y })),
      createCreature({ x: 500, y: 300, showVisibilityRange: true }),
    ];

    const draw = createDrawFunction(customDrawHandlers);

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
