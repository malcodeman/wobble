"use client";
import { Stage } from "@pixi/react";
import { useMeasure, useTimeoutEffect } from "@react-hookz/web";
import { Graphics } from "pixi.js";
import { useEffect, useState } from "react";
import randomcolor from "randomcolor";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconRepeat,
} from "@tabler/icons-react";
import { saveAs } from "file-saver";
import { useParams } from "next/navigation";
import { Button } from "@/app/ui/Button";
import { DrawableShape, ShapeType } from "@/app/types";
import { Divider } from "@/app/ui/Divider";
import { Input } from "@/app/ui/Input";
import { useProjects } from "@/app/hooks/useProjects";

import { file2Text, getRandomNumber, isShapeArray } from "../utils";
import Shape from "./Shape";
import { FileUpload } from "./FileUpload";

const Canvas = () => {
  const params = useParams();
  const id = params.id as string;
  const { getProject, setProject } = useProjects();
  const project = getProject(id);
  const [shapes, setShapes] = useState<DrawableShape[]>([]);
  const [play, setPlay] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const [duration, setDuration] = useState("2");
  const [activeShape, setActiveShape] = useState<ShapeType>("rectangle");

  useEffect(() => {
    if (project) {
      setShapes(project.shapes);
    }
  }, [project]);

  const [_cancel, reset] = useTimeoutEffect(
    () => {
      if (!repeat) {
        setPlay(false);
      }
    },
    play ? Number(duration) * 1000 : undefined,
  );

  const handleOnAdd = () => {
    if (measurements) {
      const nextShape = {
        color: randomcolor(),
        alpha: 1,
        x: getRandomNumber(0, measurements.width),
        y: getRandomNumber(0, measurements.height),
        width: getRandomNumber(10, 200),
        height: getRandomNumber(10, 200),
        radius: activeShape === "ellipse" ? getRandomNumber(10, 100) : 0,
        shapeType: activeShape,
      };

      setShapes((prev) => [...prev, nextShape]);
      setProject(id, { shapes: [...shapes, nextShape] });
    }
  };

  const handleDraw = (graphics: Graphics, shape: DrawableShape) => {
    graphics.beginFill(shape.color, shape.alpha);

    switch (shape.shapeType) {
      default:
      case "rectangle":
        graphics.drawRoundedRect(0, 0, shape.width, shape.height, shape.radius);
        break;
      case "ellipse":
        graphics.drawCircle(0, 0, shape.radius);
        break;
      case "polygon":
        graphics.drawPolygon([-100, -50, 100, -50, 0, 100]);
        break;
    }

    graphics.endFill();
  };

  const handleOnImport = async (acceptedFiles: File[]) => {
    try {
      const text = await file2Text(acceptedFiles[0]);
      const json = JSON.parse(text);

      if (isShapeArray(json)) {
        setShapes(json);
        setProject(id, { shapes: json });
      } else {
        console.error("Invalid shape data:", json);
      }
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

  const handleOnRepeat = () => {
    setRepeat((prev) => {
      if (prev) {
        reset();
      }
      return !prev;
    });
  };

  return (
    <div ref={ref} className="grid h-screen grid-cols-[1fr_240px]">
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
          <span className="isolate inline-flex">
            <Button
              onClick={() => setActiveShape("rectangle")}
              isActive={activeShape === "rectangle"}
              className="rounded-none rounded-l-md"
            >
              Rectangle
            </Button>
            <Button
              onClick={() => setActiveShape("ellipse")}
              isActive={activeShape === "ellipse"}
              className="-ml-px rounded-none"
            >
              Ellipse
            </Button>
            <Button
              onClick={() => setActiveShape("polygon")}
              isActive={activeShape === "polygon"}
              className="-ml-px rounded-none rounded-r-md"
            >
              Polygon
            </Button>
          </span>
          <Button onClick={handleOnAdd}>Add shape</Button>
          <Divider className="my-4" />
          <Input
            label="Duration"
            rightSection="sec"
            value={duration}
            onChange={(e) => setDuration(e.currentTarget.value)}
          />
          <div className="inline-flex gap-2">
            <Button
              className="w-full"
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
            <Button
              isActive={repeat}
              icon={<IconRepeat size={16} />}
              onClick={handleOnRepeat}
            />
          </div>
          <Divider className="my-4" />
          <FileUpload onDrop={handleOnImport} />
          <Button onClick={handleOnDownload}>Download .json</Button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;