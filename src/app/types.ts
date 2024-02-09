import { ColorSource } from "pixi.js";

export type Project = {
  id: string;
  title: string;
  createdAt: number;
  shapes: DrawableShape[];
};

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

export type Template = {
  id: string;
  title: string;
  shapes: DrawableShape[];
};
