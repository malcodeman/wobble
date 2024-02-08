import { Graphics as PixiGraphics, useTick } from "@pixi/react";
import { Graphics } from "pixi.js";
import { useState } from "react";

type Props = {
  draw: (g: Graphics) => void;
  isPlaying: boolean;
  x: number;
  y: number;
  duration: number;
};

const Shape = (props: Props) => {
  const { draw, isPlaying, x, y, duration } = props;
  const [angle, setAngle] = useState(0);

  useTick((delta) => {
    const rotationPerTick = 360 / (duration * 60);
    setAngle((prev) => (prev + rotationPerTick * delta) % 360);
  }, isPlaying);

  return (
    <PixiGraphics
      draw={draw}
      angle={isPlaying ? angle : undefined}
      anchor={0.5}
      x={x}
      y={y}
    />
  );
};

export default Shape;
