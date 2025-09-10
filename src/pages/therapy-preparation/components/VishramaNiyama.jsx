import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VishramaNiyama = ({ restGuidelines, onMarkComplete }) => {
  const [completedActivities, setCompletedActivities] = useState({});

  const toggleActivity = (activityId) => {
    setCompletedActivities(prev => ({
      ...prev,
      [activityId]: !prev?.[activityId]
    }));
  };

  const activities = [
    {
      id: 'sleep',
      title: 'Proper Sleep',
      sanskritTerm: 'Nidra Niyama',
      icon: 'Moon',
      description: 'Ensure 7-8 hours of quality sleep before therapy',
      instructions: [
        'Sleep by 10 PM for optimal rest',
        'Avoid screens 1 hour before bedtime',
        'Keep room temperature cool and comfortable',
        'Practice light meditation before sleep'
      ],
      timing: '10:00 PM - 6:00 AM'
    },
    {
      id: 'stress',
      title: 'Stress Management',
      sanskritTerm: 'Chinta Nivaran',
      icon: 'Brain',
      description: 'Maintain mental calmness and avoid stress',
      instructions: [
        'Practice deep breathing exercises (Pranayama)',
        'Avoid stressful conversations or situations',
        'Listen to calming music or mantras',
        'Spend time in nature if possible'
      ],
      timing: 'Throughout the day'
    },
    {
      id: 'physical',
      title: 'Physical Rest',
      sanskritTerm: 'Sharira Vishrama',
      icon: 'Armchair',
      description: 'Avoid strenuous physical activities',
      instructions: [
        'No heavy lifting or intense exercise',
        'Gentle walking is acceptable',
        'Avoid long periods of standing',
        'Take frequent rest breaks'
      ],
      timing: '24 hours before therapy'
    },
    {
      id: 'environment',
      title: 'Environment Preparation',
      sanskritTerm: 'Vatavaran Niyama',
      icon: 'Home',
      description: 'Create a peaceful environment',
      instructions: [
        'Keep living space clean and organized',
        'Use natural lighting when possible',
        'Maintain good air circulation',
        'Remove distractions and noise'
      ],
      timing: 'Day before therapy'
    }
  ];

  const completedCount = Object.values(completedActivities)?.filter(Boolean)?.length;
  const progressPercentage = (completedCount / activities?.length) * 100;

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
            <Icon name="Bed" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Vishrama Niyama
            </h2>
            <p className="text-sm text-text-secondary">Rest & Lifestyle Guidelines</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-text-secondary mb-1">
            {completedCount}/{activities?.length} completed
          </div>
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <button
                onClick={() => toggleActivity(activity?.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  completedActivities?.[activity?.id]
                    ? 'bg-secondary border-secondary text-white' :'border-border hover:border-secondary'
                }`}
              >
                {completedActivities?.[activity?.id] && (
                  <Icon name="Check" size={14} />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Icon name={activity?.icon} size={16} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{activity?.title}</h3>
                    <p className="text-sm text-text-secondary">{activity?.sanskritTerm}</p>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-3">{activity?.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground text-sm">Instructions:</h4>
                  <ul className="space-y-1">
                    {activity?.instructions?.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                        <Icon name="ArrowRight" size={12} className="mt-1 text-primary" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 flex items-center space-x-2 text-xs">
                  <Icon name="Clock" size={12} className="text-warning" />
                  <span className="text-text-secondary">Timing: {activity?.timing}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-secondary/5 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-secondary mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Pro Tips for Better Rest</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Create a consistent bedtime routine</li>
              <li>• Use aromatherapy with lavender or sandalwood</li>
              <li>• Practice gratitude meditation before sleep</li>
              <li>• Keep a journal to clear your mind</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={() => onMarkComplete('rest-guidelines')}
          iconName="Check"
          iconSize={16}
        >
          Mark as Reviewed
        </Button>
      </div>
    </div>
  );
};

export default VishramaNiyama;