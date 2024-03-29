import { useRef } from 'react';

export const NewTask = ({ onAddTask }) => {
  const taskRef = useRef();

  const handleAddTask = () => {
    const task = taskRef.current.value;

    if (task.trim().length === 0) {
      return;
    }

    onAddTask(task);
    taskRef.current.value = '';
  };

  return (
    <div className="flex items-center gap-4">
      <input
        ref={taskRef}
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};
