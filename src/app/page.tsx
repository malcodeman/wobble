"use client";
import {
  IconAlphabetLatin,
  IconClockHour3,
  IconEdit,
  IconPlus,
  IconSortDescending,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";

import { useProjects } from "./hooks/useProjects";
import { Button } from "./ui/Button";
import { FileUpload } from "./components/FileUpload";
import { onImport } from "./utils";
import { Header } from "./components/Header";
import { Menu, MenuButton, MenuItem, MenuList } from "./ui/Menu";
import { SortBy } from "./types";

const DynamicProject = dynamic(() => import("./components/Project"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const { projects, newProject } = useProjects();
  const [sortBy, setSortBy] = useState<SortBy>("updatedAt");

  const handleOnNew = () => {
    const project = newProject();

    router.push(`/projects/${project?.id}`);
  };

  const handleOnImport = async (files: File[]) => {
    const shapes = await onImport(files);

    if (shapes) {
      const project = newProject({ shapes });

      router.push(`/projects/${project?.id}`);
    }
  };

  const sortedProjects = projects.sort((a, b) => {
    switch (sortBy) {
      default:
      case "updatedAt":
        return b.updatedAt - a.updatedAt;
      case "createdAt":
        return b.createdAt - a.createdAt;
      case "title":
        return a.title.localeCompare(b.title);
    }
  });

  const renderSortMenuButtonText = () => {
    switch (sortBy) {
      default:
      case "updatedAt":
        return "Updated";
      case "createdAt":
        return "Created";
      case "title":
        return "Title";
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="mb-2 text-xl text-white">Projects</h1>
          <Menu>
            <MenuButton icon={<IconSortDescending size={16} />}>
              {renderSortMenuButtonText()}
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<IconEdit size={16} />}
                onClick={() => setSortBy("updatedAt")}
              >
                Updated
              </MenuItem>
              <MenuItem
                icon={<IconClockHour3 size={16} />}
                onClick={() => setSortBy("createdAt")}
              >
                Created
              </MenuItem>
              <MenuItem
                icon={<IconAlphabetLatin size={16} />}
                onClick={() => setSortBy("title")}
              >
                Title
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="mb-4 inline-flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={handleOnNew}
            icon={<IconPlus size={16} />}
            data-testid="start-new-project-button"
          >
            Start new project
          </Button>
          <FileUpload onDrop={handleOnImport} />
        </div>
        {sortedProjects.length === 0 ? (
          <div className="flex justify-center">
            <div className="max-w-sm text-center">
              <h1 className="text-lg text-white">No Projects</h1>
              <p className="text-zinc-500">
                Create a new project from scratch or use a template to get
                started.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-4">
            {sortedProjects.map((project) => (
              <DynamicProject
                key={project.id}
                id={project.id}
                title={project.title}
                createdAt={project.createdAt}
                updatedAt={project.updatedAt}
                shapes={project.shapes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
