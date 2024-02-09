"use client";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useProjects } from "./hooks/useProjects";
import { Button } from "./ui/Button";
import { FileUpload } from "./components/FileUpload";
import { onImport } from "./utils";
import { Project } from "./components/Project";

export default function Home() {
  const router = useRouter();
  const { projects, newProject } = useProjects();

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

  return (
    <div className="container mx-auto px-2">
      <h1 className="mb-2 text-lg text-white">Projects</h1>
      <div className="mb-4 inline-flex gap-2">
        <Button onClick={handleOnNew} icon={<IconPlus size={16} />}>
          Start new project
        </Button>
        <FileUpload onDrop={handleOnImport} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-4">
        {projects.map((project) => (
          <Project
            key={project.id}
            id={project.id}
            title={project.title}
            createdAt={project.createdAt}
            shapes={project.shapes}
          />
        ))}
      </div>
    </div>
  );
}
