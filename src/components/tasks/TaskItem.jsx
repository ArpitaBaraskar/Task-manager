import React, { useState } from 'react';
import { Trash2, Edit3, Check, X, Calendar } from 'lucide-react';

/**
 * TaskItem Component
 * Individual task display with actions
 */
const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  /**
   * Handle task completion toggle
   */
  const handleToggle = () => {
    onToggle(task.id);
  };

  /**
   * Handle task deletion with confirmation
   */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  /**
   * Start editing mode
   */
  const startEditing = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  /**
   * Cancel editing
   */
  const cancelEditing = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  /**
   * Save edited task
   */
  const saveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  /**
   * Handle Enter key in edit mode
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`group flex items-center space-x-3 p-3 bg-white rounded-md shadow-sm border transition-all hover:shadow-md ${
      task.completed ? 'bg-gray-50 border-gray-200' : 'border-gray-200'
    }`}>
      {/* Checkbox */}
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              maxLength={200}
            />
            <button
              onClick={saveEdit}
              className="p-1 text-green-600 hover:text-green-800"
              title="Save changes"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={cancelEditing}
              className="p-1 text-gray-600 hover:text-gray-800"
              title="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <p className={`text-sm ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </p>
            {task.createdAt && (
              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created: {formatDate(task.createdAt)}</span>
                </div>
                {task.updatedAt && task.updatedAt !== task.createdAt && (
                  <span>Updated: {formatDate(task.updatedAt)}</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onUpdate && (
            <button
              onClick={startEditing}
              className="p-1 text-blue-600 hover:text-blue-800"
              title="Edit task"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;