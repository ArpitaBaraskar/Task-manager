import React from 'react';
import { CheckSquare, Clock, CheckCircle2 } from 'lucide-react';
import TaskItem from './TaskItem.jsx';

/**
 * TaskList Component
 * Container for rendering all tasks
 */
const TaskList = ({ tasks, onToggle, onDelete, onUpdate, filter }) => {
  /**
   * Get empty state message based on filter
   */
  const getEmptyStateMessage = () => {
    const messages = {
      all: {
        icon: CheckSquare,
        title: "No tasks yet",
        subtitle: "Add your first task above to get started!"
      },
      active: {
        icon: Clock,
        title: "No active tasks",
        subtitle: "All tasks are completed or add a new one!"
      },
      completed: {
        icon: CheckCircle2,
        title: "No completed tasks",
        subtitle: "Complete some tasks to see them here!"
      }
    };
    
    return messages[filter] || messages.all;
  };

  /**
   * Render empty state
   */
  const renderEmptyState = () => {
    const emptyState = getEmptyStateMessage();
    const IconComponent = emptyState.icon;
    
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <IconComponent className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyState.title}</h3>
        <p className="text-gray-500">{emptyState.subtitle}</p>
      </div>
    );
  };

  /**
   * Group tasks by completion status for better organization
   */
  const groupedTasks = {
    active: tasks.filter(task => !task.completed),
    completed: tasks.filter(task => task.completed)
  };

  /**
   * Render task section
   */
  const renderTaskSection = (sectionTasks, title) => {
    if (!sectionTasks.length) return null;
    return (
      <div className="mb-8">
        <h4 className="text-md font-semibold text-gray-700 mb-3">{title}</h4>
        <div className="space-y-2">
          {sectionTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* If no tasks, show empty state */}
      {tasks.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {/* Show active tasks first, then completed */}
          {filter === 'all' && (
            <>
              {renderTaskSection(groupedTasks.active, 'Active Tasks')}
              {renderTaskSection(groupedTasks.completed, 'Completed Tasks')}
            </>
          )}
          {filter === 'active' && renderTaskSection(groupedTasks.active, 'Active Tasks')}
          {filter === 'completed' && renderTaskSection(groupedTasks.completed, 'Completed Tasks')}
        </>
      )}
    </div>
  );
};

export default TaskList;