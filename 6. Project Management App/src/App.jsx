import { useState } from 'react';
import { NewProject } from './components/NewProject';
import { NoProjectSelected } from './components/NoProjectSelected';
import { ProjectsSidebar } from './components/ProjectsSidebar';
import { SelectedProject } from './components/SelectedProject';

export const App = () => {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
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
      const newProjects = prevProjectState.projects.filter(
        (project) => project.id !== prevProjectState.selectedProjectId
      );

      return {
        ...prevProjectState,
        projects: newProjects,
        selectedProjectId: newProjects[0]?.id,
      };
    });
  };

  const handleAddTask = (taskData) => {
    setProjectState((prevProjectState) => {
      const newTask = {
        text: taskData,
        id: Math.random().toString(),
        projectId: prevProjectState.selectedProjectId,
      };

      return {
        ...prevProjectState,
        tasks: [newTask, ...prevProjectState.tasks],
      };
    });
  };

  const handleDeleteTask = (taskId) => {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        tasks: prevProjectState.tasks.filter((task) => task.id !== taskId),
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  const selectedProjectTasks = projectState.tasks.filter(
    (task) => task.projectId === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      tasks={selectedProjectTasks}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
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
