import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TherapySelection = ({ selectedTherapy, onTherapySelect }) => {
  const [expandedTherapy, setExpandedTherapy] = useState(null);

  const therapies = [
    {
      id: 'panchakarma',
      name: 'Panchakarma (पंचकर्म)',
      englishName: 'Five Actions Detox',
      duration: '21 days',
      price: 45000,
      category: 'Shodhana Chikitsa',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
      description: `Complete Panchakarma regimen including Vamana (therapeutic vomiting), Virechana (purgation), Basti (medicated enemas), Nasya (nasal administration), and Raktamokshana (bloodletting).\n\nThis comprehensive detoxification program removes deep-seated toxins (Ama) and restores natural balance of the three doshas.`,
      benefits: ['Complete detoxification', 'Dosha balancing', 'Immunity boost', 'Mental clarity'],
      preparation: ['3 days Purva Karma', 'Oil massage preparation', 'Dietary restrictions', 'Mental preparation'],
      contraindications: ['Pregnancy', 'Severe heart conditions', 'Active infections'],
      equipment: ['Panchakarma bed', 'Steam chamber', 'Specialized oils', 'Herbal medicines']
    },
    {
      id: 'abhyanga',
      name: 'Abhyanga (अभ्यंग)',
      englishName: 'Full Body Oil Massage',
      duration: '60 minutes',
      price: 2500,
      category: 'Shamana Chikitsa',
      image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg',
      description: `Traditional full-body oil massage using warm medicated oils selected according to your Prakriti (constitution) and current Vikriti (imbalance).\n\nThis therapy improves circulation, nourishes tissues, and promotes deep relaxation while balancing Vata dosha.`,
      benefits: ['Improved circulation', 'Muscle relaxation', 'Skin nourishment', 'Stress relief'],
      preparation: ['Light meal 2 hours before', 'Comfortable clothing', 'Avoid cold drinks'],
      contraindications: ['Fever', 'Indigestion', 'Skin infections'],
      equipment: ['Massage table', 'Medicated oils', 'Steam facility', 'Towels']
    },
    {
      id: 'shirodhara',
      name: 'Shirodhara (शिरोधारा)',
      englishName: 'Oil Pouring Therapy',
      duration: '45 minutes',
      price: 3500,
      category: 'Shamana Chikitsa',
      image: 'https://ayurvaid.com/wp-content/uploads/2022/09/SHIRODHARA.png',
      description: `Continuous pouring of warm medicated oil or other liquids over the forehead in a steady stream.\n\nThis deeply relaxing therapy calms the nervous system, reduces stress, and promotes mental clarity by balancing Vata and Pitta doshas.`,
      benefits: ['Mental relaxation', 'Improved sleep', 'Stress reduction', 'Hair nourishment'],
      preparation: ['Empty stomach preferred', 'Avoid heavy meals', 'Wear old clothes'],
      contraindications: ['Head injuries', 'Severe cold', 'Third trimester pregnancy'],
      equipment: ['Shirodhara table', 'Oil warming system', 'Specialized vessel', 'Towels']
    },
    {
      id: 'virechana',
      name: 'Virechana (विरेचन)',
      englishName: 'Therapeutic Purgation',
      duration: '3-5 days',
      price: 8500,
      category: 'Shodhana Chikitsa',
      image: 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg',
      description: `Controlled therapeutic purgation using herbal medicines to eliminate excess Pitta dosha and accumulated toxins from the body.\n\nThis procedure is particularly effective for digestive disorders, skin conditions, and metabolic imbalances.`,
      benefits: ['Pitta dosha balance', 'Digestive improvement', 'Skin purification', 'Metabolic reset'],
      preparation: ['7 days Purva Karma', 'Oleation therapy', 'Dietary preparation', 'Medical supervision'],
      contraindications: ['Pregnancy', 'Severe weakness', 'Chronic diarrhea', 'Heart conditions'],
      equipment: ['Monitoring equipment', 'Herbal medicines', 'Comfort facilities', 'Emergency support']
    },
    {
      id: 'nasya',
      name: 'Nasya (नस्य)',
      englishName: 'Nasal Administration',
      duration: '30 minutes',
      price: 1800,
      category: 'Shamana Chikitsa',
      image: 'https://images.pexels.com/photos/5240446/pexels-photo-5240446.jpeg',
      description: `Administration of medicated oils, powders, or decoctions through the nasal passages.\n\nThis therapy is highly effective for conditions related to head, neck, and respiratory system, particularly for Kapha-related disorders.`,
      benefits: ['Sinus clearance', 'Headache relief', 'Mental clarity', 'Respiratory health'],
      preparation: ['Avoid cold foods', 'Light head massage', 'Comfortable position'],
      contraindications: ['Nasal injuries', 'Severe cold', 'Pregnancy (certain types)'],
      equipment: ['Nasal administration tools', 'Medicated preparations', 'Comfort support']
    },
    {
      id: 'basti',
      name: 'Basti (बस्ति)',
      englishName: 'Medicated Enema',
      duration: '45 minutes',
      price: 4200,
      category: 'Shodhana Chikitsa',
      image: 'https://images.pexels.com/photos/6663516/pexels-photo-6663516.jpeg',
      description: `Administration of medicated decoctions or oils through the rectum for therapeutic purposes.\n\nConsidered the most important therapy in Ayurveda, Basti is highly effective for Vata disorders and overall rejuvenation.`,
      benefits: ['Vata dosha balance', 'Digestive health', 'Joint mobility', 'Nervous system support'],
      preparation: ['Proper diet', 'Oleation therapy', 'Mental preparation', 'Medical consultation'],
      contraindications: ['Rectal disorders', 'Severe diarrhea', 'Pregnancy', 'Acute fever'],
      equipment: ['Basti equipment', 'Medicated preparations', 'Monitoring tools', 'Comfort facilities']
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Shodhana Chikitsa':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Shamana Chikitsa':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const toggleExpanded = (therapyId) => {
    setExpandedTherapy(expandedTherapy === therapyId ? null : therapyId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl">Select Therapy</h2>
        <div className="text-sm text-text-secondary">
          Choose from traditional Ayurvedic treatments
        </div>
      </div>
      <div className="grid gap-6">
        {therapies?.map((therapy) => {
          const isSelected = selectedTherapy?.id === therapy?.id;
          const isExpanded = expandedTherapy === therapy?.id;

          return (
            <div
              key={therapy?.id}
              className={`
                bg-card rounded-lg border transition-breathing
                ${isSelected ? 'border-primary shadow-elevated' : 'border-border hover:border-primary/50'}
              `}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={therapy?.image}
                      alt={therapy?.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-foreground">
                          {therapy?.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {therapy?.englishName}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-heading font-semibold text-lg text-primary">
                          {formatPrice(therapy?.price)}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {therapy?.duration}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(therapy?.category)}`}>
                        {therapy?.category}
                      </span>
                      <div className="flex items-center text-sm text-text-secondary">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {therapy?.duration}
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {therapy?.description?.split('\n')?.[0]}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => onTherapySelect(therapy)}
                          iconName={isSelected ? "Check" : "Plus"}
                          iconSize={16}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(therapy?.id)}
                          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                          iconSize={16}
                        >
                          {isExpanded ? 'Less Info' : 'More Info'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-border space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                          Description
                        </h4>
                        <p className="text-sm text-text-secondary whitespace-pre-line">
                          {therapy?.description}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                            Benefits
                          </h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            {therapy?.benefits?.map((benefit, index) => (
                              <li key={index} className="flex items-center">
                                <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                            Preparation Required
                          </h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            {therapy?.preparation?.map((prep, index) => (
                              <li key={index} className="flex items-center">
                                <Icon name="AlertCircle" size={14} className="text-warning mr-2 flex-shrink-0" />
                                {prep}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                          Contraindications
                        </h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {therapy?.contraindications?.map((contra, index) => (
                            <li key={index} className="flex items-center">
                              <Icon name="X" size={14} className="text-error mr-2 flex-shrink-0" />
                              {contra}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-heading font-medium text-sm text-foreground mb-2">
                          Equipment & Facilities
                        </h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {therapy?.equipment?.map((equip, index) => (
                            <li key={index} className="flex items-center">
                              <Icon name="Settings" size={14} className="text-primary mr-2 flex-shrink-0" />
                              {equip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TherapySelection;