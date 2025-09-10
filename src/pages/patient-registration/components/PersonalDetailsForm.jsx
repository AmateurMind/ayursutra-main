import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalDetailsForm = ({ formData, setFormData, errors }) => {
  const genderOptions = [
    { value: 'male', label: 'Male (पुरुष)' },
    { value: 'female', label: 'Female (महिला)' },
    { value: 'other', label: 'Other (अन्य)' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'sanskrit', label: 'संस्कृत (Sanskrit)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName || ''}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
          description="नाम (Name)"
        />
        
        <Input
          label="Age"
          type="number"
          placeholder="Enter your age"
          value={formData?.age || ''}
          onChange={(e) => handleInputChange('age', e?.target?.value)}
          error={errors?.age}
          required
          min="18"
          max="100"
          description="आयु (Age)"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender || ''}
          onChange={(value) => handleInputChange('gender', value)}
          error={errors?.gender}
          required
          placeholder="Select gender"
          description="लिंग (Gender)"
        />

        <Select
          label="Preferred Language"
          options={languageOptions}
          value={formData?.preferredLanguage || ''}
          onChange={(value) => handleInputChange('preferredLanguage', value)}
          error={errors?.preferredLanguage}
          required
          placeholder="Select language"
          description="भाषा (Language)"
        />
      </div>
      <Input
        label="Date of Birth"
        type="date"
        value={formData?.dateOfBirth || ''}
        onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
        error={errors?.dateOfBirth}
        required
        description="जन्म तिथि (Date of Birth)"
      />
    </div>
  );
};

export default PersonalDetailsForm;