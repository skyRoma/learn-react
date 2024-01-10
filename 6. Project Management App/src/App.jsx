import { useState } from 'react';
import { NewProject } from './components/NewProject';
import { NoProjectSelected } from './components/NoProjectSelected';
import { ProjectsSidebar } from './components/ProjectsSidebar';

export const App = () => {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleStartAddProject = () => {
    setProjectState((prevProjectState) => {
      return { ...prevProjectState, selectedProjectId: null };
    });
  };

  const handleAddProject = (projectData) => {
    const newProject = { ...projectData, id: Math.random().toString() };

    setProjectState((prevProjectState) => {
      return {
        projects: [...prevProjectState.projects, newProject],
        selectedProjectId: null,
      };
    });
  };

  console.log(projectState);

  let content;

  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projectState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
};
