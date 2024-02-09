"use client";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { useProjects } from "./hooks/useProjects";
import { Button } from "./ui/Button";
import { FileUpload } from "./components/FileUpload";
import { onImport } from "./utils";
import { Header } from "./components/Header";

const DynamicProject = dynamic(() => import("./components/Project"), {
  ssr: false,
});

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
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="mb-2 text-xl text-white">Projects</h1>
        <div className="mb-4 inline-flex flex-col gap-2 sm:flex-row">
          <Button onClick={handleOnNew} icon={<IconPlus size={16} />}>
            Start new project
          </Button>
          <FileUpload onDrop={handleOnImport} />
        </div>
        {projects.length === 0 ? (
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
            {projects.map((project) => (
              <DynamicProject
                key={project.id}
                id={project.id}
                title={project.title}
                createdAt={project.createdAt}
                shapes={project.shapes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
