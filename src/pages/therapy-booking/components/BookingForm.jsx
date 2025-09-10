import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingForm = ({ selectedTherapy, selectedPractitioner, selectedSlot, onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: 'Arjun Patel',
    phone: '+91 98765 43210',
    email: 'arjun.patel@email.com',
    age: '32',
    gender: 'male',
    emergencyContact: '+91 98765 43211',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    previousAyurvedicTreatment: 'yes',
    specificConcerns: '',
    dietaryRestrictions: '',
    preferredLanguage: 'english',
    transportationNeeded: false,
    accommodationNeeded: false,
    specialRequests: '',
    agreedToTerms: false,
    agreedToPreparation: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Male (पुरुष)' },
    { value: 'female', label: 'Female (स्त्री)' },
    { value: 'other', label: 'Other (अन्य)' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi (हिंदी)' },
    { value: 'gujarati', label: 'Gujarati (ગુજરાતી)' },
    { value: 'bengali', label: 'Bengali (বাংলা)' },
    { value: 'punjabi', label: 'Punjabi (ਪੰਜਾਬੀ)' }
  ];

  const previousTreatmentOptions = [
    { value: 'yes', label: 'Yes, I have received Ayurvedic treatment before' },
    { value: 'no', label: 'No, this is my first Ayurvedic treatment' },
    { value: 'unsure', label: 'I\'m not sure' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.patientName?.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+91\s\d{5}\s\d{5}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.age?.trim()) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData?.age) < 18 || parseInt(formData?.age) > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    if (!formData?.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!formData?.emergencyContact?.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    }

    if (!formData?.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms and conditions';
    }

    if (!formData?.agreedToPreparation) {
      newErrors.agreedToPreparation = 'You must agree to follow preparation guidelines';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingData = {
        ...formData,
        therapy: selectedTherapy,
        practitioner: selectedPractitioner,
        slot: selectedSlot,
        bookingId: `AYS-${Date.now()}`,
        bookingDate: new Date()?.toISOString(),
        status: 'confirmed'
      };
      
      onBookingSubmit(bookingData);
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const formatDateTime = (date, startTime, endTime) => {
    const formattedDate = date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const formattedTime = `${new Date(`2000-01-01T${startTime}`)?.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })} - ${new Date(`2000-01-01T${endTime}`)?.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })}`;
    
    return { formattedDate, formattedTime };
  };

  if (!selectedTherapy || !selectedPractitioner || !selectedSlot) {
    return (
      <div className="bg-card rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-warning" />
          <h3 className="font-heading font-semibold text-lg mb-2">
            Complete Your Selection
          </h3>
          <p className="text-text-secondary">
            Please select therapy, practitioner, and time slot to proceed with booking.
          </p>
        </div>
      </div>
    );
  }

  const { formattedDate, formattedTime } = formatDateTime(
    selectedSlot?.date || new Date(),
    selectedSlot?.startTime,
    selectedSlot?.endTime
  );

  const totalAmount = selectedTherapy?.price + selectedPractitioner?.consultationFee;

  return (
    <div className="bg-card rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl">Booking Details</h2>
        <div className="text-sm text-text-secondary">
          Complete your appointment booking
        </div>
      </div>
      {/* Booking Summary */}
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <h3 className="font-heading font-medium text-foreground">Appointment Summary</h3>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-text-secondary">Therapy</div>
            <div className="font-medium text-foreground">{selectedTherapy?.name}</div>
          </div>
          <div>
            <div className="text-text-secondary">Practitioner</div>
            <div className="font-medium text-foreground">{selectedPractitioner?.name}</div>
          </div>
          <div>
            <div className="text-text-secondary">Date & Time</div>
            <div className="font-medium text-foreground">{formattedDate}</div>
            <div className="font-medium text-foreground">{formattedTime}</div>
          </div>
          <div>
            <div className="text-text-secondary">Total Amount</div>
            <div className="font-medium text-primary text-lg">{formatPrice(totalAmount)}</div>
          </div>
        </div>
      </div>
      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-heading font-medium text-foreground border-b border-border pb-2">
            Personal Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Full Name (पूरा नाम)"
              type="text"
              value={formData?.patientName}
              onChange={(e) => handleInputChange('patientName', e?.target?.value)}
              error={errors?.patientName}
              required
              placeholder="Enter your full name"
            />
            
            <Input
              label="Phone Number (फ़ोन नंबर)"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
              placeholder="your.email@example.com"
            />
            
            <Input
              label="Age (आयु)"
              type="number"
              value={formData?.age}
              onChange={(e) => handleInputChange('age', e?.target?.value)}
              error={errors?.age}
              required
              min="18"
              max="100"
              placeholder="32"
            />
            
            <Select
              label="Gender (लिंग)"
              options={genderOptions}
              value={formData?.gender}
              onChange={(value) => handleInputChange('gender', value)}
              error={errors?.gender}
              required
              placeholder="Select gender"
            />
          </div>

          <Input
            label="Emergency Contact (आपातकालीन संपर्क)"
            type="tel"
            value={formData?.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
            error={errors?.emergencyContact}
            required
            placeholder="+91 98765 43211"
            description="Contact person in case of emergency"
          />
        </div>

        {/* Medical Information */}
        <div className="space-y-4">
          <h3 className="font-heading font-medium text-foreground border-b border-border pb-2">
            Medical Information
          </h3>
          
          <Input
            label="Medical History (चिकित्सा इतिहास)"
            type="text"
            value={formData?.medicalHistory}
            onChange={(e) => handleInputChange('medicalHistory', e?.target?.value)}
            placeholder="Any chronic conditions, surgeries, or significant medical history"
            description="Please mention any ongoing health conditions"
          />

          <Input
            label="Current Medications (वर्तमान दवाएं)"
            type="text"
            value={formData?.currentMedications}
            onChange={(e) => handleInputChange('currentMedications', e?.target?.value)}
            placeholder="List any medications you are currently taking"
          />

          <Input
            label="Allergies (एलर्जी)"
            type="text"
            value={formData?.allergies}
            onChange={(e) => handleInputChange('allergies', e?.target?.value)}
            placeholder="Food allergies, drug allergies, environmental allergies"
            description="Important for treatment safety"
          />

          <Select
            label="Previous Ayurvedic Treatment"
            options={previousTreatmentOptions}
            value={formData?.previousAyurvedicTreatment}
            onChange={(value) => handleInputChange('previousAyurvedicTreatment', value)}
            placeholder="Select your experience"
          />
        </div>

        {/* Treatment Preferences */}
        <div className="space-y-4">
          <h3 className="font-heading font-medium text-foreground border-b border-border pb-2">
            Treatment Preferences
          </h3>
          
          <Input
            label="Specific Concerns (विशिष्ट चिंताएं)"
            type="text"
            value={formData?.specificConcerns}
            onChange={(e) => handleInputChange('specificConcerns', e?.target?.value)}
            placeholder="What specific health issues would you like to address?"
          />

          <Input
            label="Dietary Restrictions (आहार प्रतिबंध)"
            type="text"
            value={formData?.dietaryRestrictions}
            onChange={(e) => handleInputChange('dietaryRestrictions', e?.target?.value)}
            placeholder="Vegetarian, vegan, food restrictions, etc."
          />

          <Select
            label="Preferred Language for Communication"
            options={languageOptions}
            value={formData?.preferredLanguage}
            onChange={(value) => handleInputChange('preferredLanguage', value)}
            placeholder="Select preferred language"
          />
        </div>

        {/* Additional Services */}
        <div className="space-y-4">
          <h3 className="font-heading font-medium text-foreground border-b border-border pb-2">
            Additional Services
          </h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Transportation assistance needed"
              description="We can arrange pickup and drop service (additional charges apply)"
              checked={formData?.transportationNeeded}
              onChange={(e) => handleInputChange('transportationNeeded', e?.target?.checked)}
            />
            
            <Checkbox
              label="Accommodation assistance needed"
              description="Help with nearby accommodation arrangements"
              checked={formData?.accommodationNeeded}
              onChange={(e) => handleInputChange('accommodationNeeded', e?.target?.checked)}
            />
          </div>

          <Input
            label="Special Requests (विशेष अनुरोध)"
            type="text"
            value={formData?.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
            placeholder="Any special requirements or requests for your treatment"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <h3 className="font-heading font-medium text-foreground border-b border-border pb-2">
            Terms & Conditions
          </h3>
          
          <div className="space-y-3">
            <Checkbox
              label="I agree to the terms and conditions"
              description="I understand the treatment procedures, risks, and payment policies"
              checked={formData?.agreedToTerms}
              onChange={(e) => handleInputChange('agreedToTerms', e?.target?.checked)}
              error={errors?.agreedToTerms}
              required
            />
            
            <Checkbox
              label="I agree to follow preparation guidelines"
              description="I will follow all Purva Karma (pre-treatment) instructions provided"
              checked={formData?.agreedToPreparation}
              onChange={(e) => handleInputChange('agreedToPreparation', e?.target?.checked)}
              error={errors?.agreedToPreparation}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            <Icon name="Shield" size={16} className="inline mr-1" />
            Your information is secure and confidential
          </div>
          
          <Button
            type="submit"
            loading={isSubmitting}
            iconName="Calendar"
            iconSize={16}
            className="min-w-[160px]"
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;