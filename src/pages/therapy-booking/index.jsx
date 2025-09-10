import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CalendarView from './components/CalendarView';
import TherapySelection from './components/TherapySelection';
import PractitionerProfile from './components/PractitionerProfile';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TherapyBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Booking state management
  const [currentStep, setCurrentStep] = useState('selection'); // selection, booking, confirmation
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  // Mock available slots data
  const [availableSlots, setAvailableSlots] = useState([]);

  // User authentication state
  const [userRole] = useState('patient');
  const [isAuthenticated] = useState(true);
  const [userName] = useState('Arjun Patel');

  // Add available practitioners state
  const [availablePractitioners] = useState([
    { id: 1, name: 'Dr. Rajesh Sharma', specialization: 'Panchakarma', experience: 15, rating: 4.8, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Dr. Priya Patel', specialization: 'Herbal Medicine', experience: 12, rating: 4.7, image: '/api/placeholder/80/80' },
    { id: 3, name: 'Dr. Amit Gupta', specialization: 'Massage Therapy', experience: 10, rating: 4.6, image: '/api/placeholder/80/80' },
    { id: 4, name: 'Dr. Kavita Singh', specialization: 'Detoxification', experience: 18, rating: 4.9, image: '/api/placeholder/80/80' }
  ]);

  useEffect(() => {
    // Generate mock available slots when date is selected
    if (selectedDate) {
      generateAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const generateAvailableSlots = (date) => {
    const practitioners = [
      { id: 1, name: 'Dr. Rajesh Sharma', specialization: 'Panchakarma', experience: 15 },
      { id: 2, name: 'Dr. Priya Patel', specialization: 'Herbal Medicine', experience: 12 }, 
      { id: 3, name: 'Dr. Amit Gupta', specialization: 'Massage Therapy', experience: 10 },
      { id: 4, name: 'Dr. Kavita Singh', specialization: 'Detoxification', experience: 18 }
    ];

    const timeSlots = [
      { start: '09:00', end: '10:00' },
      { start: '10:30', end: '11:30' },
      { start: '12:00', end: '13:00' },
      { start: '14:00', end: '15:00' },
      { start: '15:30', end: '16:30' },
      { start: '17:00', end: '18:00' }
    ];

    const slots = [];
    const today = new Date();
    const isToday = date?.toDateString() === today?.toDateString();
    const currentHour = today?.getHours();

    timeSlots?.forEach((slot, index) => {
      const slotHour = parseInt(slot?.start?.split(':')?.[0]);
      
      // Skip past slots for today
      if (isToday && slotHour <= currentHour) {
        return;
      }

      // Randomly assign practitioners and availability
      const practitioner = practitioners?.[Math.floor(Math.random() * practitioners?.length)];
      const isAvailable = Math.random() > 0.3; // 70% availability rate

      if (isAvailable) {
        slots?.push({
          id: `slot-${date?.getTime()}-${index}`,
          date: date,
          startTime: slot?.start,
          endTime: slot?.end,
          practitioner: practitioner?.name,
          available: true
        });
      }
    });

    setAvailableSlots(slots);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot selection when date changes
  };

  const handleTherapySelect = (therapy) => {
    setSelectedTherapy(therapy);
  };

  const handlePractitionerSelect = (practitioner) => {
    setSelectedPractitioner(practitioner);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingSubmit = (formData) => {
    setBookingData(formData);
    setCurrentStep('confirmation');
  };

  const handleNewBooking = () => {
    // Reset all selections
    setCurrentStep('selection');
    setSelectedDate(null);
    setSelectedTherapy(null);
    setSelectedPractitioner(null);
    setSelectedSlot(null);
    setBookingData(null);
    setAvailableSlots([]);
  };

  const handleLogout = () => {
    navigate('/patient-login');
  };

  const proceedToBooking = () => {
    if (selectedTherapy && selectedPractitioner && selectedSlot) {
      setCurrentStep('booking');
    }
  };

  const backToSelection = () => {
    setCurrentStep('selection');
  };

  const isSelectionComplete = selectedTherapy && selectedPractitioner && selectedSlot;

  // Render confirmation step
  if (currentStep === 'confirmation') {
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
            <BookingConfirmation
              bookingData={bookingData}
              onNewBooking={handleNewBooking}
            />
          </div>
        </main>
      </div>
    );
  }

  // Render booking form step
  if (currentStep === 'booking') {
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
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
              <button
                onClick={backToSelection}
                className="hover:text-foreground transition-breathing"
              >
                Therapy Selection
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Booking Details</span>
            </div>

            <div className="space-y-6">
              {/* Progress Header */}
              <div className="bg-card rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="font-heading font-bold text-2xl text-foreground">
                    Complete Your Booking
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={backToSelection}
                    iconName="ArrowLeft"
                    iconSize={16}
                  >
                    Back to Selection
                  </Button>
                </div>
                
                {/* Selection Summary */}
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Stethoscope" size={16} className="text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Therapy</div>
                      <div className="text-text-secondary">{selectedTherapy?.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} className="text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Practitioner</div>
                      <div className="text-text-secondary">{selectedPractitioner?.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Schedule</div>
                      <div className="text-text-secondary">
                        {selectedDate?.toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} at {selectedSlot?.startTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <BookingForm
                selectedTherapy={selectedTherapy}
                selectedPractitioner={selectedPractitioner}
                selectedSlot={selectedSlot}
                onBookingSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render main selection step
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
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Book Ayurvedic Therapy
                </h1>
                <p className="text-text-secondary">
                  Schedule your personalized Ayurvedic treatment with certified Vaidya practitioners
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right text-sm">
                  <div className="text-text-secondary">Need help?</div>
                  <div className="font-medium text-foreground">+91 98765 43210</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconSize={16}
                >
                  Call Support
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-card rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${selectedTherapy ? 'text-success' : 'text-text-secondary'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    selectedTherapy ? 'bg-success text-success-foreground' : 'bg-muted text-text-secondary'
                  }`}>
                    {selectedTherapy ? <Icon name="Check" size={14} /> : '1'}
                  </div>
                  <span className="text-sm font-medium">Select Therapy</span>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                <div className={`flex items-center space-x-2 ${selectedPractitioner ? 'text-success' : 'text-text-secondary'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    selectedPractitioner ? 'bg-success text-success-foreground' : 'bg-muted text-text-secondary'
                  }`}>
                    {selectedPractitioner ? <Icon name="Check" size={14} /> : '2'}
                  </div>
                  <span className="text-sm font-medium">Choose Practitioner</span>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                <div className={`flex items-center space-x-2 ${selectedSlot ? 'text-success' : 'text-text-secondary'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    selectedSlot ? 'bg-success text-success-foreground' : 'bg-muted text-text-secondary'
                  }`}>
                    {selectedSlot ? <Icon name="Check" size={14} /> : '3'}
                  </div>
                  <span className="text-sm font-medium">Pick Time Slot</span>
                </div>
              </div>
              {isSelectionComplete && (
                <Button
                  onClick={proceedToBooking}
                  iconName="ArrowRight"
                  iconSize={16}
                >
                  Proceed to Booking
                </Button>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Therapy Selection & Calendar */}
            <div className="lg:col-span-2 space-y-8">
              <TherapySelection
                selectedTherapy={selectedTherapy}
                onTherapySelect={handleTherapySelect}
              />
              
              <CalendarView
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                availableSlots={availableSlots}
                onSlotSelect={handleSlotSelect}
                selectedSlot={selectedSlot}
              />
            </div>

            {/* Right Column - Practitioner Profile */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PractitionerProfile
                  selectedPractitioner={selectedPractitioner}
                  onPractitionerSelect={handlePractitionerSelect}
                  availablePractitioners={availablePractitioners}
                />
              </div>
            </div>
          </div>

          {/* Mobile Proceed Button */}
          {isSelectionComplete && (
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden">
              <Button
                onClick={proceedToBooking}
                iconName="ArrowRight"
                iconSize={16}
                fullWidth
              >
                Proceed to Booking
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TherapyBooking;