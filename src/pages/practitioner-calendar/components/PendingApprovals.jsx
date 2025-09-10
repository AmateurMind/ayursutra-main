import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingApprovals = ({ pendingAppointments, onApprove, onReject, onBulkAction }) => {
  const getTherapyIcon = (therapyType) => {
    switch (therapyType) {
      case 'abhyanga': return 'Hand';
      case 'shirodhara': return 'Droplets';
      case 'virechana': return 'Pill';
      case 'basti': return 'Syringe';
      case 'nasya': return 'Wind';
      default: return 'Activity';
    }
  };

  const formatDateTime = (date, time) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(today?.getDate() + 1);

    let dateStr;
    if (appointmentDate?.toDateString() === today?.toDateString()) {
      dateStr = 'Today';
    } else if (appointmentDate?.toDateString() === tomorrow?.toDateString()) {
      dateStr = 'Tomorrow';
    } else {
      dateStr = appointmentDate?.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      });
    }

    return `${dateStr} at ${time}`;
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-background border border-border rounded-lg p-4 hover:shadow-breathing transition-breathing">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name={getTherapyIcon(appointment?.therapyType)} size={20} className="text-warning" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{appointment?.patientName}</h4>
            <p className="text-sm text-text-secondary truncate">{appointment?.therapyType}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{formatDateTime(appointment?.date, appointment?.time)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span>{appointment?.room || 'Room TBD'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Timer" size={12} />
                <span>{appointment?.duration}min</span>
              </div>
            </div>
            
            {appointment?.notes && (
              <p className="text-xs text-text-secondary mt-2 line-clamp-2">
                {appointment?.notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReject(appointment?.id)}
            iconName="X"
            iconSize={14}
            className="text-error hover:text-error-foreground hover:bg-error"
          />
          <Button
            variant="default"
            size="sm"
            onClick={() => onApprove(appointment?.id)}
            iconName="Check"
            iconSize={14}
            className="bg-success hover:bg-success/90 text-success-foreground"
          />
        </div>
      </div>
    </div>
  );

  if (pendingAppointments?.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-breathing p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Pending Approvals
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <p className="text-text-secondary">No pending appointments to approve</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-breathing p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Pending Approvals
          </h3>
          <span className="bg-warning text-warning-foreground text-xs font-medium rounded-full px-2 py-1">
            {pendingAppointments?.length}
          </span>
        </div>
        
        {pendingAppointments?.length > 1 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('reject')}
              iconName="X"
              iconSize={14}
              className="text-error hover:text-error-foreground hover:bg-error"
            >
              Reject All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onBulkAction('approve')}
              iconName="CheckCheck"
              iconSize={14}
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              Approve All
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {pendingAppointments?.map((appointment) => (
          <AppointmentCard key={appointment?.id} appointment={appointment} />
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-semibold text-foreground">
              {pendingAppointments?.filter(apt => apt?.isUrgent)?.length}
            </div>
            <div className="text-text-secondary">Urgent</div>
          </div>
          <div>
            <div className="font-semibold text-foreground">
              {pendingAppointments?.filter(apt => 
                new Date(apt.date)?.toDateString() === new Date()?.toDateString()
              )?.length}
            </div>
            <div className="text-text-secondary">Today</div>
          </div>
          <div>
            <div className="font-semibold text-foreground">
              {pendingAppointments?.filter(apt => apt?.isRecurring)?.length}
            </div>
            <div className="text-text-secondary">Recurring</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;