import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      id: 'todayAppointments',
      label: 'Today\'s Appointments',
      value: stats?.todayAppointments,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'pendingApprovals',
      label: 'Pending Approvals',
      value: stats?.pendingApprovals,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'completedToday',
      label: 'Completed Today',
      value: stats?.completedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'resourceUtilization',
      label: 'Resource Utilization',
      value: `${stats?.resourceUtilization}%`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item) => (
        <div key={item?.id} className="bg-card rounded-lg shadow-breathing p-4 hover-lift transition-breathing">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-text-secondary font-body">{item?.label}</p>
              <p className="text-2xl font-semibold text-foreground font-heading mt-1">
                {item?.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
          </div>
          
          {/* Trend indicator */}
          <div className="flex items-center mt-3 text-xs">
            <Icon name="TrendingUp" size={12} className="text-success mr-1" />
            <span className="text-success">+12%</span>
            <span className="text-text-secondary ml-1">from last week</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;