import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import RegistrationSteps from './components/RegistrationSteps';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import ContactInformationForm from './components/ContactInformationForm';
import HealthProfileForm from './components/HealthProfileForm';
import VerificationStep from './components/VerificationStep';
import TrustSignals from './components/TrustSignals';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4;

  // Mock credentials for testing
  const mockCredentials = {
    phoneOtp: '123456',
    emailOtp: '123456'
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/patient-dashboard');
    }
  }, [navigate]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
        if (!formData?.age) newErrors.age = 'Age is required';
        if (!formData?.gender) newErrors.gender = 'Gender is required';
        if (!formData?.preferredLanguage) newErrors.preferredLanguage = 'Preferred language is required';
        if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        break;

      case 2:
        if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
        if (formData?.phone && formData?.phone?.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
        if (!formData?.email?.trim()) newErrors.email = 'Email is required';
        if (formData?.email && !formData?.email?.includes('@')) newErrors.email = 'Valid email is required';
        if (!formData?.address?.trim()) newErrors.address = 'Address is required';
        break;

      case 3:
        if (!formData?.healthConcerns?.trim()) newErrors.healthConcerns = 'Health concerns are required';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegistrationComplete = () => {
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'patient');
      localStorage.setItem('userName', formData?.fullName);
      localStorage.setItem('userPhone', formData?.phone);
      localStorage.setItem('userEmail', formData?.email);
      
      setIsLoading(false);
      navigate('/patient-dashboard');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <ContactInformationForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <HealthProfileForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <VerificationStep
            formData={formData}
            onComplete={handleRegistrationComplete}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Details';
      case 2:
        return 'Contact Information';
      case 3:
        return 'Health Profile';
      case 4:
        return 'Verification';
      default:
        return 'Registration';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Tell us about yourself to personalize your Ayurvedic journey';
      case 2:
        return 'Provide contact details for appointment notifications and communication';
      case 3:
        return 'Share your health information to help our Vaidyas provide better care';
      case 4:
        return 'Review your information and complete your registration';
      default:
        return 'Create your AyurSutra account';
    }
  };

  return (
    <>
      <Helmet>
        <title>Patient Registration - AyurSutra</title>
        <meta name="description" content="Register as a patient to begin your Ayurvedic therapy journey with qualified Vaidyas" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header 
          userRole={null}
          isAuthenticated={false}
        />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Registration Form */}
              <div className="lg:col-span-2">
                <div className="card-breathing">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="UserPlus" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h1 className="font-heading font-semibold text-2xl text-foreground">
                          Patient Registration
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          रोगी पंजीकरण - Join AyurSutra Community
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="font-heading font-medium text-lg text-foreground mb-2">
                        {getStepTitle()}
                      </h2>
                      <p className="text-sm text-text-secondary">
                        {getStepDescription()}
                      </p>
                    </div>

                    <RegistrationSteps 
                      currentStep={currentStep} 
                      totalSteps={totalSteps} 
                    />
                  </div>

                  {/* Form Content */}
                  <div className="mb-8">
                    {renderStepContent()}
                  </div>

                  {/* Navigation Buttons */}
                  {currentStep < 4 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        iconName="ChevronLeft"
                        iconPosition="left"
                        className="order-2 sm:order-1"
                      >
                        Previous
                      </Button>
                      
                      <Button
                        variant="default"
                        onClick={handleNext}
                        iconName="ChevronRight"
                        iconPosition="right"
                        className="order-1 sm:order-2"
                      >
                        {currentStep === totalSteps - 1 ? 'Review & Complete' : 'Next Step'}
                      </Button>
                    </div>
                  )}

                  {/* Login Link */}
                  <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <button
                        onClick={() => navigate('/patient-login')}
                        className="text-primary hover:text-primary/80 font-medium transition-breathing focus-ring"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Signals Sidebar */}
              <div className="lg:col-span-1">
                <TrustSignals />
              </div>
            </div>
          </div>
        </main>

        {/* Mock Credentials Notice */}
        <div className="fixed bottom-4 right-4 max-w-sm">
          <div className="card-breathing bg-accent/5 border border-accent/20">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-accent mb-1">Test Credentials</h4>
                <p className="text-xs text-accent/80 leading-relaxed">
                  Use OTP: <strong>123456</strong> for phone and email verification during testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientRegistration;