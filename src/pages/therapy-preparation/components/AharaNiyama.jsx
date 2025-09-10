import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AharaNiyama = ({ dietaryGuidelines, onMarkComplete }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'allowed',
      title: 'Allowed Foods',
      sanskritTerm: 'Pathya Ahara',
      icon: 'CheckCircle',
      color: 'success',
      items: dietaryGuidelines?.allowed
    },
    {
      id: 'restricted',
      title: 'Restricted Foods',
      sanskritTerm: 'Apathya Ahara',
      icon: 'XCircle',
      color: 'error',
      items: dietaryGuidelines?.restricted
    },
    {
      id: 'timing',
      title: 'Meal Timing',
      sanskritTerm: 'Ahara Kala',
      icon: 'Clock',
      color: 'warning',
      items: dietaryGuidelines?.timing
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="Utensils" size={20} className="text-success" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Ahara Niyama
          </h2>
          <p className="text-sm text-text-secondary">Dietary Guidelines for Optimal Therapy</p>
        </div>
      </div>
      <div className="space-y-4">
        {sections?.map((section) => (
          <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full px-4 py-3 bg-muted/50 hover:bg-muted transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${section?.color}/10`}>
                  <Icon name={section?.icon} size={16} className={`text-${section?.color}`} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{section?.title}</h3>
                  <p className="text-sm text-text-secondary">{section?.sanskritTerm}</p>
                </div>
              </div>
              <Icon 
                name={expandedSection === section?.id ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary" 
              />
            </button>

            {expandedSection === section?.id && (
              <div className="p-4 bg-background">
                <div className="grid gap-3">
                  {section?.items?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-${section?.color}/10 mt-0.5`}>
                        <Icon name="Dot" size={12} className={`text-${section?.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{item?.name}</h4>
                        <p className="text-sm text-text-secondary mb-2">{item?.description}</p>
                        {item?.benefits && (
                          <div className="text-xs text-primary bg-primary/5 rounded px-2 py-1 inline-block">
                            Benefits: {item?.benefits}
                          </div>
                        )}
                        {item?.reason && (
                          <div className="text-xs text-error bg-error/5 rounded px-2 py-1 inline-block">
                            Reason: {item?.reason}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-accent/5 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Important Reminders</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Follow these guidelines 24 hours before your therapy session</li>
              <li>• Drink warm water throughout the day (Ushna Jala)</li>
              <li>• Avoid heavy meals 3 hours before therapy</li>
              <li>• Consult your Vaidya if you have any dietary concerns</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={() => onMarkComplete('dietary-guidelines')}
          iconName="Check"
          iconSize={16}
        >
          Mark as Reviewed
        </Button>
      </div>
    </div>
  );
};

export default AharaNiyama;