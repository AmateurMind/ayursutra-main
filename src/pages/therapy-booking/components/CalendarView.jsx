import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ selectedDate, onDateSelect, availableSlots, onSlotSelect, selectedSlot }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    let day = startOfWeek?.getDay();
    startOfWeek?.setDate(startOfWeek?.getDate() - day);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay?.setDate(startOfWeek?.getDate() + i);
      weekDays?.push(currentDay);
    }
    
    return weekDays;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate || new Date());
    newDate?.setDate(newDate?.getDate() + (direction * 7));
    setCurrentMonth(newDate);
    onDateSelect(newDate);
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentMonth);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDays?.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
            {day}
          </div>
        ))}
        {days?.map((date, index) => (
          <button
            key={index}
            onClick={() => date && isDateAvailable(date) && onDateSelect(date)}
            disabled={!date || !isDateAvailable(date)}
            className={`
              p-2 text-sm rounded-md transition-breathing touch-target focus-ring
              ${!date ? 'invisible' : ''}
              ${!isDateAvailable(date) ? 'text-text-secondary cursor-not-allowed opacity-50' : ''}
              ${isDateSelected(date) ? 'bg-primary text-primary-foreground' : ''}
              ${date && isDateAvailable(date) && !isDateSelected(date) ? 'hover:bg-muted text-foreground' : ''}
            `}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(selectedDate || new Date());
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays?.map((date, index) => (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={`
                p-3 rounded-lg text-center transition-breathing touch-target focus-ring
                ${isDateSelected(date) ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-card'}
                ${!isDateAvailable(date) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={!isDateAvailable(date)}
            >
              <div className="text-xs text-text-secondary mb-1">
                {date?.toLocaleDateString('en-IN', { weekday: 'short' })}
              </div>
              <div className="text-lg font-medium">
                {date?.getDate()}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (!selectedDate || !availableSlots?.length) {
      return (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="Clock" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Select a date to view available time slots</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg">
          Available Slots - {selectedDate?.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableSlots?.map((slot) => (
            <button
              key={slot?.id}
              onClick={() => onSlotSelect(slot)}
              className={`
                p-3 rounded-lg border transition-breathing touch-target focus-ring
                ${selectedSlot?.id === slot?.id 
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted'
                }
              `}
            >
              <div className="text-sm font-medium">
                {formatTime(slot?.startTime)} - {formatTime(slot?.endTime)}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {slot?.practitioner}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="font-heading font-semibold text-xl">
            {months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h2>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-breathing ${
                viewMode === 'month' ? 'bg-background text-foreground' : 'text-text-secondary'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-breathing ${
                viewMode === 'week' ? 'bg-background text-foreground' : 'text-text-secondary'
              }`}
            >
              Week
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => viewMode === 'month' ? navigateMonth(-1) : navigateWeek(-1)}
            iconName="ChevronLeft"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const today = new Date();
              setCurrentMonth(today);
              onDateSelect(today);
            }}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => viewMode === 'month' ? navigateMonth(1) : navigateWeek(1)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="space-y-6">
        {viewMode === 'month' ? renderMonthView() : renderWeekView()}
        
        {/* Time Slots */}
        <div className="border-t border-border pt-6">
          {renderTimeSlots()}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;