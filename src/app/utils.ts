import { Graphics } from "pixi.js";

import { DrawableShape } from "./types";

export const file2Text = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};

export const isShapeArray = (obj: any): obj is DrawableShape[] => {
  return (
    Array.isArray(obj) &&
    obj.every(
      (item) =>
        typeof item.color === "string" &&
        typeof item.alpha === "number" &&
        typeof item.x === "number" &&
        typeof item.y === "number" &&
        typeof item.width === "number" &&
        typeof item.height === "number" &&
        typeof item.radius === "number" &&
        ["rectangle", "ellipse", "polygon"].includes(item.shapeType),
    )
  );
};

export const onImport = async (files: File[]) => {
  try {
    const text = await file2Text(files[0]);
    const json = JSON.parse(text);

    if (isShapeArray(json)) {
      return json;
    } else {
      console.error("Invalid shape data:", json);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const onDraw = (graphics: Graphics, shape: DrawableShape) => {
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
