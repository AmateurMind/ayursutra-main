import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onNavigate }) => {
  const actions = [
    {
      id: 'preparation',
      title: 'Therapy Preparation',
      description: 'View Purva Karma checklist',
      icon: 'CheckSquare',
      color: 'primary',
      route: '/therapy-preparation'
    },
    {
      id: 'history',
      title: 'Session History',
      description: 'Past therapy records',
      icon: 'History',
      color: 'secondary',
      action: () => onNavigate('history')
    },
    {
      id: 'payments',
      title: 'Payment History',
      description: 'Invoices and receipts',
      icon: 'CreditCard',
      color: 'accent',
      action: () => onNavigate('payments')
    },
    {
      id: 'feedback',
      title: 'Submit Feedback',
      description: 'Share your experience',
      icon: 'MessageSquare',
      color: 'success',
      action: () => onNavigate('feedback')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage preferences',
      icon: 'Bell',
      color: 'warning',
      action: () => onNavigate('notifications')
    },
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Update your information',
      icon: 'User',
      color: 'muted',
      action: () => onNavigate('profile')
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      muted: 'bg-muted text-text-secondary hover:bg-muted/80'
    };
    return colorMap?.[color] || colorMap?.muted;
  };

  const handleActionClick = (action) => {
    if (action?.route) {
      onNavigate(action?.route);
    } else if (action?.action) {
      action?.action();
    }
  };

  return (
    <div className="card-breathing border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Quick Actions
          </h3>
          <p className="font-body text-sm text-text-secondary">
            Frequently used features
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className={`
              p-4 rounded-lg text-left transition-breathing hover-lift focus-ring
              ${getColorClasses(action?.color)}
            `}
          >
            <div className="flex items-start space-x-3">
              <Icon name={action?.icon} size={20} />
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-sm mb-1">
                  {action?.title}
                </h4>
                <p className="font-caption text-xs opacity-80">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-text-secondary" />
            <span className="font-body text-sm text-text-secondary">
              Need help? Contact support
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('support')}
            iconName="ExternalLink"
            iconPosition="right"
          >
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;