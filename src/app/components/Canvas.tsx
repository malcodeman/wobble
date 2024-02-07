"use client";
import { Stage, Graphics as PixiGraphics } from "@pixi/react";
import { useMeasure } from "@react-hookz/web";
import { ColorSource, Graphics } from "pixi.js";
import { useState } from "react";
import randomcolor from "randomcolor";

import { getRandomNumber } from "../lib/utils";

const INITIAL_SHAPES = [
  {
    color: "#304673",
    alpha: 1,
    x: 250,
    y: 200,
    width: 200,
    height: 200,
    radius: 0,
  },
  {
    color: "#ACF2EB",
    alpha: 1,
    x: 450,
    y: 400,
    width: 100,
    height: 100,
    radius: 0,
  },
  {
    color: "#BF3124",
    alpha: 1,
    x: 600,
    y: 400,
    width: 100,
    height: 100,
    radius: 0,
  },
];

type Shape = {
  color: ColorSource;
  alpha: number;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
};

export const Canvas = () => {
  const [shapes, setShapes] = useState<Shape[]>(INITIAL_SHAPES);
  const [measurements, ref] = useMeasure<HTMLDivElement>();

  const handleOnAdd = () => {
    if (measurements) {
      setShapes((prev) => [
        ...prev,
        {
          color: randomcolor(),
          alpha: 1,
          x: getRandomNumber(0, measurements.width),
          y: getRandomNumber(0, measurements.height),
          width: getRandomNumber(10, 200),
          height: getRandomNumber(10, 200),
          radius: 0,
        },
      ]);
    }
  };

  const handleDraw = (graphics: Graphics) => {
    return shapes.map((shape) => {
      graphics.beginFill(shape.color, shape.alpha);
      graphics.drawRoundedRect(
        shape.x,
        shape.y,
        shape.width,
        shape.height,
        shape.radius,
      );
      graphics.endFill();
    });
  };

  return (
    <div ref={ref} className="h-[calc(100vh-40px)] bg-[#18181b]">
      <header className="flex items-center justify-center p-2">
        <span className="text-white" onClick={handleOnAdd}>
          Rectangle
        </span>
      </header>
      <Stage
        width={measurements?.width}
        height={measurements?.height}
        options={{ backgroundColor: "#fcfcfd" }}
      >
        <PixiGraphics draw={(g) => handleDraw(g)} />
      </Stage>
    </div>
  );
};
