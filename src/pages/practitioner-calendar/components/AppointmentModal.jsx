import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  appointment, 
  onSave, 
  onDelete,
  resources 
}) => {
  const [formData, setFormData] = useState({
    patientName: appointment?.patientName || '',
    therapyType: appointment?.therapyType || '',
    date: appointment?.date?.toISOString()?.split('T')?.[0] || '',
    time: appointment?.time || '',
    duration: appointment?.duration || '60',
    resourceId: appointment?.resourceId || '',
    room: appointment?.room || '',
    notes: appointment?.notes || '',
    status: appointment?.status || 'pending'
  });

  const therapyOptions = [
    { value: 'abhyanga', label: 'Abhyanga (Oil Massage)' },
    { value: 'shirodhara', label: 'Shirodhara (Oil Dripping)' },
    { value: 'virechana', label: 'Virechana (Purgation)' },
    { value: 'basti', label: 'Basti (Medicated Enema)' },
    { value: 'nasya', label: 'Nasya (Nasal Therapy)' },
    { value: 'raktamokshana', label: 'Raktamokshana (Bloodletting)' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending Approval' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const resourceOptions = resources?.map(resource => ({
    value: resource?.id,
    label: `${resource?.name} (${resource?.type})`
  }));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave({
      ...appointment,
      ...formData,
      date: new Date(formData.date)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {appointment ? 'Edit Appointment' : 'New Appointment'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            className="text-text-secondary hover:text-foreground"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Patient Name (Rogi)"
              type="text"
              value={formData?.patientName}
              onChange={(e) => handleInputChange('patientName', e?.target?.value)}
              placeholder="Enter patient name"
              required
            />
            
            <Select
              label="Therapy Type (Chikitsa Prakar)"
              options={therapyOptions}
              value={formData?.therapyType}
              onChange={(value) => handleInputChange('therapyType', value)}
              placeholder="Select therapy type"
              required
            />
          </div>

          {/* Schedule Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              required
            />
            
            <Input
              label="Time"
              type="time"
              value={formData?.time}
              onChange={(e) => handleInputChange('time', e?.target?.value)}
              required
            />
            
            <Select
              label="Duration"
              options={durationOptions}
              value={formData?.duration}
              onChange={(value) => handleInputChange('duration', value)}
              required
            />
          </div>

          {/* Resource Assignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Assigned Resource"
              options={resourceOptions}
              value={formData?.resourceId}
              onChange={(value) => handleInputChange('resourceId', value)}
              placeholder="Select practitioner/resource"
              required
            />
            
            <Input
              label="Room (Chikitsalaya Kaksha)"
              type="text"
              value={formData?.room}
              onChange={(e) => handleInputChange('room', e?.target?.value)}
              placeholder="Room number or name"
            />
          </div>

          {/* Status and Notes */}
          <div className="space-y-4">
            <Select
              label="Status"
              options={statusOptions}
              value={formData?.status}
              onChange={(value) => handleInputChange('status', value)}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes (Tippani)
              </label>
              <textarea
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                placeholder="Add any special instructions or notes..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Conflict Warning */}
          {appointment?.hasConflict && (
            <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning-foreground">
                This appointment has scheduling conflicts. Please review resource availability.
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              {appointment && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(appointment?.id)}
                  iconName="Trash2"
                  iconSize={16}
                >
                  Delete
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                iconName="Save"
                iconSize={16}
              >
                {appointment ? 'Update' : 'Create'} Appointment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;