import React from 'react';
import { Filter, CheckCircle, Circle, List } from 'lucide-react';

/**
 * TaskFilter Component
 * Filter buttons for showing different task states
 */
const TaskFilter = ({ currentFilter, onFilterChange, stats }) => {
  const filters = [
    { 
      key: 'all', 
      label: 'All Tasks', 
      icon: List,
      count: stats.total,
      color: 'blue' 
    },
    { 
      key: 'active', 
      label: 'Active', 
      icon: Circle,
      count: stats.active,
      color: 'orange' 
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      icon: CheckCircle,
      count: stats.completed,
      color: 'green' 
    }
  ];

  /**
   * Get button styles based on filter state
   */
  const getButtonStyles = (filter) => {
    const isActive = currentFilter === filter.key;
    const colorClasses = {
      blue: isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 'text-gray-600 hover:bg-blue-50',
      orange: isActive ? 'bg-orange-100 text-orange-700 border-orange-200' : 'text-gray-600 hover:bg-orange-50',
      green: isActive ? 'bg-green-100 text-green-700 border-green-200' : 'text-gray-600 hover:bg-green-50'
    };
    
    return `inline-flex items-center space-x-2 px-3 py-2 text-sm rounded-md border transition-colors ${colorClasses[filter.color]}`;
  };

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter Tasks</span>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => {
          const IconComponent = filter.icon;
          return (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={getButtonStyles(filter)}
              title={`Show ${filter.label.toLowerCase()}`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{filter.label}</span>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-white rounded-full">
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicator */}
      {currentFilter !== 'all' && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Showing:</span>
          <span className="font-medium">
            {filters.find(f => f.key === currentFilter)?.label}
          </span>
          <button
            onClick={() => onFilterChange('all')}
            className="text-blue-600 hover:text-blue-800"
          >
            (Clear filter)
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;