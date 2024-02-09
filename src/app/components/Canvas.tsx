"use client";
import { Stage } from "@pixi/react";
import { useMeasure, useTimeoutEffect } from "@react-hookz/web";
import { Graphics } from "pixi.js";
import { useState } from "react";
import randomcolor from "randomcolor";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { saveAs } from "file-saver";

import { file2Text, getRandomNumber } from "../lib/utils";
import { INITIAL_SHAPES } from "../lib/constants";
import { Button } from "../ui/Button";
import Shape from "./Shape";
import { Input } from "../ui/Input";
import { Divider } from "../ui/Divider";
import { FileUpload } from "./FileUpload";
import { Shape as ShapeType } from "../types";

const Canvas = () => {
  const [shapes, setShapes] = useState<ShapeType[]>(INITIAL_SHAPES);
  const [play, setPlay] = useState(false);
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const [duration, setDuration] = useState("2");

  useTimeoutEffect(
    () => setPlay(false),
    play ? Number(duration) * 1000 : undefined,
  );

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

  const handleDraw = (graphics: Graphics, shape: ShapeType) => {
    graphics.beginFill(shape.color, shape.alpha);
    graphics.drawRoundedRect(0, 0, shape.width, shape.height, shape.radius);
    graphics.endFill();
  };

  const handleOnImport = async (acceptedFiles: File[]) => {
    try {
      const text = await file2Text(acceptedFiles[0]);
      const json = JSON.parse(text);

      setShapes(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnDownload = () => {
    const blob = new Blob([JSON.stringify(shapes)], {
      type: "application/json",
    });

    saveAs(blob, `shapes.json`);
  };

  const handleOnColorChange = (index: number) => {
    setShapes((shapes) =>
      shapes.map((shape, i) =>
        i === index ? { ...shape, color: randomcolor() } : shape,
      ),
    );
  };

  return (
    <div ref={ref} className="grid h-screen grid-cols-[1fr_240px] bg-gray-900">
      {measurements ? (
        <Stage
          width={measurements.width - 240}
          height={measurements.height}
          options={{ backgroundColor: 0xfcfcfd }}
        >
          {shapes.map((shape, index) => (
            <Shape
              key={index}
              draw={(g) => handleDraw(g, shape)}
              onColorChange={() => handleOnColorChange(index)}
              isPlaying={play}
              x={shape.x}
              y={shape.y}
              duration={Number(duration)}
            />
          ))}
        </Stage>
      ) : null}
      <div>
        <div className="flex flex-col gap-2 p-2">
          <Button onClick={handleOnAdd}>Add shape</Button>
          <Divider className="my-4" />
          <Input
            label="Duration"
            rightSection="sec"
            value={duration}
            onChange={(e) => setDuration(e.currentTarget.value)}
          />
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
          <Divider className="my-4" />
          <FileUpload onDrop={handleOnImport} />
          <Button onClick={handleOnDownload}>Download .json</Button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
