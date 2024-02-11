import Link from "next/link";
import { Stage } from "@pixi/react";
import { useIntervalEffect, useMeasure, useRerender } from "@react-hookz/web";
import { formatDistanceToNow } from "date-fns";
import {
  IconCopy,
  IconDots,
  IconEdit,
  IconLink,
  IconTrash,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Project as ProjectType } from "../types";
import Shape from "./Shape";
import { onDraw } from "../utils";
import { Menu, MenuButton, MenuItem, MenuList } from "../ui/Menu";
import { useProjects } from "../hooks/useProjects";
import { RenameTitleModal } from "./RenameTitleModal";

const UpdatedAt = ({ updatedAt }: { updatedAt: number }) => {
  const rerender = useRerender();

  useIntervalEffect(() => {
    rerender();
  }, 10000);

  return (
    <span className="text-sm text-zinc-500">
      Updated {formatDistanceToNow(updatedAt, { addSuffix: true })}
    </span>
  );
};

const Project = (props: ProjectType) => {
  const { id, title, shapes, updatedAt } = props;
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const { deleteProject, duplicateProject, setProject } = useProjects();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOnDuplicate = () => {
    const project = duplicateProject(id);

    router.push(`/projects/${project?.id}`);
  };

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

  const handleOnRename = (nextTitle: string) => {
    setIsOpen(false);
    setProject(id, { title: nextTitle });
  };

  return (
    <>
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
            <UpdatedAt updatedAt={updatedAt} />
          </div>
          <Menu>
            <MenuButton>
              <IconDots size={16} />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<IconEdit size={16} />}
                onClick={() => setIsOpen(true)}
              >
                Rename
              </MenuItem>
              <MenuItem
                icon={<IconCopy size={16} />}
                onClick={handleOnDuplicate}
              >
                Duplicate
              </MenuItem>
              <MenuItem
                icon={<IconLink size={16} />}
                onClick={handleOnCopyLink}
              >
                Copy link
              </MenuItem>
              <MenuItem icon={<IconTrash size={16} />} onClick={handleOnDelete}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <RenameTitleModal
        isOpen={isOpen}
        title={title}
        onClose={() => setIsOpen(false)}
        onRename={handleOnRename}
      />
    </>
  );
};

export default Project;
