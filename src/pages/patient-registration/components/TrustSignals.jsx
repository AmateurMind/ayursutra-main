import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: "AYUSH Ministry Certified",
      description: "आयुष मंत्रालय प्रमाणित",
      icon: "Award"
    },
    {
      id: 2,
      name: "Traditional Ayurveda Board",
      description: "पारंपरिक आयुर्वेद बोर्ड",
      icon: "Shield"
    },
    {
      id: 3,
      name: "ISO 9001:2015 Certified",
      description: "गुणवत्ता प्रमाणित",
      icon: "CheckCircle"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      text: `Panchakarma treatment helped me recover from chronic fatigue. The Vaidyas are very knowledgeable and caring.`,
      rating: 5,
      therapy: "Panchakarma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      text: `Shirodhara therapy was amazing for my stress and anxiety. I feel completely rejuvenated and peaceful.`,
      rating: 5,
      therapy: "Shirodhara",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Meera Patel",
      location: "Ahmedabad",
      text: `The Abhyanga massage improved my joint pain significantly. Traditional Ayurvedic approach works wonders.`,
      rating: 5,
      therapy: "Abhyanga",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const ayurvedicTerms = [
    {
      term: "Rogi",
      meaning: "Patient",
      description: "रोगी - A person seeking Ayurvedic treatment"
    },
    {
      term: "Vaidya",
      meaning: "Ayurvedic Practitioner",
      description: "वैद्य - Qualified Ayurvedic doctor"
    },
    {
      term: "Prakriti",
      meaning: "Constitution",
      description: "प्रकृति - Individual\'s natural constitution"
    },
    {
      term: "Chikitsa",
      meaning: "Treatment",
      description: "चिकित्सा - Therapeutic treatment process"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="card-breathing">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Certifications & Trust
        </h3>
        <div className="space-y-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">{cert?.name}</div>
                <div className="text-xs text-muted-foreground">{cert?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Patient Testimonials */}
      <div className="card-breathing">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Patient Experiences
        </h3>
        <div className="space-y-6">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-foreground">{testimonial?.name}</span>
                    <span className="text-xs text-muted-foreground">• {testimonial?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(testimonial?.rating)}
                    <span className="text-xs text-accent font-medium ml-1">{testimonial?.therapy}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {testimonial?.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Ayurvedic Terms Guide */}
      <div className="card-breathing">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Ayurvedic Terms Guide
        </h3>
        <div className="space-y-3">
          {ayurvedicTerms?.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-breathing">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-primary">{item?.term}</span>
                    <span className="text-xs text-muted-foreground">({item?.meaning})</span>
                  </div>
                  <p className="text-xs text-text-secondary">{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="card-breathing bg-success/5 border border-success/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={16} className="text-success mt-0.5" />
          <div>
            <h4 className="font-medium text-sm text-success mb-1">Secure Registration</h4>
            <p className="text-xs text-success/80 leading-relaxed">
              Your personal and health information is encrypted and protected according to healthcare privacy standards. We never share your data without consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;