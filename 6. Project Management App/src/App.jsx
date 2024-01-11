import { useState } from 'react';
import { NewProject } from './components/NewProject';
import { NoProjectSelected } from './components/NoProjectSelected';
import { ProjectsSidebar } from './components/ProjectsSidebar';
import { SelectedProject } from './components/SelectedProject';

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

  const handleCancelAddProject = () => {
    setProjectState((prevProjectState) => {
      return { ...prevProjectState, selectedProjectId: undefined };
    });
  };

  const handleAddProject = (projectData) => {
    const newProject = { ...projectData, id: Math.random().toString() };

    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        projects: [...prevProjectState.projects, newProject],
        selectedProjectId: newProject.id,
      };
    });
  };

  const handleSelectProject = (projectId) => {
    setProjectState((prevProjectState) => {
      return { ...prevProjectState, selectedProjectId: projectId };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        projects: prevProjectState.projects.filter(
          (project) => project.id !== prevProjectState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
    />
  );

  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancelAddProject={handleCancelAddProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        selectedProjectId={projectState.selectedProjectId}
        projects={projectState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
};
