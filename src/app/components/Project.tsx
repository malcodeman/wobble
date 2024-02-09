import Link from "next/link";
import { Stage } from "@pixi/react";
import { useMeasure } from "@react-hookz/web";
import { formatDistanceToNow } from "date-fns";

import { Project as ProjectType } from "../types";
import Shape from "./Shape";
import { onDraw } from "../utils";

export const Project = (props: ProjectType) => {
  const { id, title, shapes, createdAt } = props;
  const [measurements, ref] = useMeasure<HTMLAnchorElement>();

  return (
    <Link ref={ref} href={`/projects/${id}`}>
      {measurements ? (
        <Stage
          width={measurements.width}
          height={measurements.width}
          options={{ backgroundColor: 0xfcfcfd }}
          className="mb-2 rounded-md"
        >
          {shapes.map((shape, index) => (
            <Shape
              key={index}
              draw={(g) => onDraw(g, shape)}
              x={shape.x}
              y={shape.y}
            />
          ))}
        </Stage>
      ) : null}
      <div className="mb-0.5 text-white">{title}</div>
      <span className="text-sm text-zinc-500">
        Created {formatDistanceToNow(createdAt, { addSuffix: true })}
      </span>
    </Link>
  );
};
