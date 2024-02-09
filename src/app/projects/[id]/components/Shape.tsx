import { Graphics as PixiGraphics, useTick } from "@pixi/react";
import { Graphics } from "pixi.js";
import { useState } from "react";
import "@pixi/events";

type Props = {
  draw: (g: Graphics) => void;
  onColorChange: () => void;
  isPlaying: boolean;
  x: number;
  y: number;
  duration: number;
};

const Shape = (props: Props) => {
  const { draw, onColorChange, isPlaying, x, y, duration } = props;
  const [angle, setAngle] = useState(0);

  useTick((delta) => {
    const rotationPerTick = 360 / (duration * 60);

    setAngle((prev) => (prev + rotationPerTick * delta) % 360);
  }, isPlaying);

  return (
    <PixiGraphics
      draw={draw}
      onclick={onColorChange}
      angle={angle}
      anchor={0.5}
      x={x}
      y={y}
      interactive
      cursor="pointer"
    />
  );
};

export default Shape;
