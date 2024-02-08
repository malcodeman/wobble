"use client";
import { Stage } from "@pixi/react";
import { useMeasure, useTimeoutEffect } from "@react-hookz/web";
import { ColorSource, Graphics } from "pixi.js";
import { useState } from "react";
import randomcolor from "randomcolor";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

import { getRandomNumber } from "../lib/utils";
import { Button } from "../ui/Button";
import Shape from "./Shape";

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

const Canvas = () => {
  const [shapes, setShapes] = useState<Shape[]>(INITIAL_SHAPES);
  const [play, setPlay] = useState(false);
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const duration = 2;

  useTimeoutEffect(() => setPlay(false), play ? duration * 1000 : undefined);

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

  const handleDraw = (graphics: Graphics, shape: Shape) => {
    graphics.beginFill(shape.color, shape.alpha);
    graphics.drawRoundedRect(0, 0, shape.width, shape.height, shape.radius);
    graphics.endFill();
  };

  return (
    <div ref={ref} className="grid h-screen grid-cols-[1fr_240px] bg-gray-900">
      {measurements ? (
        <Stage
          width={measurements.width - 240}
          height={measurements.height}
          options={{ backgroundColor: "#fcfcfd" }}
        >
          {shapes.map((shape, index) => (
            <Shape
              key={index}
              draw={(g) => handleDraw(g, shape)}
              isPlaying={play}
              x={shape.x}
              y={shape.y}
              duration={duration}
            />
          ))}
        </Stage>
      ) : null}
      <div>
        <div className="flex flex-col gap-2 p-2">
          <Button onClick={handleOnAdd}>Add shape</Button>
          <Button
            icon={
              play ? (
                <IconPlayerPauseFilled size={16} />
              ) : (
                <IconPlayerPlayFilled size={16} />
              )
            }
            onClick={() => setPlay(!play)}
          >
            {play ? "Pause" : "Play"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
