import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactInformationForm = ({ formData, setFormData, errors }) => {
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState({ phone: false, email: false });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendPhoneOtp = async () => {
    if (!formData?.phone || formData?.phone?.length !== 10) {
      return;
    }
    
    setOtpLoading(prev => ({ ...prev, phone: true }));
    // Simulate API call
    setTimeout(() => {
      setPhoneOtpSent(true);
      setOtpLoading(prev => ({ ...prev, phone: false }));
    }, 2000);
  };

  const handleSendEmailOtp = async () => {
    if (!formData?.email || !formData?.email?.includes('@')) {
      return;
    }
    
    setOtpLoading(prev => ({ ...prev, email: true }));
    // Simulate API call
    setTimeout(() => {
      setEmailOtpSent(true);
      setOtpLoading(prev => ({ ...prev, email: false }));
    }, 2000);
  };

  const handleVerifyPhoneOtp = () => {
    if (formData?.phoneOtp === '123456') {
      setPhoneVerified(true);
    }
  };

  const handleVerifyEmailOtp = () => {
    if (formData?.emailOtp === '123456') {
      setEmailVerified(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Phone Number Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
              maxLength="10"
              description="मोबाइल नंबर (Mobile Number)"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={handleSendPhoneOtp}
              disabled={!formData?.phone || formData?.phone?.length !== 10 || phoneOtpSent}
              loading={otpLoading?.phone}
              iconName="MessageSquare"
              iconPosition="left"
              className="touch-target"
            >
              {phoneOtpSent ? 'OTP Sent' : 'Send OTP'}
            </Button>
          </div>
        </div>

        {phoneOtpSent && !phoneVerified && (
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-lg">
            <div className="flex-1">
              <Input
                label="Phone OTP"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={formData?.phoneOtp || ''}
                onChange={(e) => handleInputChange('phoneOtp', e?.target?.value)}
                maxLength="6"
                description="OTP sent to your mobile number"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="default"
                onClick={handleVerifyPhoneOtp}
                disabled={!formData?.phoneOtp || formData?.phoneOtp?.length !== 6}
                iconName="Check"
                iconPosition="left"
              >
                Verify
              </Button>
            </div>
          </div>
        )}

        {phoneVerified && (
          <div className="flex items-center gap-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Phone number verified successfully</span>
          </div>
        )}
      </div>
      {/* Email Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={formData?.email || ''}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
              description="ईमेल पता (Email Address)"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={handleSendEmailOtp}
              disabled={!formData?.email || !formData?.email?.includes('@') || emailOtpSent}
              loading={otpLoading?.email}
              iconName="Mail"
              iconPosition="left"
              className="touch-target"
            >
              {emailOtpSent ? 'OTP Sent' : 'Send OTP'}
            </Button>
          </div>
        </div>

        {emailOtpSent && !emailVerified && (
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-lg">
            <div className="flex-1">
              <Input
                label="Email OTP"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={formData?.emailOtp || ''}
                onChange={(e) => handleInputChange('emailOtp', e?.target?.value)}
                maxLength="6"
                description="OTP sent to your email address"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="default"
                onClick={handleVerifyEmailOtp}
                disabled={!formData?.emailOtp || formData?.emailOtp?.length !== 6}
                iconName="Check"
                iconPosition="left"
              >
                Verify
              </Button>
            </div>
          </div>
        )}

        {emailVerified && (
          <div className="flex items-center gap-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Email address verified successfully</span>
          </div>
        )}
      </div>
      {/* Address */}
      <Input
        label="Address"
        type="text"
        placeholder="Enter your complete address"
        value={formData?.address || ''}
        onChange={(e) => handleInputChange('address', e?.target?.value)}
        error={errors?.address}
        required
        description="पता (Address)"
      />
      {/* Emergency Contact */}
      <Input
        label="Emergency Contact"
        type="tel"
        placeholder="Enter emergency contact number"
        value={formData?.emergencyContact || ''}
        onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
        error={errors?.emergencyContact}
        description="आपातकालीन संपर्क (Emergency Contact)"
      />
    </div>
  );
};

export default ContactInformationForm;