import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PreparationHeader from './components/PreparationHeader';
import PreparationChecklist from './components/PreparationChecklist';
import AharaNiyama from './components/AharaNiyama';
import VishramaNiyama from './components/VishramaNiyama';
import InstructionalContent from './components/InstructionalContent';
import NotificationSettings from './components/NotificationSettings';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TherapyPreparation = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('checklist');
  const [isAuthenticated] = useState(true);
  const [userRole] = useState('patient');
  const [userName] = useState('Raj Pawar');

  // Mock data for therapy preparation
  const therapyDetails = {
    type: "Abhyanga (Full Body Oil Massage)",
    appointmentDate: "Tomorrow, 10:00 AM",
    timeRemaining: 18.5 // hours
  };

  const checklistItems = [
    {
      id: 1,
      title: "Complete Fasting Period",
      sanskritTerm: "Upavasa",
      description: "Light fasting as prescribed by your Vaidya",
      icon: "Clock",
      priority: "high",
      completed: false,
      timing: "12 hours before therapy",
      detailedInstructions: [
        "Stop eating solid foods 12 hours before appointment",
        "Only warm water and herbal teas are allowed",
        "Avoid all dairy products and heavy foods",
        "Take prescribed herbal preparations if any"
      ],
      notes: []
    },
    {
      id: 2,
      title: "Oil Application Preparation",
      sanskritTerm: "Sneha Poorva Karma",
      description: "Prepare your skin for oil absorption",
      icon: "Droplets",
      priority: "high",
      completed: true,
      timing: "2 hours before therapy",
      detailedInstructions: [
        "Take a warm shower to open pores",
        "Avoid using soap or harsh cleansers",
        "Pat dry gently with a soft towel",
        "Wear comfortable, loose clothing"
      ],
      notes: ["Completed warm shower at 8 AM"]
    },
    {
      id: 3,
      title: "Mental Preparation",
      sanskritTerm: "Manas Shuddhi",
      description: "Prepare your mind for healing",
      icon: "Brain",
      priority: "medium",
      completed: false,
      timing: "1 hour before therapy",
      detailedInstructions: [
        "Practice deep breathing exercises",
        "Set positive intentions for healing",
        "Avoid stressful conversations or activities",
        "Listen to calming music or mantras"
      ],
      notes: []
    },
    {
      id: 4,
      title: "Hydration Protocol",
      sanskritTerm: "Jala Sevana",
      description: "Proper hydration for optimal therapy benefits",
      icon: "Waves",
      priority: "medium",
      completed: false,
      timing: "Throughout the day",
      detailedInstructions: [
        "Drink warm water every 30 minutes",
        "Add a pinch of rock salt to water",
        "Avoid cold drinks and ice",
        "Stop drinking 30 minutes before therapy"
      ],
      notes: []
    },
    {
      id: 5,
      title: "Clothing Preparation",
      sanskritTerm: "Vastra Niyama",
      description: "Wear appropriate clothing for therapy",
      icon: "Shirt",
      priority: "low",
      completed: true,
      timing: "Before leaving home",
      detailedInstructions: [
        "Wear old, comfortable clothes that can get oily",
        "Bring extra undergarments",
        "Avoid tight-fitting clothes",
        "Bring a towel for post-therapy cleanup"
      ],
      notes: ["Packed therapy bag with old clothes"]
    }
  ];

  const dietaryGuidelines = {
    allowed: [
      {
        name: "Warm Water",
        description: "Room temperature or slightly warm water throughout the day",
        benefits: "Aids digestion and prepares body for oil absorption"
      },
      {
        name: "Light Fruits",
        description: "Easily digestible fruits like bananas, apples (cooked)",
        benefits: "Provides energy without taxing digestive system"
      },
      {
        name: "Herbal Teas",
        description: "Ginger tea, tulsi tea, or prescribed herbal preparations",
        benefits: "Supports digestion and enhances therapy effectiveness"
      },
      {
        name: "Rice Water",
        description: "Water from cooked rice, lightly salted",
        benefits: "Provides electrolytes and easy nutrition"
      }
    ],
    restricted: [
      {
        name: "Heavy Meals",
        description: "Avoid all heavy, oily, or spicy foods",
        reason: "Can interfere with oil absorption and cause discomfort"
      },
      {
        name: "Dairy Products",
        description: "Milk, cheese, yogurt, and other dairy items",
        reason: "May create mucus and block energy channels"
      },
      {
        name: "Cold Foods & Drinks",
        description: "Ice cream, cold beverages, refrigerated foods",
        reason: "Reduces digestive fire and hampers therapy benefits"
      },
      {
        name: "Processed Foods",
        description: "Packaged snacks, fast food, artificial additives",
        reason: "Contains toxins that counteract purification process"
      }
    ],
    timing: [
      {
        name: "Last Meal Timing",
        description: "Complete your last meal 12 hours before therapy",
        benefits: "Ensures proper digestion and prepares body for treatment"
      },
      {
        name: "Water Intake",
        description: "Stop drinking water 30 minutes before therapy",
        benefits: "Prevents discomfort during treatment"
      },
      {
        name: "Morning Routine",
        description: "Wake up early and complete morning ablutions",
        benefits: "Aligns body rhythm with natural healing processes"
      }
    ]
  };

  const restGuidelines = {
    sleep: "Ensure 7-8 hours of quality sleep",
    stress: "Avoid stressful situations and practice meditation",
    physical: "Limit physical exertion and take frequent rest",
    environment: "Create a peaceful, clean environment"
  };

  const instructionalVideos = [
    {
      id: 1,
      title: "Pre-Abhyanga Preparation Guide",
      description: "Complete guide to preparing for your oil massage therapy",
      thumbnail: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg",
      duration: "12:14",
      instructor: "Dr. Rajesh Sharma",
      rating: "4.9",
      videoUrl: "https://www.youtube.com/watch?v=JWxFlKkSq54" // <-- added YouTube link
    },
    {
      id: 2,
      title: "Breathing Techniques for Therapy",
      description: "Learn Pranayama techniques to enhance therapy benefits",
      thumbnail: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
      duration: "3:00",
      instructor: "Dr. Priya Patel",
      rating: "4.8",
      videoUrl: "https://www.youtube.com/watch?v=Wemm-i6XHr8" // <-- added YouTube link
    },
    {
      id: 3,
      title: "Post-Therapy Care Instructions",
      description: "Essential care tips for after your Abhyanga session",
      thumbnail: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
      duration: "9:25:15",
      instructor: "Dr. Amit Gupta",
      rating: "4.7",
      videoUrl: "https://www.youtube.com/watch?v=RCxp0MLzRYw" // <-- added YouTube link
    }
  ];

  const expertTips = [
    {
      id: 1,
      title: "Optimal Oil Temperature",
      category: "Preparation Technique",
      icon: "Thermometer",
      content: `The oil used in Abhyanga should be slightly warm, not hot. Test the temperature on your wrist before application. Warm oil penetrates deeper into tissues and provides better therapeutic benefits. If the oil is too hot, it can cause burns; if too cold, it won't absorb properly.`,
      author: "Rajesh Vaidya",
      experience: 25
    },
    {
      id: 2,
      title: "Mind-Body Connection",
      category: "Mental Preparation",
      icon: "Heart",
      content: `Abhyanga is not just a physical therapy but a spiritual practice. Approach it with reverence and positive intention. Visualize the healing energy flowing through your body. This mental preparation enhances the therapeutic effects significantly.`,
      author: "Meera Sharma",
      experience: 18
    },
    {
      id: 3,
      title: "Seasonal Considerations",
      category: "Timing & Environment",
      icon: "Sun",
      content: `The best time for Abhyanga varies by season. In winter, morning sessions are ideal as they warm the body. In summer, early morning or evening sessions prevent overheating. Always ensure the room is warm and draft-free.`,
      author: "Amit Kumar",
      experience: 22
    },
    {
      id: 4,
      title: "Post-Therapy Rest",
      category: "Recovery Protocol",
      icon: "Bed",
      content: `After Abhyanga, rest for at least 30 minutes before bathing. This allows the oil to penetrate deeply and the body to integrate the therapy. Avoid strenuous activities for the rest of the day to maximize benefits.`,
      author: "Sunita Devi",
      experience: 30
    }
  ];

  const emergencyContact = {
    name: "Dr. Mohammad Suhail",
    designation: "Senior Ayurvedic Practitioner",
    phone: "+91 98765 43210",
    available: "24/7"
  };

  const notificationSettings = {
    channels: {
      inApp: true,
      sms: true,
      email: false,
      whatsapp: true
    },
    frequency: 'twice',
    timing: '6hours'
  };

  const handleItemComplete = (itemId, completed) => {
    // Update checklist item completion status
    console.log(`Item ${itemId} marked as ${completed ? 'completed' : 'incomplete'}`);
  };

  const handleAddNote = (itemId, note) => {
    // Add note to checklist item
    console.log(`Note added to item ${itemId}: ${note}`);
  };

  const handleMarkComplete = (section) => {
    // Mark entire section as reviewed
    console.log(`Section ${section} marked as reviewed`);
  };

  const handleUpdateSettings = (newSettings) => {
    // Update notification settings
    console.log('Notification settings updated:', newSettings);
  };

  const handleLogout = () => {
    navigate('/patient-login');
  };

  const handleContactPractitioner = () => {
    // Open contact modal or navigate to messaging
    console.log('Contacting practitioner...');
  };

  const tabs = [
    { id: 'checklist', label: 'Checklist', icon: 'CheckSquare' },
    { id: 'diet', label: 'Diet Rules', icon: 'Utensils' },
    { id: 'rest', label: 'Rest Guidelines', icon: 'Bed' },
    { id: 'videos', label: 'Instructions', icon: 'Play' },
    { id: 'notifications', label: 'Reminders', icon: 'Bell' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PreparationHeader
            therapyType={therapyDetails?.type}
            appointmentDate={therapyDetails?.appointmentDate}
            timeRemaining={therapyDetails?.timeRemaining}
          />

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'checklist' && (
                <PreparationChecklist
                  checklistItems={checklistItems}
                  onItemComplete={handleItemComplete}
                  onAddNote={handleAddNote}
                />
              )}

              {activeTab === 'diet' && (
                <AharaNiyama
                  dietaryGuidelines={dietaryGuidelines}
                  onMarkComplete={handleMarkComplete}
                />
              )}

              {activeTab === 'rest' && (
                <VishramaNiyama
                  restGuidelines={restGuidelines}
                  onMarkComplete={handleMarkComplete}
                />
              )}

              {activeTab === 'videos' && (
                <InstructionalContent
                  videos={instructionalVideos}
                  tips={expertTips}
                  emergencyContact={emergencyContact}
                />
              )}

              {activeTab === 'notifications' && (
                <NotificationSettings
                  currentSettings={notificationSettings}
                  onUpdateSettings={handleUpdateSettings}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/therapy-booking')}
                    iconName="Calendar"
                    iconSize={16}
                  >
                    View Appointment Details
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleContactPractitioner}
                    iconName="MessageCircle"
                    iconSize={16}
                  >
                    Contact Practitioner
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/patient-dashboard')}
                    iconName="ArrowLeft"
                    iconSize={16}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Preparation Progress
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Checklist Items</span>
                    <span className="text-sm font-medium text-foreground">
                      {checklistItems?.filter(item => item?.completed)?.length}/{checklistItems?.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Diet Guidelines</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="text-sm text-success">Reviewed</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Rest Guidelines</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-warning" />
                      <span className="text-sm text-warning">Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Reminder */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Next Reminder</h3>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  You'll receive your next preparation reminder in 2 hours via SMS and WhatsApp.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setActiveTab('notifications')}
                  iconName="Settings"
                  iconSize={14}
                >
                  Customize Reminders
                </Button>
              </div>
              <div className="bg-error/5 border border-error/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-error" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Emergency Contact
                    </h3>
                    <p className="text-sm text-text-secondary">Available 24/7 for urgent queries</p>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{emergencyContact?.name}</h4>
                      <p className="text-sm text-text-secondary">{emergencyContact?.designation}</p>
                    </div>
                    <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                      <Icon name="UserCheck" size={20} className="text-error" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={16} className="text-text-secondary" />
                      <span className="text-sm text-foreground">{emergencyContact?.phone}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Phone"
                        iconSize={14}
                        className="ml-auto"
                        onClick={() => {
                          if (confirm(`Do you want to dial ${emergencyContact?.phone}?`)) {
                            window.location.href = `tel:${emergencyContact?.phone}`;
                          }
                        }}
                      >
                        Call Now
                      </Button>

                    </div>

                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={16} className="text-text-secondary" />
                      <span className="text-sm text-foreground">Email Available</span>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Mail"
                        iconSize={14}
                        className="ml-auto"
                        onClick={() =>
                          window.open(
                            "https://mail.google.com/mail/?view=cm&fs=1&to=suhail17mohammad@gmail.com&subject=Ayurveda%20Inquiry&body=Hello,%20I%20have%20some%20questions%20about%20Ayurveda.",
                            "_blank"
                          )
                        }
                      >
                        Email
                      </Button>


                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-warning/5 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground font-medium mb-1">When to Contact:</p>
                        <ul className="text-xs text-text-secondary space-y-1">
                          <li>• Severe allergic reactions to prescribed preparations</li>
                          <li>• Unexpected symptoms or discomfort</li>
                          <li>• Questions about medication interactions</li>
                          <li>• Emergency rescheduling needs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TherapyPreparation;