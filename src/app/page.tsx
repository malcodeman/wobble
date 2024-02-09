"use client";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useProjects } from "./hooks/useProjects";
import { Button } from "./ui/Button";
import { FileUpload } from "./components/FileUpload";
import { onImport } from "./utils";

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
      {projects.map((project) => (
        <div key={project.id}>
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </div>
      ))}
    </div>
  );
}
