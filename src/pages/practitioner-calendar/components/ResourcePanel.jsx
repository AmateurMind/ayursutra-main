import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourcePanel = ({ resources, onResourceToggle, selectedResources }) => {
  const [expandedSections, setExpandedSections] = useState({
    practitioners: true,
    rooms: true,
    equipment: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const groupedResources = {
    practitioners: resources?.filter(r => r?.type === 'practitioner'),
    rooms: resources?.filter(r => r?.type === 'room'),
    equipment: resources?.filter(r => r?.type === 'equipment')
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'practitioner': return 'User';
      case 'room': return 'MapPin';
      case 'equipment': return 'Settings';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const ResourceItem = ({ resource }) => {
    const isSelected = selectedResources?.includes(resource?.id);
    
    return (
      <div
        className={`
          flex items-center justify-between p-3 rounded-md cursor-pointer transition-breathing
          hover:bg-muted/50 ${isSelected ? 'bg-primary/10 border border-primary/20' : ''}
        `}
        onClick={() => onResourceToggle(resource?.id)}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'}
          `}>
            <Icon name={getResourceIcon(resource?.type)} size={16} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{resource?.name}</p>
            <div className="flex items-center space-x-2">
              <span className={`text-xs ${getStatusColor(resource?.status)}`}>
                {resource?.status}
              </span>
              {resource?.currentAppointments > 0 && (
                <span className="text-xs text-text-secondary">
                  {resource?.currentAppointments} appointments
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {resource?.hasConflict && (
            <Icon name="AlertTriangle" size={16} className="text-warning" />
          )}
          <div className={`w-3 h-3 rounded-full ${
            resource?.status === 'available' ? 'bg-success' :
            resource?.status === 'busy' ? 'bg-warning' : 'bg-error'
          }`} />
        </div>
      </div>
    );
  };

  const ResourceSection = ({ title, resources, sectionKey }) => (
    <div className="mb-6">
      <Button
        variant="ghost"
        onClick={() => toggleSection(sectionKey)}
        className="w-full justify-between p-3 hover:bg-muted/50"
        iconName={expandedSections?.[sectionKey] ? "ChevronDown" : "ChevronRight"}
        iconPosition="right"
        iconSize={16}
      >
        <div className="flex items-center space-x-2">
          <span className="font-medium text-foreground">{title}</span>
          <span className="text-xs bg-muted text-text-secondary rounded-full px-2 py-1">
            {resources?.length}
          </span>
        </div>
      </Button>
      
      {expandedSections?.[sectionKey] && (
        <div className="space-y-2 mt-2">
          {resources?.map((resource) => (
            <ResourceItem key={resource?.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card rounded-lg shadow-breathing p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Resources</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Filter"
            iconSize={16}
            className="text-text-secondary"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconSize={16}
            className="text-text-secondary"
          />
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center space-x-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onResourceToggle('all')}
          className="text-xs"
        >
          Select All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onResourceToggle('none')}
          className="text-xs"
        >
          Clear All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onResourceToggle('available')}
          className="text-xs"
        >
          Available Only
        </Button>
      </div>
      {/* Resource Sections */}
      <div className="space-y-0">
        <ResourceSection
          title="Vaidya Practitioners"
          resources={groupedResources?.practitioners}
          sectionKey="practitioners"
        />
        
        <ResourceSection
          title="Chikitsalaya Kaksha (Rooms)"
          resources={groupedResources?.rooms}
          sectionKey="rooms"
        />
        
        <ResourceSection
          title="Upakaran (Equipment)"
          resources={groupedResources?.equipment}
          sectionKey="equipment"
        />
      </div>
      {/* Resource Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-success">
              {resources?.filter(r => r?.status === 'available')?.length}
            </div>
            <div className="text-xs text-text-secondary">Available</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">
              {resources?.filter(r => r?.status === 'busy')?.length}
            </div>
            <div className="text-xs text-text-secondary">Busy</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-error">
              {resources?.filter(r => r?.status === 'unavailable')?.length}
            </div>
            <div className="text-xs text-text-secondary">Unavailable</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePanel;