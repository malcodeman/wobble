import { useLocalStorageValue } from "@react-hookz/web";
import { nanoid } from "nanoid";

import { Project } from "../types";

export const useProjects = () => {
  const { value: projects, set: setProjects } = useLocalStorageValue<
    Project[] | undefined
  >("projects", {
    defaultValue: [],
    initializeWithValue: false,
  });

  const newProject = (data?: { name: string }) => {
    const project = {
      id: nanoid(),
      title: data?.name || "Untitled Project",
      createdAt: Date.now(),
      shapes: [],
    };

    if (projects) {
      setProjects([...projects, project]);
    }
  };

  const setProject = (id: string, data: Partial<Project>) => {
    if (projects) {
      setProjects(
        projects.map((project) => {
          if (project.id === id) {
            return { ...project, ...data };
          }
          return project;
        }),
      );
    }
  };

  const getProject = (id: string) => {
    if (projects) {
      return projects.find((project) => project.id === id);
    }
  };

  return {
    projects: projects || [],
    setProjects,
    newProject,
    setProject,
    getProject,
  };
};
