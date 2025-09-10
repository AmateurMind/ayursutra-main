import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationLinks = () => {
  const navigate = useNavigate();

  const navigationOptions = [
    {
      id: 1,
      title: 'New Patient?',
      description: 'Create your account to start your Ayurvedic journey',
      buttonText: 'Register Now',
      buttonVariant: 'default',
      icon: 'UserPlus',
      action: () => navigate('/patient-registration')
    },
    {
      id: 2,
      title: 'Forgot Account?',
      description: 'Recover access to your existing account',
      buttonText: 'Account Recovery',
      buttonVariant: 'outline',
      icon: 'HelpCircle',
      action: () => {
        // Mock account recovery flow
        alert('Account recovery feature will be available soon. Please contact support at +91-800-AYUR-123');
      }
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Book Consultation',
      description: 'Schedule a consultation with our Vaidyas',
      icon: 'Calendar',
      action: () => navigate('/therapy-booking')
    },
    {
      id: 2,
      title: 'Learn About Therapies',
      description: 'Explore our Ayurvedic treatment options',
      icon: 'BookOpen',
      action: () => {
        // Mock therapy information
        alert('Therapy information page coming soon!');
      }
    },
    {
      id: 3,
      title: 'Find Practitioners',
      description: 'Connect with certified Ayurvedic practitioners',
      icon: 'Users',
      action: () => navigate('/practitioner-calendar')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Primary Navigation */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground text-center">
          Account Options
        </h3>
        <div className="space-y-3">
          {navigationOptions?.map((option) => (
            <div
              key={option?.id}
              className="bg-card rounded-lg p-4 border border-border space-y-3"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={option?.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-body font-semibold text-foreground">
                    {option?.title}
                  </h4>
                  <p className="text-sm text-text-secondary font-body mt-1">
                    {option?.description}
                  </p>
                </div>
              </div>
              <Button
                variant={option?.buttonVariant}
                onClick={option?.action}
                fullWidth
                iconName={option?.icon}
                iconPosition="left"
              >
                {option?.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground text-center">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-breathing focus-ring text-left"
            >
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={action?.icon} size={16} className="text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground text-sm">
                  {action?.title}
                </h4>
                <p className="text-xs text-text-secondary font-body">
                  {action?.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </button>
          ))}
        </div>
      </div>
      {/* Language Support */}
      <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
            <Icon name="Globe" size={20} className="text-secondary" />
          </div>
          <div className="flex-1">
            <h4 className="font-body font-semibold text-foreground">
              Multilingual Support
            </h4>
            <p className="text-sm text-text-secondary font-body">
              Available in English, Hindi, and Sanskrit terminology
            </p>
          </div>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-error/5 rounded-lg p-4 border border-error/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <div className="flex-1">
            <h4 className="font-body font-semibold text-foreground">
              Medical Emergency?
            </h4>
            <p className="text-sm text-text-secondary font-body">
              For urgent medical needs, please call 108 or visit your nearest hospital
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationLinks;