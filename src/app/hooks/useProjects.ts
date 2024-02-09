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

  return {
    projects: projects || [],
    setProjects,
    newProject,
  };
};
