import { DrawableShape } from "@/app/types";

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
