"use client";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

import { useProjects } from "./hooks/useProjects";
import { Button } from "./ui/Button";
import { FileUpload } from "./components/FileUpload";
import { onImport } from "./utils";

export default function Home() {
  const { projects, newProject } = useProjects();

  const handleOnImport = async (files: File[]) => {
    const shapes = await onImport(files);

    if (shapes) {
      newProject({ shapes });
    }
  };

  return (
    <div className="container mx-auto px-2">
      <h1 className="mb-2 text-lg text-white">Projects</h1>
      <div className="mb-4 inline-flex gap-2">
        <Button onClick={() => newProject()} icon={<IconPlus size={16} />}>
          Start new project
        </Button>
        <FileUpload onDrop={handleOnImport} />
      </div>
      {projects.map((project) => (
        <div key={project.id}>
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </div>
      ))}
    </div>
  );
}
