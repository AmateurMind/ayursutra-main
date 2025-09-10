import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ currentSettings, onUpdateSettings }) => {
  const [settings, setSettings] = useState(currentSettings);

  const handleChannelToggle = (channel, enabled) => {
    setSettings(prev => ({
      ...prev,
      channels: {
        ...prev?.channels,
        [channel]: enabled
      }
    }));
  };

  const handleFrequencyChange = (frequency) => {
    setSettings(prev => ({
      ...prev,
      frequency
    }));
  };

  const handleTimingChange = (timing) => {
    setSettings(prev => ({
      ...prev,
      timing
    }));
  };

  const saveSettings = () => {
    onUpdateSettings(settings);
  };

  const frequencyOptions = [
    { value: 'once', label: 'Once Only' },
    { value: 'daily', label: 'Daily Reminders' },
    { value: 'twice', label: 'Twice Daily' },
    { value: 'hourly', label: 'Every Hour (Last 6 hours)' }
  ];

  const timingOptions = [
    { value: '1hour', label: '1 Hour Before' },
    { value: '3hours', label: '3 Hours Before' },
    { value: '6hours', label: '6 Hours Before' },
    { value: '12hours', label: '12 Hours Before' },
    { value: '24hours', label: '24 Hours Before' }
  ];

  const channels = [
    {
      id: 'inApp',
      name: 'In-App Notifications',
      icon: 'Bell',
      description: 'Push notifications within the app',
      enabled: settings?.channels?.inApp
    },
    {
      id: 'sms',
      name: 'SMS Notifications',
      icon: 'MessageSquare',
      description: 'Text messages to your registered phone',
      enabled: settings?.channels?.sms
    },
    {
      id: 'email',
      name: 'Email Notifications',
      icon: 'Mail',
      description: 'Email reminders to your registered email',
      enabled: settings?.channels?.email
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Messages',
      icon: 'MessageCircle',
      description: 'WhatsApp messages for important updates',
      enabled: settings?.channels?.whatsapp
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
          <Icon name="Settings" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Notification Preferences
          </h3>
          <p className="text-sm text-text-secondary">Customize your reminder settings</p>
        </div>
      </div>
      {/* Notification Channels */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Notification Channels</h4>
        <div className="space-y-4">
          {channels?.map((channel) => (
            <div key={channel?.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
              <Checkbox
                checked={channel?.enabled}
                onChange={(e) => handleChannelToggle(channel?.id, e?.target?.checked)}
                className="mt-1"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name={channel?.icon} size={16} className="text-accent" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{channel?.name}</h5>
                    <p className="text-sm text-text-secondary">{channel?.description}</p>
                  </div>
                </div>
                
                {channel?.enabled && (
                  <div className="ml-11 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="text-success">Active</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Reminder Frequency */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Reminder Frequency</h4>
        <Select
          label="How often would you like to receive reminders?"
          options={frequencyOptions}
          value={settings?.frequency}
          onChange={handleFrequencyChange}
          className="mb-4"
        />
        
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm text-text-secondary">
                {settings?.frequency === 'once' && "You'll receive a single reminder at your chosen time."}
                {settings?.frequency === 'daily' && "Daily reminders will be sent until your appointment."}
                {settings?.frequency === 'twice' && "You'll receive reminders twice daily - morning and evening."}
                {settings?.frequency === 'hourly' && "Hourly reminders in the final 6 hours before your appointment."}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Reminder Timing */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Reminder Timing</h4>
        <Select
          label="When should we send your first reminder?"
          options={timingOptions}
          value={settings?.timing}
          onChange={handleTimingChange}
          className="mb-4"
        />
      </div>
      {/* Quick Setup Options */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Quick Setup</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => setSettings({
              channels: { inApp: true, sms: true, email: false, whatsapp: false },
              frequency: 'twice',
              timing: '6hours'
            })}
            iconName="Zap"
            iconSize={16}
            className="justify-start"
          >
            Essential Only
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setSettings({
              channels: { inApp: true, sms: true, email: true, whatsapp: true },
              frequency: 'daily',
              timing: '24hours'
            })}
            iconName="Volume2"
            iconSize={16}
            className="justify-start"
          >
            All Channels
          </Button>
        </div>
      </div>
      {/* Preview */}
      <div className="mb-6 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Eye" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Preview Your Settings</h4>
            <div className="text-sm text-text-secondary space-y-1">
              <p>• Active channels: {Object.entries(settings?.channels)?.filter(([_, enabled]) => enabled)?.length} of 4</p>
              <p>• Frequency: {frequencyOptions?.find(opt => opt?.value === settings?.frequency)?.label}</p>
              <p>• First reminder: {timingOptions?.find(opt => opt?.value === settings?.timing)?.label}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => setSettings(currentSettings)}
          iconName="RotateCcw"
          iconSize={16}
        >
          Reset
        </Button>
        
        <Button
          variant="default"
          onClick={saveSettings}
          iconName="Save"
          iconSize={16}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;