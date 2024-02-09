import { ColorSource } from "pixi.js";

export type ShapeType = "rectangle" | "ellipse" | "polygon";

export type DrawableShape = {
  color: ColorSource;
  alpha: number;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  shapeType: ShapeType;
};
