import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const UpcomingSessionCard = ({ session, onViewDetails, onPrepare }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'preparation_required': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'ready': return 'text-primary bg-primary/10 border-primary/20';
      case 'cancelled': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getTherapyIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'abhyanga': return 'Droplets';
      case 'shirodhara': return 'Waves';
      case 'virechana': return 'Leaf';
      case 'consultation': return 'MessageCircle';
      default: return 'Heart';
    }
  };

  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString?.split(':') || [];
      const hour24 = parseInt(hours, 10);
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      const hour12 = hour24 % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString)?.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handlePrepare = async () => {
    if (typeof onPrepare === 'function') {
      onPrepare?.(session?.id);
    }
  };

  const handleViewDetails = () => {
    if (typeof onViewDetails === 'function') {
      onViewDetails?.(session?.id);
    }
  };

  if (!session) {
    return (
      <div className="card-breathing border border-border bg-muted/30">
        <div className="text-center py-6">
          <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="font-body text-sm text-text-secondary">No session data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-breathing border border-border bg-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={getTherapyIcon(session?.therapy_definition?.therapy_type)} 
              size={20} 
              className="text-primary" 
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {session?.therapy_definition?.name || session?.therapyType || 'Therapy Session'}
            </h3>
            <p className="font-body text-sm text-text-secondary">
              {session?.duration_minutes || session?.therapy_definition?.duration_minutes || 60} minutes session
            </p>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(session?.status)}`}>
          {session?.status?.replace('_', ' ')?.toUpperCase() || 'SCHEDULED'}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="font-body text-sm text-foreground">
            {formatDate(session?.scheduled_date)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="font-body text-sm text-foreground">
            {formatTime(session?.scheduled_time)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="font-body text-sm text-foreground">
            {session?.room_number || 'Room TBA'}
          </span>
        </div>
      </div>

      {session?.practitioner?.user_profile && (
        <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={session?.practitioner?.user_profile?.avatar_url || '/public/assets/images/no_image.png'}
              alt={session?.practitioner?.user_profile?.full_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-body font-medium text-sm text-foreground">
              {session?.practitioner?.user_profile?.full_name}
            </p>
            <p className="font-body text-xs text-text-secondary">
              {session?.practitioner?.specialization?.[0] || 'Ayurvedic Practitioner'}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span className="font-body text-xs text-foreground">
              {session?.practitioner?.rating || '4.8'}
            </span>
          </div>
        </div>
      )}

      {session?.preparation_status && session?.preparation_status !== 'completed' && (
        <div className="mb-4 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={14} className="text-secondary" />
            <span className="font-body text-xs font-medium text-secondary">
              Preparation Required
            </span>
          </div>
          <p className="font-body text-xs text-text-secondary">
            Please complete your pre-session preparation checklist
          </p>
        </div>
      )}

      <div className="flex space-x-2">
        
        
        {session?.preparation_status !== 'completed' && (
          <Button
            variant="default"
            size="sm"
            onClick={handlePrepare}
            iconName="CheckCircle"
            iconPosition="left"
            className="flex-1"
            disabled={loading}
          >
            Prepare
          </Button>
        )}
      </div>

      {error && (
        <div className="mt-3 text-center">
          <p className="font-body text-xs text-error">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingSessionCard;