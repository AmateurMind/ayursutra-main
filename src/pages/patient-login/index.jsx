import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import NavigationLinks from './components/NavigationLinks';
import Icon from '../../components/AppIcon';

const PatientLogin = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('ayursutra_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLoginSuccess = (userData) => {
    // Store user session data
    localStorage.setItem('ayursutra_user', JSON.stringify({
      ...userData,
      role: 'patient',
      isAuthenticated: true
    }));
    
    // Navigate to patient dashboard
    navigate('/patient-dashboard');
  };

  const ayurvedicTerms = [
    { sanskrit: 'Rogi', english: 'Patient', description: 'One seeking healing' },
    { sanskrit: 'Vaidya', english: 'Practitioner', description: 'Ayurvedic physician' },
    { sanskrit: 'Chikitsa', english: 'Treatment', description: 'Therapeutic intervention' },
    { sanskrit: 'Swasthya', english: 'Health', description: 'State of wellness' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={null}
        isAuthenticated={false}
        userName=""
        onLogout={() => {}}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Login Section */}
            <div className="lg:col-span-2">
              <div className="max-w-md mx-auto">
                <div className="card-breathing">
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                </div>
                
                {/* Ayurvedic Terms */}
                <div className="mt-8 bg-primary/5 rounded-lg p-6 border border-primary/20">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
                    Ayurvedic Terminology
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {ayurvedicTerms?.map((term, index) => (
                      <div key={index} className="text-center p-3 bg-background rounded-lg">
                        <p className="font-data text-primary font-semibold text-sm">
                          {term?.sanskrit}
                        </p>
                        <p className="font-body text-foreground text-xs">
                          {term?.english}
                        </p>
                        <p className="font-caption text-text-secondary text-xs mt-1">
                          {term?.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trust Signals */}
              <div className="card-breathing">
                <TrustSignals />
              </div>
              
              {/* Navigation Links */}
              <div className="card-breathing">
                <NavigationLinks />
              </div>
            </div>
          </div>

          {/* Bottom Section - App Features */}
          <div className="mt-12 bg-card rounded-lg p-8 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Why Choose AyurSutra?
              </h2>
              <p className="text-text-secondary font-body">
                Your comprehensive platform for Ayurvedic wellness management
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: 'Calendar',
                  title: 'Smart Scheduling',
                  description: 'Book and manage therapy appointments with ease',
                  color: 'text-primary'
                },
                {
                  icon: 'Bell',
                  title: 'Automated Reminders',
                  description: 'Never miss preparation or follow-up instructions',
                  color: 'text-accent'
                },
                {
                  icon: 'TrendingUp',
                  title: 'Progress Tracking',
                  description: 'Monitor your healing journey with detailed analytics',
                  color: 'text-success'
                },
                {
                  icon: 'Shield',
                  title: 'Secure & Private',
                  description: 'Your health data is protected with enterprise-grade security',
                  color: 'text-secondary'
                }
              ]?.map((feature, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto ${feature?.color}`}>
                    <Icon name={feature?.icon} size={24} />
                  </div>
                  <h3 className="font-body font-semibold text-foreground">
                    {feature?.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-body">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary font-body">
              <button className="hover:text-foreground transition-breathing">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-breathing">
                Terms of Service
              </button>
              <button className="hover:text-foreground transition-breathing">
                Contact Support
              </button>
            </div>
            <p className="text-sm text-text-secondary font-body">
              © {new Date()?.getFullYear()} AyurSutra. All rights reserved. | Empowering wellness through ancient wisdom.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default PatientLogin;