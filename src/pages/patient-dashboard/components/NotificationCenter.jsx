import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ onMarkAllRead, onViewNotification }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Therapy Session',
      message: 'Your Abhyanga session with Dr. Priya Sharma is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      isRead: false,
      priority: 'high',
      icon: 'Calendar'
    },
    {
      id: 2,
      type: 'preparation',
      title: 'Purva Karma Reminder',
      message: 'Please follow the pre-therapy diet guidelines. Avoid heavy meals 3 hours before your session.',
      time: '4 hours ago',
      isRead: false,
      priority: 'medium',
      icon: 'CheckSquare'
    },
    {
      id: 3,
      type: 'feedback',
      title: 'Feedback Pending',
      message: 'Please share your experience from the Shirodhara session on September 5th',
      time: '1 day ago',
      isRead: true,
      priority: 'low',
      icon: 'MessageSquare'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Confirmation',
      message: 'Your payment of ₹2,500 for therapy sessions has been successfully processed',
      time: '2 days ago',
      isRead: true,
      priority: 'medium',
      icon: 'CreditCard'
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Update Required',
      message: 'Please update your emergency contact information in your profile settings',
      time: '3 days ago',
      isRead: false,
      priority: 'low',
      icon: 'User'
    }
  ]);

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-primary';
      default: return 'border-l-border';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'appointment': return 'text-primary bg-primary/10';
      case 'preparation': return 'text-accent bg-accent/10';
      case 'feedback': return 'text-success bg-success/10';
      case 'payment': return 'text-secondary bg-secondary/10';
      case 'system': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, isRead: true }))
    );
    onMarkAllRead();
  };

  return (
    <div className="card-breathing border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center relative">
            <Icon name="Bell" size={20} className="text-warning" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Notifications
            </h3>
            <p className="font-body text-sm text-text-secondary">
              {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
            </p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
          >
            Mark All Read
          </Button>
        )}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`
              p-4 rounded-lg border-l-4 transition-breathing cursor-pointer hover-lift
              ${getPriorityColor(notification?.priority)}
              ${notification?.isRead ? 'bg-muted/50' : 'bg-background border border-border'}
            `}
            onClick={() => onViewNotification(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(notification?.type)}`}>
                <Icon name={notification?.icon} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className={`font-body font-medium text-sm ${notification?.isRead ? 'text-text-secondary' : 'text-foreground'}`}>
                    {notification?.title}
                  </h4>
                  <span className="font-caption text-xs text-text-secondary whitespace-nowrap ml-2">
                    {notification?.time}
                  </span>
                </div>
                
                <p className={`font-caption text-sm ${notification?.isRead ? 'text-text-secondary' : 'text-foreground'}`}>
                  {notification?.message}
                </p>
                
                {!notification?.isRead && (
                  <div className="flex items-center justify-between mt-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleMarkAsRead(notification?.id);
                      }}
                      className="text-xs"
                    >
                      Mark as read
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {notifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="font-body text-text-secondary">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;