import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const HealthProfileForm = ({ formData, setFormData, errors }) => {
  const therapyInterests = [
    { value: 'abhyanga', label: 'Abhyanga (अभ्यंग) - Oil Massage', description: 'Full body therapeutic oil massage' },
    { value: 'shirodhara', label: 'Shirodhara (शिरोधारा) - Oil Dripping', description: 'Continuous oil pouring on forehead' },
    { value: 'virechana', label: 'Virechana (विरेचन) - Purgation', description: 'Therapeutic purgation therapy' },
    { value: 'basti', label: 'Basti (बस्ति) - Enema Therapy', description: 'Medicated enema treatment' },
    { value: 'nasya', label: 'Nasya (नस्य) - Nasal Therapy', description: 'Nasal administration of medicines' },
    { value: 'panchakarma', label: 'Panchakarma (पंचकर्म) - Complete Detox', description: 'Five-fold purification therapy' }
  ];

  const constitutionOptions = [
    { value: 'vata', label: 'Vata (वात) - Air & Space', description: 'Movement and circulation' },
    { value: 'pitta', label: 'Pitta (पित्त) - Fire & Water', description: 'Metabolism and transformation' },
    { value: 'kapha', label: 'Kapha (कफ) - Earth & Water', description: 'Structure and lubrication' },
    { value: 'vata-pitta', label: 'Vata-Pitta (वात-पित्त)', description: 'Dual constitution' },
    { value: 'pitta-kapha', label: 'Pitta-Kapha (पित्त-कफ)', description: 'Dual constitution' },
    { value: 'vata-kapha', label: 'Vata-Kapha (वात-कफ)', description: 'Dual constitution' },
    { value: 'unknown', label: 'Unknown (अज्ञात)', description: 'To be determined by Vaidya' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTherapyInterestChange = (therapyValue, checked) => {
    const currentInterests = formData?.therapyInterests || [];
    if (checked) {
      handleInputChange('therapyInterests', [...currentInterests, therapyValue]);
    } else {
      handleInputChange('therapyInterests', currentInterests?.filter(interest => interest !== therapyValue));
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Health Concerns */}
      <div className="space-y-4">
        <Input
          label="Current Health Concerns"
          type="text"
          placeholder="Describe your main health concerns"
          value={formData?.healthConcerns || ''}
          onChange={(e) => handleInputChange('healthConcerns', e?.target?.value)}
          error={errors?.healthConcerns}
          required
          description="वर्तमान स्वास्थ्य चिंताएं (Current Health Issues)"
        />
      </div>
      {/* Medical History */}
      <div className="space-y-4">
        <Input
          label="Medical History"
          type="text"
          placeholder="Any previous medical conditions or treatments"
          value={formData?.medicalHistory || ''}
          onChange={(e) => handleInputChange('medicalHistory', e?.target?.value)}
          description="चिकित्सा इतिहास (Medical History)"
        />
      </div>
      {/* Current Medications */}
      <div className="space-y-4">
        <Input
          label="Current Medications"
          type="text"
          placeholder="List any medications you are currently taking"
          value={formData?.currentMedications || ''}
          onChange={(e) => handleInputChange('currentMedications', e?.target?.value)}
          description="वर्तमान दवाएं (Current Medicines)"
        />
      </div>
      {/* Ayurvedic Constitution */}
      <Select
        label="Ayurvedic Constitution (Prakriti)"
        options={constitutionOptions}
        value={formData?.constitution || ''}
        onChange={(value) => handleInputChange('constitution', value)}
        placeholder="Select your constitution if known"
        description="प्रकृति (Natural Constitution)"
        searchable
      />
      {/* Therapy Interests */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Therapy Interests
          </label>
          <p className="text-xs text-muted-foreground mb-4">
            चिकित्सा रुचियां (Select therapies you are interested in)
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {therapyInterests?.map((therapy) => (
            <div key={therapy?.value} className="space-y-2">
              <Checkbox
                label={therapy?.label}
                description={therapy?.description}
                checked={(formData?.therapyInterests || [])?.includes(therapy?.value)}
                onChange={(e) => handleTherapyInterestChange(therapy?.value, e?.target?.checked)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Allergies */}
      <Input
        label="Allergies"
        type="text"
        placeholder="List any known allergies"
        value={formData?.allergies || ''}
        onChange={(e) => handleInputChange('allergies', e?.target?.value)}
        description="एलर्जी (Known Allergies)"
      />
      {/* Lifestyle Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Exercise Frequency"
          options={[
            { value: 'daily', label: 'Daily (दैनिक)' },
            { value: 'weekly', label: '3-4 times per week (साप्ताहिक)' },
            { value: 'occasional', label: 'Occasionally (कभी-कभार)' },
            { value: 'none', label: 'None (कोई नहीं)' }
          ]}
          value={formData?.exerciseFrequency || ''}
          onChange={(value) => handleInputChange('exerciseFrequency', value)}
          placeholder="Select exercise frequency"
          description="व्यायाम आवृत्ति (Exercise Routine)"
        />

        <Select
          label="Diet Type"
          options={[
            { value: 'vegetarian', label: 'Vegetarian (शाकाहारी)' },
            { value: 'vegan', label: 'Vegan (शुद्ध शाकाहारी)' },
            { value: 'non-vegetarian', label: 'Non-Vegetarian (मांसाहारी)' },
            { value: 'mixed', label: 'Mixed (मिश्रित)' }
          ]}
          value={formData?.dietType || ''}
          onChange={(value) => handleInputChange('dietType', value)}
          placeholder="Select diet type"
          description="आहार प्रकार (Diet Preference)"
        />
      </div>
    </div>
  );
};

export default HealthProfileForm;