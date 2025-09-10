import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'AYUSH Certified',
      description: 'Ministry of AYUSH Approved',
      icon: 'Award',
      color: 'text-success'
    },
    {
      id: 2,
      name: 'ISO 27001',
      description: 'Data Security Standard',
      icon: 'Shield',
      color: 'text-primary'
    },
    {
      id: 3,
      name: 'HIPAA Compliant',
      description: 'Healthcare Privacy Protected',
      icon: 'Lock',
      color: 'text-secondary'
    }
  ];

  const securityFeatures = [
    {
      id: 1,
      title: 'End-to-End Encryption',
      description: 'Your data is encrypted and secure',
      icon: 'ShieldCheck'
    },
    {
      id: 2,
      title: 'OTP Verification',
      description: 'Multi-factor authentication for safety',
      icon: 'Smartphone'
    },
    {
      id: 3,
      title: 'Privacy First',
      description: 'We never share your personal information',
      icon: 'Eye'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground text-center">
          Trusted & Certified
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border"
            >
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${cert?.color}`}>
                <Icon name={cert?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground text-sm">
                  {cert?.name}
                </h4>
                <p className="text-xs text-text-secondary font-body">
                  {cert?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground text-center">
          Your Security Matters
        </h3>
        <div className="space-y-3">
          {securityFeatures?.map((feature) => (
            <div
              key={feature?.id}
              className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground text-sm">
                  {feature?.title}
                </h4>
                <p className="text-xs text-text-secondary font-body mt-1">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Patient Testimonial */}
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="Quote" size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground font-body italic">
              "AyurSutra made my Panchakarma journey seamless. The reminders and preparation guidance helped me stay on track."
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-secondary"></div>
              <div>
                <p className="text-xs font-medium text-foreground font-body">
                  Priya Sharma
                </p>
                <p className="text-xs text-text-secondary font-body">
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Support Contact */}
      <div className="text-center space-y-2">
        <p className="text-sm text-text-secondary font-body">
          Need help? Contact our support team
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1 text-primary">
            <Icon name="Phone" size={14} />
            <span className="text-sm font-body">+91-800-AYUR-123</span>
          </div>
          <div className="flex items-center space-x-1 text-primary">
            <Icon name="Mail" size={14} />
            <span className="text-sm font-body">help@ayursutra.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;