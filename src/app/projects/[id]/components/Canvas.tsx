"use client";
import { Stage } from "@pixi/react";
import {
  useIntervalEffect,
  useMeasure,
  useTimeoutEffect,
} from "@react-hookz/web";
import { useEffect, useState } from "react";
import randomcolor from "randomcolor";
import {
  IconCopy,
  IconDots,
  IconEdit,
  IconHome,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconRepeat,
} from "@tabler/icons-react";
import { saveAs } from "file-saver";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/ui/Button";
import { DrawableShape, ShapeType } from "@/app/types";
import { Divider } from "@/app/ui/Divider";
import { Input } from "@/app/ui/Input";
import { useProjects } from "@/app/hooks/useProjects";
import { FileUpload } from "@/app/components/FileUpload";
import Shape from "@/app/components/Shape";
import { onImport, onDraw } from "@/app/utils";
import { Menu, MenuButton, MenuItem, MenuList } from "@/app/ui/Menu";
import { RenameTitleModal } from "@/app/components/RenameTitleModal";

import { getRandomNumber } from "../utils";
import { INITIAL_DURATION } from "../constants";

const Canvas = () => {
  const params = useParams();
  const id = params.id as string;
  const { getProject, setProject, duplicateProject } = useProjects();
  const project = getProject(id);
  const [shapes, setShapes] = useState<DrawableShape[]>([]);
  const [play, setPlay] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const [duration, setDuration] = useState(INITIAL_DURATION);
  const [activeShape, setActiveShape] = useState<ShapeType>("rectangle");
  const [isOpen, setIsOpen] = useState(false);
  const [isDisco, setIsDisco] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (project) {
      setShapes(project.shapes);
    }
  }, [project]);

  useEffect(() => {
    if (isDisco) {
      setPlay(true);
      setRepeat(true);
      setDuration("0.6");
    } else {
      setPlay(false);
      setRepeat(false);
      setDuration(INITIAL_DURATION);
    }
  }, [isDisco]);

  useIntervalEffect(
    () => {
      setShapes((prev) => {
        const nextShapes = prev.map((shape) => ({
          ...shape,
          color: randomcolor(),
          scale: getRandomNumber(0.5, 1.5),
        }));

        return nextShapes;
      });
    },
    isDisco ? 100 : undefined,
  );

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
        scale: 1,
        shapeType: activeShape,
      };

      setShapes((prev) => {
        const nextShapes = [...prev, nextShape];

        setProject(id, { shapes: nextShapes });
        return nextShapes;
      });
    }
  };

  const handleOnImport = async (files: File[]) => {
    const shapes = await onImport(files);

    if (shapes) {
      setShapes(shapes);
      setProject(id, { shapes });
    }
  };

  const handleOnDownload = () => {
    const blob = new Blob([JSON.stringify(shapes)], {
      type: "application/json",
    });

    saveAs(blob, `shapes.json`);
  };

  const handleOnColorChange = (index: number) => {
    setShapes((prev) => {
      const nextShapes = prev.map((shape, i) =>
        i === index ? { ...shape, color: randomcolor() } : shape,
      );

      setProject(id, { shapes: nextShapes });
      return nextShapes;
    });
  };

  const handleOnRepeat = () => {
    setRepeat((prev) => {
      if (prev) {
        reset();
      }
      return !prev;
    });
  };

  const handleOnRename = (nextTitle: string) => {
    setIsOpen(false);
    setProject(id, { title: nextTitle });
  };

  const handleOnDuplicate = () => {
    const project = duplicateProject(id);

    router.push(`/projects/${project?.id}`);
  };

  return (
    <div ref={ref} className="h-[calc(100vh-60px)]">
      <header className="p-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button icon={<IconHome size={16} />} />
          </Link>
          <span className="text-white">{project?.title}</span>
          <Menu>
            <MenuButton>
              <IconDots size={16} />
            </MenuButton>
            <MenuList placement="bottom-end">
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
            </MenuList>
          </Menu>
        </div>
      </header>
      <div className="grid grid-cols-[1fr_240px]">
        {measurements ? (
          <Stage
            width={measurements.width - 240}
            height={measurements.height}
            options={{ backgroundColor: 0xfcfcfd }}
            className="rounded-tr-md"
          >
            {shapes.map((shape, index) => (
              <Shape
                key={index}
                draw={(g) => onDraw(g, shape)}
                onColorChange={() => handleOnColorChange(index)}
                isPlaying={play}
                x={shape.x}
                y={shape.y}
                scale={shape.scale}
                duration={Number(duration)}
              />
            ))}
          </Stage>
        ) : null}
        <div className="px-2">
          <div className="flex flex-col gap-2">
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
            <Button
              isActive={isDisco}
              onClick={() => setIsDisco((prev) => !prev)}
            >
              Disco
            </Button>
            <Divider className="my-4" />
            <FileUpload onDrop={handleOnImport} />
            <Button onClick={handleOnDownload}>Download .json</Button>
          </div>
        </div>
      </div>
      {project ? (
        <RenameTitleModal
          isOpen={isOpen}
          title={project.title}
          onClose={() => setIsOpen(false)}
          onRename={handleOnRename}
        />
      ) : null}
    </div>
  );
};

export default Canvas;
