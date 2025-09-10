import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CalendarGrid = ({ 
  viewMode, 
  currentDate, 
  appointments, 
  resources,
  onAppointmentClick,
  onAppointmentDrop,
  onTimeSlotClick 
}) => {
  const [draggedAppointment, setDraggedAppointment] = useState(null);

  // Generate time slots for day/week view
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots?.push(`${hour?.toString()?.padStart(2, '0')}:00`);
      slots?.push(`${hour?.toString()?.padStart(2, '0')}:30`);
    }
    return slots;
  };

  // Generate days for week view
  const generateWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  // Generate calendar days for month view
  const generateMonthDays = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day?.setDate(startDate?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  const handleDragStart = (e, appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, timeSlot, date) => {
    e?.preventDefault();
    if (draggedAppointment) {
      onAppointmentDrop(draggedAppointment, timeSlot, date);
      setDraggedAppointment(null);
    }
  };

  const getAppointmentColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 border-success text-success-foreground';
      case 'pending': return 'bg-warning/10 border-warning text-warning-foreground';
      case 'cancelled': return 'bg-error/10 border-error text-error-foreground';
      case 'completed': return 'bg-primary/10 border-primary text-primary-foreground';
      default: return 'bg-muted border-border text-foreground';
    }
  };

  const AppointmentCard = ({ appointment, isCompact = false }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, appointment)}
      onClick={() => onAppointmentClick(appointment)}
      className={`
        ${getAppointmentColor(appointment?.status)}
        border rounded-md p-2 cursor-pointer transition-breathing hover-lift
        ${isCompact ? 'text-xs' : 'text-sm'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{appointment?.patientName}</p>
          <p className="text-xs opacity-75 truncate">{appointment?.therapyType}</p>
          {!isCompact && (
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="MapPin" size={12} />
              <span className="text-xs">{appointment?.room}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {appointment?.hasConflict && (
            <Icon name="AlertTriangle" size={14} className="text-warning" />
          )}
          <Icon name="Clock" size={12} />
        </div>
      </div>
    </div>
  );

  // Day View
  if (viewMode === 'day') {
    const timeSlots = generateTimeSlots();
    
    return (
      <div className="bg-card rounded-lg shadow-breathing overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 min-h-[600px]">
          {/* Time Column */}
          <div className="border-r border-border bg-muted/30">
            <div className="p-4 border-b border-border">
              <h3 className="font-heading font-medium text-foreground">Time</h3>
            </div>
            <div className="space-y-0">
              {timeSlots?.map((time) => (
                <div key={time} className="h-16 border-b border-border/50 flex items-center px-4">
                  <span className="text-sm text-text-secondary font-data">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Columns */}
          {resources?.slice(0, 3)?.map((resource) => (
            <div key={resource?.id} className="border-r border-border last:border-r-0">
              <div className="p-4 border-b border-border">
                <h3 className="font-heading font-medium text-foreground">{resource?.name}</h3>
                <p className="text-xs text-text-secondary">{resource?.type}</p>
              </div>
              <div className="space-y-0">
                {timeSlots?.map((time) => {
                  const slotAppointments = appointments?.filter(
                    apt => apt?.resourceId === resource?.id && apt?.time === time
                  );
                  
                  return (
                    <div
                      key={time}
                      className="h-16 border-b border-border/50 p-1 hover:bg-muted/50 transition-breathing"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, time, currentDate)}
                      onClick={() => onTimeSlotClick(time, resource?.id, currentDate)}
                    >
                      {slotAppointments?.map((appointment) => (
                        <AppointmentCard key={appointment?.id} appointment={appointment} isCompact />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Week View
  if (viewMode === 'week') {
    const weekDays = generateWeekDays();
    const timeSlots = generateTimeSlots()?.slice(0, 20); // Reduced for better display
    
    return (
      <div className="bg-card rounded-lg shadow-breathing overflow-hidden">
        <div className="grid grid-cols-8 gap-0 min-h-[500px]">
          {/* Time Column */}
          <div className="border-r border-border bg-muted/30">
            <div className="h-16 border-b border-border flex items-center px-2">
              <span className="text-sm font-medium text-foreground">Time</span>
            </div>
            {timeSlots?.map((time) => (
              <div key={time} className="h-12 border-b border-border/50 flex items-center px-2">
                <span className="text-xs text-text-secondary font-data">{time}</span>
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {weekDays?.map((day) => (
            <div key={day?.toISOString()} className="border-r border-border last:border-r-0">
              <div className="h-16 border-b border-border p-2 text-center">
                <div className="text-sm font-medium text-foreground">
                  {day?.toLocaleDateString('en-IN', { weekday: 'short' })}
                </div>
                <div className="text-xs text-text-secondary">
                  {day?.getDate()}
                </div>
              </div>
              {timeSlots?.map((time) => {
                const dayAppointments = appointments?.filter(
                  apt => apt?.date?.toDateString() === day?.toDateString() && apt?.time === time
                );
                
                return (
                  <div
                    key={time}
                    className="h-12 border-b border-border/50 p-1 hover:bg-muted/50 transition-breathing"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, time, day)}
                    onClick={() => onTimeSlotClick(time, null, day)}
                  >
                    {dayAppointments?.slice(0, 1)?.map((appointment) => (
                      <AppointmentCard key={appointment?.id} appointment={appointment} isCompact />
                    ))}
                    {dayAppointments?.length > 1 && (
                      <div className="text-xs text-text-secondary text-center">
                        +{dayAppointments?.length - 1} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Month View
  const monthDays = generateMonthDays();
  
  return (
    <div className="bg-card rounded-lg shadow-breathing overflow-hidden">
      {/* Month Header */}
      <div className="grid grid-cols-7 gap-0 border-b border-border bg-muted/30">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
          <div key={day} className="p-3 text-center border-r border-border last:border-r-0">
            <span className="text-sm font-medium text-foreground">{day}</span>
          </div>
        ))}
      </div>
      {/* Month Grid */}
      <div className="grid grid-cols-7 gap-0">
        {monthDays?.map((day) => {
          const dayAppointments = appointments?.filter(
            apt => apt?.date?.toDateString() === day?.toDateString()
          );
          const isCurrentMonth = day?.getMonth() === currentDate?.getMonth();
          const isToday = day?.toDateString() === new Date()?.toDateString();
          
          return (
            <div
              key={day?.toISOString()}
              className={`
                min-h-[120px] border-r border-b border-border last:border-r-0 p-2
                hover:bg-muted/50 transition-breathing cursor-pointer
                ${!isCurrentMonth ? 'bg-muted/20 text-text-secondary' : ''}
                ${isToday ? 'bg-accent/10' : ''}
              `}
              onClick={() => onTimeSlotClick(null, null, day)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${isToday ? 'font-semibold text-accent' : ''}`}>
                  {day?.getDate()}
                </span>
                {dayAppointments?.length > 0 && (
                  <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-1">
                    {dayAppointments?.length}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {dayAppointments?.slice(0, 3)?.map((appointment) => (
                  <AppointmentCard key={appointment?.id} appointment={appointment} isCompact />
                ))}
                {dayAppointments?.length > 3 && (
                  <div className="text-xs text-text-secondary text-center py-1">
                    +{dayAppointments?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;