import React from 'react';
import Button from '../../../components/ui/Button';


const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewChange, 
  onNavigate, 
  onTodayClick,
  onRefresh 
}) => {
  const formatDateDisplay = () => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    };
    return currentDate?.toLocaleDateString('en-IN', options);
  };

  const viewOptions = [
    { value: 'day', label: 'Day', icon: 'Calendar' },
    { value: 'week', label: 'Week', icon: 'CalendarDays' },
    { value: 'month', label: 'Month', icon: 'CalendarRange' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-breathing p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Date Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('prev')}
              iconName="ChevronLeft"
              iconSize={16}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('next')}
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {formatDateDisplay()}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onTodayClick}
              className="text-primary hover:text-primary-foreground hover:bg-primary"
            >
              Today
            </Button>
          </div>
        </div>

        {/* View Controls and Actions */}
        <div className="flex items-center space-x-3">
          {/* View Mode Selector */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={viewMode === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(option?.value)}
                iconName={option?.icon}
                iconSize={16}
                className={`
                  ${viewMode === option?.value 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-text-secondary hover:text-foreground'
                  }
                `}
              >
                <span className="hidden sm:inline">{option?.label}</span>
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              iconName="RefreshCw"
              iconSize={16}
              className="touch-target"
            >
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconSize={16}
              className="bg-primary hover:bg-primary/90"
            >
              <span className="hidden sm:inline">New Appointment</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;