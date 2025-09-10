import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { toast } from "react-hot-toast";


const QuickBookingPanel = ({ onBookTherapy }) => {
  const [selectedTherapy, setSelectedTherapy] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const therapyOptions = [
    {
      value: 'abhyanga',
      label: 'Abhyanga (Oil Massage)',
      description: 'Full body therapeutic oil massage'
    },
    {
      value: 'shirodhara',
      label: 'Shirodhara (Oil Dripping)',
      description: 'Continuous oil pouring on forehead'
    },
    {
      value: 'virechana',
      label: 'Virechana (Purgation)',
      description: 'Therapeutic purification treatment'
    },
    {
      value: 'nasya',
      label: 'Nasya (Nasal Therapy)',
      description: 'Medicated oil administration through nose'
    }
  ];

  const timeSlotOptions = [
    { value: '09:00', label: '9:00 AM - 10:00 AM' },
    { value: '10:30', label: '10:30 AM - 11:30 AM' },
    { value: '14:00', label: '2:00 PM - 3:00 PM' },
    { value: '15:30', label: '3:30 PM - 4:30 PM' },
    { value: '17:00', label: '5:00 PM - 6:00 PM' }
  ];

  const handleQuickBook = () => {
    if (selectedTherapy && selectedTimeSlot) {
      toast.error("Only premium users can access this feature!\n(Use the Advanced option)");

    }
  };

  return (
    <div className="card-breathing border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Plus" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Quick Booking
          </h3>
          <p className="font-body text-sm text-text-secondary">
            Schedule your next therapy session
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="Select Therapy Type"
          placeholder="Choose your therapy"
          options={therapyOptions}
          value={selectedTherapy}
          onChange={setSelectedTherapy}
          searchable
        />

        <Select
          label="Preferred Time Slot"
          placeholder="Select available time"
          options={timeSlotOptions}
          value={selectedTimeSlot}
          onChange={setSelectedTimeSlot}
          disabled={!selectedTherapy}
        />

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="font-body text-sm text-foreground mb-1">
                Booking Guidelines
              </p>
              <ul className="font-caption text-xs text-text-secondary space-y-1">
                <li>• Sessions must be booked 24 hours in advance</li>
                <li>• Follow Ahara Niyama (diet rules) before therapy</li>
                <li>• Arrive 15 minutes early for preparation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={handleQuickBook}
            disabled={!selectedTherapy || !selectedTimeSlot}
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            onClick={() => onBookTherapy({ fullBooking: true })}
            iconName="Settings"
            iconPosition="left"
          >
            Advanced
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickBookingPanel;