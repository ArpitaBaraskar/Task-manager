import React from 'react';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import LoginForm from './components/auth/LoginForm.jsx';
import './App.css';

// SVG Trash Icon
const TrashIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6m4-6v6" />
  </svg>
);

const App = () => {
  const { user, login, logout, isLoading } = useAuth();
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask
  } = useTasks();

  // Stats
  const total = allTasks.length;
  const active = allTasks.filter(t => !t.completed).length;
  const completed = allTasks.filter(t => t.completed).length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  // Input state
  const [taskTitle, setTaskTitle] = React.useState('');

  if (isLoading) {
    return <div />;
  }
  if (!user) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="app-container">
      {/* Header */}
      <div>
        <div className="header-title">Task Manager</div>
        <div className="header-subtitle">Organize your tasks and boost your productivity</div>
      </div>
      {/* Input Row */}
      <form
        className="flex mb-4 gap-2"
        onSubmit={e => {
          e.preventDefault();
          if (taskTitle.trim()) {
            addTask(taskTitle);
            setTaskTitle('');
          }
        }}
      >
        <input
          className="task-input"
          type="text"
          placeholder="Add a new task..."
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
        />
        <button
          className="add-task-btn"
          type="submit"
          disabled={!taskTitle.trim()}
        >
          + Add Task
        </button>
      </form>
      {/* Stats Bar */}
      <div className="mb-4" style={{ background: '#f9fafb', borderRadius: '1rem', padding: '1rem' }}>
        <div className="stats-bar">
          <span>Total: {total}</span>
          <span>Active: {active}</span>
          <span>Completed: {completed}</span>
        </div>
        <div className="stats-progress">
          <div className="stats-progress-bar" style={{ width: `${completionRate}%` }} />
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="filter-btns">
        <button
          className={`filter-btn${filter === 'all' ? ' active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn active-filter${filter === 'active' ? ' active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn completed-filter${filter === 'completed' ? ' active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <div style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0' }}>
            No tasks found. Add your first task above!
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`task-item${task.completed ? ' completed' : ''}`}
              style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-title" style={{ marginRight: 'auto' }}>{task.title}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
                title="Delete"
                aria-label="Delete task"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <TrashIcon />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;