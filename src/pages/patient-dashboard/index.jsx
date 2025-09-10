import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UpcomingSessionCard from './components/UpcomingSessionCard';
import QuickBookingPanel from './components/QuickBookingPanel';
import ProgressChart from './components/ProgressChart';
import QuickActions from './components/QuickActions';
import RecentFeedback from './components/RecentFeedback';
import NotificationCenter from './components/NotificationCenter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentService } from '../../services/appointmentService';
import { therapyService } from '../../services/therapyService';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut, isAuthenticated } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progressData, setProgressData] = useState(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Load dashboard data when user is available
  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
  }, [user?.id]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load upcoming appointments
      const upcomingAppointments = await appointmentService?.getUpcomingAppointments(user?.id, 3);
      setUpcomingSessions(upcomingAppointments || []);

      // Load progress data
      const progressResults = await therapyService?.getPatientProgress(user?.id);
      if (progressResults?.length > 0) {
        const latestProgress = progressResults?.[0];
        setProgressData({
          currentWeight: latestProgress?.weight_current || 75,
          targetWeight: 70,
          sessionsCompleted: latestProgress?.sessions_completed || 0,
          totalSessions: latestProgress?.total_sessions_planned || 15,
          weeklyProgress: [
            { week: 1, progress: 10 },
            { week: 2, progress: 25 },
            { week: 3, progress: 40 },
            { week: 4, progress: Math.min((latestProgress?.progress_percentage || 0), 100) }
          ]
        });
      } else {
        // Default progress data if no progress records
        setProgressData({
          currentWeight: 75,
          targetWeight: 70,
          sessionsCompleted: 0,
          totalSessions: 0,
          weeklyProgress: [
            { week: 1, progress: 0 },
            { week: 2, progress: 0 },
            { week: 3, progress: 0 },
            { week: 4, progress: 0 }
          ]
        });
      }

    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/patient-login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleViewSessionDetails = (sessionId) => {
    console.log('Viewing session details for:', sessionId);
    // Navigate to session details or open modal
  };

  const handlePrepareSession = (sessionId) => {
    navigate('/therapy-preparation');
  };

  const handleBookTherapy = (bookingData) => {
    if (bookingData?.fullBooking) {
      navigate('/therapy-booking');
    } else {
      console.log('Quick booking:', bookingData);
      // Handle quick booking logic
    }
  };

  const handleNavigate = (destination) => {
    if (typeof destination === 'string' && destination?.startsWith('/')) {
      navigate(destination);
    } else {
      console.log('Navigating to:', destination);
      // Handle other navigation actions
    }
  };

  const handleViewAllFeedback = () => {
    console.log('Viewing all feedback');
    // Navigate to feedback history
  };

  const handleSubmitNewFeedback = () => {
    console.log('Submitting new feedback');
    // Navigate to feedback form
  };

  const handleMarkAllNotificationsRead = () => {
    console.log('Marking all notifications as read');
  };

  const handleViewNotification = (notificationId) => {
    console.log('Viewing notification:', notificationId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          userRole={userProfile?.role || 'patient'}
          isAuthenticated={isAuthenticated}
          userName={userProfile?.full_name}
          onLogout={handleLogout}
        />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center py-12">
              <Icon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole={userProfile?.role || 'patient'}
        isAuthenticated={isAuthenticated}
        userName={userProfile?.full_name}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">
                  {getGreeting()}, {userProfile?.full_name?.split(' ')?.[0] || 'Guest'}! 🙏
                </h1>
                <p className="font-body text-text-secondary">
                  Welcome to your Ayurvedic wellness journey. Here is your therapy overview.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-body text-sm text-foreground">
                    {currentTime?.toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    {currentTime?.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="font-body text-sm text-error">{error}</span>
              </div>
            </div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Primary Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Sessions */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Upcoming Therapy Sessions
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/therapy-booking')}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Book New
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingSessions?.length > 0 ? (
                    upcomingSessions?.slice(0, 2)?.map((session) => (
                      <UpcomingSessionCard
                        key={session?.id}
                        session={session}
                        onViewDetails={handleViewSessionDetails}
                        onPrepare={handlePrepareSession}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 bg-muted/30 rounded-lg border border-border">
                      <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-heading font-medium text-foreground mb-2">
                        No Upcoming Sessions
                      </h3>
                      <p className="font-body text-sm text-text-secondary mb-4">
                        Book your first therapy session to begin your wellness journey
                      </p>
                      <Button
                        onClick={() => navigate('/therapy-booking')}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Book Your First Session
                      </Button>
                    </div>
                  )}
                </div>

                {upcomingSessions?.length > 2 && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="ghost"
                      onClick={() => console.log('View all sessions')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      View All Sessions ({upcomingSessions?.length})
                    </Button>
                  </div>
                )}
              </section>

              {/* Progress Tracking */}
              <section>
                <ProgressChart 
                  progressData={progressData}
                  milestones={[
                    { id: 1, title: 'First Consultation', completed: progressData?.sessionsCompleted > 0, date: '2024-08-15' },
                    { id: 2, title: 'Detox Phase Complete', completed: progressData?.sessionsCompleted > 3, date: '2024-08-30' },
                    { id: 3, title: 'Mid-treatment Assessment', completed: false, date: '2024-09-15' },
                    { id: 4, title: 'Treatment Complete', completed: false, date: '2024-10-01' }
                  ]}
                />
              </section>

              {/* Recent Feedback */}
              <section>
                <RecentFeedback
                  onViewAll={handleViewAllFeedback}
                  onSubmitNew={handleSubmitNewFeedback}
                />
              </section>
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-8">
              {/* Quick Booking Panel */}
              <QuickBookingPanel onBookTherapy={handleBookTherapy} />

              {/* Notifications */}
              <NotificationCenter
                onMarkAllRead={handleMarkAllNotificationsRead}
                onViewNotification={handleViewNotification}
              />

              {/* Quick Actions */}
              <QuickActions onNavigate={handleNavigate} />
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="mt-12 bg-error/5 border border-error/20 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={20} className="text-error" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  Emergency Contact
                </h3>
                <p className="font-body text-sm text-text-secondary mb-3">
                  For urgent medical concerns or therapy-related emergencies, contact our 24/7 helpline.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    className="border-error text-error hover:bg-error hover:text-error-foreground"
                  >
                    Call: +91 98765 43210
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="text-error hover:bg-error/10"
                  >
                    WhatsApp Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;