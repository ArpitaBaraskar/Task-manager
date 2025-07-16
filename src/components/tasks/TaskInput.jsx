import React, { useState, useRef } from 'react';
import { Plus, Keyboard } from 'lucide-react';

/**
 * TaskInput Component
 * Input field for adding new tasks
 */
const TaskInput = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  /**
   * Handle task submission
   */
  const handleSubmit = async () => {
    if (!taskTitle.trim()) return;
    
    setIsLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onAddTask(taskTitle);
      setTaskTitle('');
      setIsLoading(false);
      inputRef.current?.focus();
    }, 200);
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  /**
   * Clear input field
   */
  const clearInput = () => {
    setTaskTitle('');
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-3">
      {/* Input Section */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={taskTitle}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            maxLength={200}
            autoFocus
          />
          {taskTitle && (
            <button
              onClick={clearInput}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="button"
            >
              ×
            </button>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!taskTitle.trim() || isLoading}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Plus className="w-4 h-4" />
          )}
          <span>Add Task</span>
        </button>
      </div>

      {/* Helper Text */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <Keyboard className="w-3 h-3" />
          <span>Press Enter to add task</span>
        </div>
        <div>
          {taskTitle.length}/200 characters
        </div>
      </div>
    </div>
  );
};

export default TaskInput;