import Link from "next/link";
import { Stage } from "@pixi/react";
import { useMeasure } from "@react-hookz/web";
import { formatDistanceToNow } from "date-fns";
import { IconDots, IconLink, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

import { Project as ProjectType } from "../types";
import Shape from "./Shape";
import { onDraw } from "../utils";
import { Menu, MenuButton, MenuItem, MenuList } from "../ui/Menu";
import { useProjects } from "../hooks/useProjects";

const Project = (props: ProjectType) => {
  const { id, title, shapes, createdAt } = props;
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const { deleteProject } = useProjects();

  const handleOnCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/projects/${id}`,
      );
      toast.success("Link copied");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleOnDelete = () => {
    deleteProject(id);
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

export default Project;
