import React, { useEffect, useRef } from "react";

import { LimboAnimation } from "./WebGl";
import css from "./style.module.scss";

export const Animation = () => {
  const canvasParent = useRef<HTMLDivElement>(null);
  const webGl = useRef<LimboAnimation>();

  useEffect(() => {
    if (canvasParent.current)
      webGl.current = new LimboAnimation(canvasParent.current);

    const play = (event: KeyboardEvent) => {
      if (event.code === "Space") webGl.current?.animate();
    };

    document.addEventListener("keypress", play);

    return () => {
      webGl.current?.destroy();
      document.removeEventListener("keypress", play);
    };
  }, []);

  return (
    <>
      <div ref={canvasParent} className={css.limboGame} />
      <h4>Press Space to start</h4>
    </>
  );
};
