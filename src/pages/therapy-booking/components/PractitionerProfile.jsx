import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PractitionerProfile = ({ selectedPractitioner, onPractitionerSelect, availablePractitioners }) => {
  const [showAllPractitioners, setShowAllPractitioners] = useState(false);

  const practitioners = [
    {
      id: 'vaidya-sharma',
      name: 'Dr. Rajesh Sharma',
      title: 'Senior Vaidya (वैद्य)',
      qualification: 'BAMS, MD (Panchakarma)',
      experience: '15 years',
      specializations: ['Panchakarma', 'Digestive Disorders', 'Stress Management'],
      languages: ['Hindi', 'English', 'Sanskrit'],
      rating: 4.8,
      totalReviews: 247,
      image: 'https://thumbs.dreamstime.com/b/mature-indian-doctor-portrait-male-medical-uniform-standing-plain-background-shadow-61211616.jpg',
      certifications: ['Ayurveda Acharya', 'Panchakarma Specialist', 'Yoga Instructor'],
      availability: 'Mon-Sat, 9:00 AM - 6:00 PM',
      consultationFee: 800,
      about: `Dr. Rajesh Sharma is a renowned Ayurvedic practitioner with over 15 years of experience in traditional healing methods.\n\nSpecializing in Panchakarma therapies and digestive health, he has successfully treated thousands of patients using authentic Ayurvedic principles combined with modern diagnostic techniques.`,
      achievements: [
        'Gold Medalist in BAMS',
        'Research in Traditional Panchakarma',
        'Published 25+ research papers',
        'International Ayurveda Conference Speaker'
      ],
      treatmentApproach: 'Holistic healing through personalized treatment plans based on individual Prakriti and Vikriti assessment.'
    },
    {
      id: 'vaidya-patel',
      name: 'Dr. Priya Patel',
      title: 'Ayurveda Consultant',
      qualification: 'BAMS, MS (Ayurveda)',
      experience: '12 years',
      specializations: ['Women\'s Health', 'Skin Disorders', 'Respiratory Issues'],
      languages: ['Hindi', 'English', 'Gujarati'],
      rating: 4.9,
      totalReviews: 189,
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg',
      certifications: ['Women\'s Health Specialist', 'Dermatology Expert', 'Pulse Diagnosis Master'],
      availability: 'Tue-Sun, 10:00 AM - 7:00 PM',
      consultationFee: 750,
      about: `Dr. Priya Patel specializes in women's health and dermatological conditions using traditional Ayurvedic methods.\n\nHer expertise in Stree Roga (women's diseases) and Twak Roga (skin diseases) has helped numerous patients achieve natural healing and wellness.`,
      achievements: [
        'Women\'s Health Research Award',
        'Expert in Ayurvedic Dermatology',
        'Traditional Pulse Diagnosis Certification',
        'Community Health Service Award'
      ],
      treatmentApproach: 'Gentle, natural healing with special focus on hormonal balance and skin health through herbal medicines.'
    },
    {
      id: 'vaidya-gupta',
      name: 'Dr. Amit Gupta',
      title: 'Panchakarma Specialist',
      qualification: 'BAMS, PhD (Ayurveda)',
      experience: '18 years',
      specializations: ['Panchakarma', 'Neurological Disorders', 'Joint Pain'],
      languages: ['Hindi', 'English', 'Bengali'],
      rating: 4.7,
      totalReviews: 312,
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg',
      certifications: ['PhD in Ayurveda', 'Panchakarma Expert', 'Marma Therapy Specialist'],
      availability: 'Mon-Fri, 8:00 AM - 5:00 PM',
      consultationFee: 900,
      about: `Dr. Amit Gupta is a distinguished Panchakarma specialist with extensive research background in neurological applications of Ayurveda.\n\nHis innovative approach combines traditional Panchakarma with modern understanding of neurological conditions for optimal patient outcomes.`,
      achievements: [
        'PhD in Ayurvedic Medicine',
        'Neurological Ayurveda Research',
        'International Panchakarma Certification',
        'Excellence in Patient Care Award'
      ],
      treatmentApproach: 'Evidence-based traditional therapy with focus on neurological and musculoskeletal health restoration.'
    },
    {
      id: 'vaidya-singh',
      name: 'Dr. Kavita Singh',
      title: 'Ayurveda Physician',
      qualification: 'BAMS, MD (Dravyaguna)',
      experience: '10 years',
      specializations: ['Herbal Medicine', 'Metabolic Disorders', 'Immunity Building'],
      languages: ['Hindi', 'English', 'Punjabi'],
      rating: 4.6,
      totalReviews: 156,
      image: 'https://media.istockphoto.com/id/1293373291/photo/portrait-of-confident-ethnic-female-doctor.jpg?s=612x612&w=0&k=20&c=CJsw6IgTecJZoBeVXqZdvh2BI-NyVa-8VcQM3fPhbYc=',
      certifications: ['Herbal Medicine Expert', 'Metabolic Health Specialist', 'Immunity Consultant'],
      availability: 'Mon-Sat, 11:00 AM - 8:00 PM',
      consultationFee: 700,
      about: `Dr. Kavita Singh specializes in Dravyaguna (herbal medicine) and metabolic health management through Ayurvedic principles.\n\nHer expertise in medicinal plants and their therapeutic applications helps patients achieve sustainable health improvements.`,
      achievements: [
        'Herbal Medicine Research',
        'Metabolic Health Certification',
        'Traditional Medicine Documentation',
        'Community Wellness Programs'
      ],
      treatmentApproach: 'Personalized herbal formulations and lifestyle modifications for long-term health and immunity enhancement.'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const displayedPractitioners = showAllPractitioners ? practitioners : practitioners?.slice(0, 2);

  if (selectedPractitioner) {
    return (
      <div className="bg-card rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl">Descriptive Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPractitionerSelect(null)}
            iconName="ArrowLeft"
            iconSize={16}
          >
            Go Back
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Image
              src={selectedPractitioner?.image}
              alt={selectedPractitioner?.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-lg text-foreground">
                {selectedPractitioner?.name}
              </h3>
              <p className="text-sm text-text-secondary mb-1">
                {selectedPractitioner?.title}
              </p>
              <p className="text-sm text-text-secondary mb-2">
                {selectedPractitioner?.qualification}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  {renderStars(selectedPractitioner?.rating)}
                  <span className="ml-1 text-text-secondary">
                    {selectedPractitioner?.rating} ({selectedPractitioner?.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPractitioner?.specializations?.map((spec, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                Languages
              </h4>
              <p className="text-sm text-text-secondary">
                {selectedPractitioner?.languages?.join(', ')}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-medium text-sm text-foreground mb-2">
              About
            </h4>
            <p className="text-sm text-text-secondary whitespace-pre-line">
              {selectedPractitioner?.about}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                Experience & Fees
              </h4>
              <div className="space-y-1 text-sm text-text-secondary">
                <p>{selectedPractitioner?.experience} of experience</p>
                <p>Consultation: {formatPrice(selectedPractitioner?.consultationFee)}</p>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                Availability
              </h4>
              <p className="text-sm text-text-secondary">
                {selectedPractitioner?.availability}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl">View Practitioner</h2>
        <div className="text-sm text-text-secondary">
          Choose your preferred Vaidya’s details
        </div>
      </div>
      <div className="space-y-4">
        {displayedPractitioners?.map((practitioner) => (
          <div
            key={practitioner?.id}
            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-breathing cursor-pointer"
            onClick={() => onPractitionerSelect(practitioner)}
          >
            <div className="flex items-start space-x-4">
              <Image
                src={practitioner?.image}
                alt={practitioner?.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      {practitioner?.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {practitioner?.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">
                      {formatPrice(practitioner?.consultationFee)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      consultation
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    {renderStars(practitioner?.rating)}
                    <span className="ml-1 text-sm text-text-secondary">
                      {practitioner?.rating}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {practitioner?.experience} exp.
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {practitioner?.specializations?.slice(0, 3)?.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-text-secondary text-xs rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-text-secondary">
                    <Icon name="Clock" size={14} className="inline mr-1" />
                    {practitioner?.availability?.split(',')?.[0]}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconSize={14}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {practitioners?.length > 2 && (
          <Button
            variant="ghost"
            onClick={() => setShowAllPractitioners(!showAllPractitioners)}
            iconName={showAllPractitioners ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            className="w-full"
          >
            {showAllPractitioners ? 'Show Less' : `View All ${practitioners?.length} Practitioners`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PractitionerProfile;