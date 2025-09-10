import React from 'react';
import Icon from '../../../components/AppIcon';

const PreparationHeader = ({ therapyType, appointmentDate, timeRemaining }) => {
  const formatTimeRemaining = (hours) => {
    if (hours < 24) {
      return `${Math.floor(hours)} hours ${Math.floor((hours % 1) * 60)} minutes`;
    }
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    return `${days} day${days > 1 ? 's' : ''} ${remainingHours} hours`;
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Leaf" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-semibold">Therapy Preparation</h1>
            <p className="text-white/90 font-body">Purva Karma Guidelines</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/80">Next Appointment</div>
          <div className="font-semibold">{appointmentDate}</div>
        </div>
      </div>
      
      <div className="bg-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">{therapyType}</h2>
            <p className="text-white/90 text-sm">Preparation time remaining</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatTimeRemaining(timeRemaining)}</div>
            <div className="text-white/80 text-sm">Until appointment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationHeader;