import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const VerificationStep = ({ formData, onComplete }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const verificationItems = [
    {
      label: "Personal Details",
      field: "fullName",
      icon: "User",
      status: formData?.fullName ? "complete" : "incomplete"
    },
    {
      label: "Contact Information",
      field: "phone",
      icon: "Phone",
      status: formData?.phone && formData?.email ? "complete" : "incomplete"
    },
    {
      label: "Health Profile",
      field: "healthConcerns",
      icon: "Heart",
      status: formData?.healthConcerns ? "complete" : "incomplete"
    },
    {
      label: "Phone Verification",
      field: "phoneVerified",
      icon: "MessageSquare",
      status: "complete" // Assuming verification was completed in previous step
    },
    {
      label: "Email Verification",
      field: "emailVerified",
      icon: "Mail",
      status: "complete" // Assuming verification was completed in previous step
    }
  ];

  const handleCreateAccount = async () => {
    if (!agreedToTerms || !agreedToPrivacy) {
      return;
    }

    setIsCreatingAccount(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsCreatingAccount(false);
      onComplete();
    }, 3000);
  };

  const canCreateAccount = agreedToTerms && agreedToPrivacy && 
    verificationItems?.every(item => item?.status === "complete");

  return (
    <div className="space-y-6">
      {/* Verification Checklist */}
      <div className="card-breathing">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Registration Summary
        </h3>
        <div className="space-y-4">
          {verificationItems?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${item?.status === 'complete' 
                  ? 'bg-success text-success-foreground' :'bg-muted text-muted-foreground'
                }
              `}>
                {item?.status === 'complete' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={item?.icon} size={16} />
                )}
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm ${
                  item?.status === 'complete' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {item?.label}
                </div>
                <div className={`text-xs ${
                  item?.status === 'complete' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {item?.status === 'complete' ? 'Completed' : 'Incomplete'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Account Summary */}
      <div className="card-breathing">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Account Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium text-foreground">{formData?.fullName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Phone</span>
            <span className="text-sm font-medium text-foreground">+91 {formData?.phone}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium text-foreground">{formData?.email}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Age</span>
            <span className="text-sm font-medium text-foreground">{formData?.age} years</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Preferred Language</span>
            <span className="text-sm font-medium text-foreground">
              {formData?.preferredLanguage === 'english' ? 'English' : 
               formData?.preferredLanguage === 'hindi' ? 'हिंदी' : 'संस्कृत'}
            </span>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms and Conditions"
          description="आयुर्वेदिक चिकित्सा नियम एवं शर्तें (Ayurvedic Treatment Terms)"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          required
        />
        
        <Checkbox
          label="I agree to the Privacy Policy"
          description="गोपनीयता नीति (Privacy and Data Protection Policy)"
          checked={agreedToPrivacy}
          onChange={(e) => setAgreedToPrivacy(e?.target?.checked)}
          required
        />
      </div>
      {/* Important Notice */}
      <div className="card-breathing bg-warning/5 border border-warning/20">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-sm text-warning mb-1">Important Notice</h4>
            <p className="text-xs text-warning/80 leading-relaxed">
              Ayurvedic treatments are complementary therapies. Please consult with qualified Vaidyas and inform them about any existing medical conditions or medications you are taking.
            </p>
          </div>
        </div>
      </div>
      {/* Create Account Button */}
      <div className="pt-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleCreateAccount}
          disabled={!canCreateAccount}
          loading={isCreatingAccount}
          iconName="UserPlus"
          iconPosition="left"
          className="touch-target"
        >
          {isCreatingAccount ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        {!canCreateAccount && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Please complete all steps and agree to terms to create your account
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationStep;