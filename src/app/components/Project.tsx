import Link from "next/link";
import { Stage } from "@pixi/react";
import { useMeasure } from "@react-hookz/web";
import { formatDistanceToNow } from "date-fns";
import { IconDots, IconLink, IconTrash } from "@tabler/icons-react";

import { Project as ProjectType } from "../types";
import Shape from "./Shape";
import { onDraw } from "../utils";
import { Menu, MenuButton, MenuItem, MenuList } from "../ui/Menu";

export const Project = (props: ProjectType) => {
  const { id, title, shapes, createdAt } = props;
  const [measurements, ref] = useMeasure<HTMLDivElement>();

  const handleOnCopyLink = () => {
    console.log("Copy link");
  };

  const handleOnDelete = () => {
    console.log("Delete");
  };

  return (
    <div ref={ref}>
      <Link href={`/projects/${id}`}>
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
      </Link>
      <div className="flex justify-between">
        <div>
          <div className="mb-0.5 text-white">{title}</div>
          <span className="text-sm text-zinc-500">
            Created {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </div>
        <Menu>
          <MenuButton>
            <IconDots size={16} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<IconLink size={16} />} onClick={handleOnCopyLink}>
              Copy link
            </MenuItem>
            <MenuItem icon={<IconTrash size={16} />} onClick={handleOnDelete}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
