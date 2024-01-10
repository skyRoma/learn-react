import { useState } from 'react';
import { NewProject } from './components/NewProject';
import { NoProjectSelected } from './components/NoProjectSelected';
import { ProjectsSidebar } from './components/ProjectsSidebar';

export const App = () => {
  const [projects, setProjects] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleStartAddProject = () => {
    setProjects((prevProjects) => {
      return { ...prevProjects, selectedProjectId: null };
    });
  };

  let content;

  if (projects.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projects.selectedProjectId === null) {
    content = <NewProject />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
};
