import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, onNewBooking }) => {
  const navigate = useNavigate();

  if (!bookingData) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const formatDateTime = (date, startTime, endTime) => {
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = `${new Date(`2000-01-01T${startTime}`)?.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })} - ${new Date(`2000-01-01T${endTime}`)?.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })}`;

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateTime(
    bookingData?.slot?.date || new Date(),
    bookingData?.slot?.startTime,
    bookingData?.slot?.endTime
  );

  const totalAmount = (Number(bookingData?.therapy?.price) || 0) + (Number(bookingData?.practitioner?.consultationFee) || 0);

  const preparationSteps = [
    {
      title: 'Dietary Guidelines (आहार नियम)',
      items: [
        'Avoid heavy, oily, and spicy foods 3 days before treatment',
        'Include light, easily digestible meals',
        'Drink warm water throughout the day',
        'Avoid cold drinks and ice cream'
      ]
    },
    {
      title: 'Lifestyle Preparation (जीवनशैली तैयारी)',
      items: [
        'Get adequate sleep (7-8 hours) for 3 nights before',
        'Avoid strenuous exercise 24 hours before',
        'Practice meditation or relaxation techniques',
        'Avoid alcohol and smoking'
      ]
    },
    {
      title: 'Day of Treatment',
      items: [
        'Arrive 30 minutes early for consultation',
        'Wear comfortable, loose-fitting clothes',
        'Bring a list of current medications',
        'Inform about any changes in health condition'
      ]
    }
  ];

  const handleViewPreparation = () => {
    navigate('/therapy-preparation', {
      state: {
        bookingData,
        fromBooking: true
      }
    });
  };

  const handleGoToDashboard = () => {
    navigate('/patient-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={32} className="text-success-foreground" />
        </div>
        <h1 className="font-heading font-bold text-2xl text-success mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-success/80">
          Your Ayurvedic therapy appointment has been successfully scheduled
        </p>
        <div className="mt-4 p-3 bg-success/20 rounded-lg">
          <p className="font-heading font-semibold text-success">
            Booking ID: {bookingData?.bookingId}
          </p>
        </div>
      </div>
      {/* Appointment Details */}
      <div className="bg-card rounded-lg p-6 space-y-6">
        <h2 className="font-heading font-semibold text-xl border-b border-border pb-3">
          Appointment Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-medium text-foreground mb-2">
                Therapy Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Treatment:</span>
                  <span className="font-medium text-foreground">{bookingData?.therapy?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Duration:</span>
                  <span className="font-medium text-foreground">{bookingData?.therapy?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Category:</span>
                  <span className="font-medium text-foreground">{bookingData?.therapy?.category}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-medium text-foreground mb-2">
                Practitioner Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Name:</span>
                  <span className="font-medium text-foreground">{bookingData?.practitioner?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Title:</span>
                  <span className="font-medium text-foreground">{bookingData?.practitioner?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Experience:</span>
                  <span className="font-medium text-foreground">{bookingData?.practitioner?.experience}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-medium text-foreground mb-2">
                Schedule Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Date:</span>
                  <span className="font-medium text-foreground">{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Time:</span>
                  <span className="font-medium text-foreground">{formattedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Status:</span>
                  <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-md font-medium">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-medium text-foreground mb-2">
                Payment Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Therapy Cost:</span>
                  <span className="font-medium text-foreground">{formatPrice(bookingData?.therapy?.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Consultation:</span>
                  <span className="font-medium text-foreground">{formatPrice(bookingData?.practitioner?.consultationFee)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-medium text-foreground">Total Amount:</span>
                  <span className="font-semibold text-primary text-lg">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Preparation Guidelines */}
      <div className="bg-card rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl">
            Preparation Guidelines (पूर्व कर्म)
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewPreparation}
            iconName="ExternalLink"
            iconSize={16}
          >
            View Full Guide
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {preparationSteps?.map((step, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  {index + 1}
                </div>
                {step?.title}
              </h3>
              <ul className="space-y-2">
                {step?.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-sm text-text-secondary">
                    <Icon name="Check" size={14} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Important Notes */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-heading font-medium text-warning">
              Important Notes
            </h3>
            <ul className="text-sm text-warning/80 space-y-1">
              <li>• Please arrive 30 minutes early for initial consultation and preparation</li>
              <li>• Bring a valid ID proof and any previous medical reports</li>
              <li>• Inform us immediately if you experience any health changes before the appointment</li>
              <li>• Cancellation must be done at least 24 hours in advance</li>
              <li>• Follow all preparation guidelines for optimal treatment results</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card rounded-lg p-6">
        <h3 className="font-heading font-medium text-foreground mb-4">
          Need Help? Contact Us
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-primary" />
            <div>
              <div className="font-medium text-foreground">Phone</div>
              <div className="text-text-secondary">+91 98765 43210</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-primary" />
            <div>
              <div className="font-medium text-foreground">Email</div>
              <div className="text-text-secondary">support@ayursutra.com</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <div>
              <div className="font-medium text-foreground">WhatsApp</div>
              <div className="text-text-secondary">+91 98765 43210</div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onNewBooking}
          iconName="Plus"
          iconSize={16}
        >
          Book Another Appointment
        </Button>
        <Button
          onClick={handleGoToDashboard}
          iconName="LayoutDashboard"
          iconSize={16}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="secondary"
          onClick={handleViewPreparation}
          iconName="CheckSquare"
          iconSize={16}
        >
          View Preparation Guide
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;