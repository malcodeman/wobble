import { nanoid } from "nanoid";

export const TEMPLATES = [
  {
    id: nanoid(),
    title: "Rectangle",
    shapes: [
      {
        color: 0xff0000,
        alpha: 1,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        radius: 0,
        scale: 1,
        shapeType: "rectangle" as const,
      },
    ],
  },
  {
    id: nanoid(),
    title: "Ellipse",
    shapes: [
      {
        color: 0x00ff00,
        alpha: 1,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        radius: 50,
        scale: 1,
        shapeType: "ellipse" as const,
      },
    ],
  },
  {
    id: nanoid(),
    title: "Polygon",
    shapes: [
      {
        color: 0x0000ff,
        alpha: 1,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        radius: 0,
        scale: 1,
        shapeType: "polygon" as const,
      },
    ],
  },
];
