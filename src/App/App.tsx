import React from "react";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.canvasWrapper}>
      <canvas className={styles.canvas} />
    </div>
  );
};

export default App;
