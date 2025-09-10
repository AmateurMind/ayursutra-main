import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationSteps = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: "Personal Details", subtitle: "व्यक्तिगत विवरण" },
    { number: 2, title: "Contact Information", subtitle: "संपर्क जानकारी" },
    { number: 3, title: "Health Profile", subtitle: "स्वास्थ्य प्रोफ़ाइल" },
    { number: 4, title: "Verification", subtitle: "सत्यापन" }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <div key={step?.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-breathing
                ${currentStep >= step?.number 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === step?.number 
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {currentStep > step?.number ? (
                  <Icon name="Check" size={16} />
                ) : (
                  step?.number
                )}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-xs font-medium ${
                  currentStep >= step?.number ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {step?.subtitle}
                </div>
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-4 transition-breathing
                ${currentStep > step?.number ? 'bg-primary' : 'bg-muted'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationSteps;