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

  const newProject = (data?: Partial<Project>) => {
    const project = {
      id: nanoid(),
      title: data?.title || "Untitled Project",
      createdAt: Date.now(),
      shapes: data?.shapes || [],
    };

    if (projects) {
      setProjects([...projects, project]);
      return project;
    }
  };

  const setProject = (id: string, data: Partial<Project>) => {
    if (projects) {
      const nextProjects = projects.map((project) => {
        if (project.id === id) {
          return { ...project, ...data };
        }
        return project;
      });

      setProjects(nextProjects);
      return nextProjects;
    }
  };

  const getProject = (id: string) => {
    if (projects) {
      return projects.find((project) => project.id === id);
    }
  };

  const deleteProject = (id: string) => {
    if (projects) {
      const nextProjects = projects.filter((project) => project.id !== id);

      setProjects(nextProjects);
      return nextProjects;
    }
  };

  return {
    projects: projects || [],
    setProjects,
    newProject,
    setProject,
    getProject,
    deleteProject,
  };
};
