import { useState, useEffect } from 'react';

/**
 * Custom hook for managing task operations
 * Handles task CRUD operations and filtering
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load tasks from memory storage on mount
  useEffect(() => {
    let savedTasks = window.taskManagerTasks || [];
    if (!savedTasks.length) {
      savedTasks = [
        { id: 1, title: 'Complete project documentation', completed: false },
        { id: 2, title: 'Review code changes', completed: true },
        { id: 3, title: 'Prepare for team meeting', completed: false }
      ];
      window.taskManagerTasks = savedTasks;
    }
    setTasks(savedTasks);
  }, []);

  /**
   * Save tasks to memory storage
   * @param {Array} newTasks - Updated tasks array
   */
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    window.taskManagerTasks = newTasks;
  };

  /**
   * Add a new task
   * @param {string} title - Task title
   */
  const addTask = (title) => {
    if (!title.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
  };

  /**
   * Toggle task completion status
   * @param {number} id - Task ID
   */
  const toggleTask = (id) => {
    const newTasks = tasks.map(task =>
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    );
    saveTasks(newTasks);
  };

  /**
   * Delete a task
   * @param {number} id - Task ID
   */
  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    saveTasks(newTasks);
  };

  /**
   * Update task title
   * @param {number} id - Task ID
   * @param {string} newTitle - New task title
   */
  const updateTask = (id, newTitle) => {
    if (!newTitle.trim()) return;
    
    const newTasks = tasks.map(task =>
      task.id === id 
        ? { ...task, title: newTitle.trim(), updatedAt: new Date().toISOString() }
        : task
    );
    saveTasks(newTasks);
  };

  /**
   * Clear all completed tasks
   */
  const clearCompleted = () => {
    const newTasks = tasks.filter(task => !task.completed);
    saveTasks(newTasks);
  };

  /**
   * Mark all tasks as completed
   */
  const markAllCompleted = () => {
    const newTasks = tasks.map(task => ({
      ...task,
      completed: true,
      updatedAt: new Date().toISOString()
    }));
    saveTasks(newTasks);
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Task statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length,
    completionRate: tasks.length > 0 ? (tasks.filter(task => task.completed).length / tasks.length) * 100 : 0
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    markAllCompleted,
    stats
  };
};