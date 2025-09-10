import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { feedbackService } from '../../../services/feedbackService';
import { useAuth } from '../../../contexts/AuthContext';

const RecentFeedback = ({ onViewAll, onSubmitNew }) => {
  const { user } = useAuth();
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadRecentFeedback();
    }
  }, [user?.id]);

  const loadRecentFeedback = async () => {
    try {
      setLoading(true);
      const feedback = await feedbackService?.getRecentFeedback(user?.id, 3);
      setRecentFeedback(feedback || []);
    } catch (error) {
      setError('Failed to load feedback');
      console.error('Error loading recent feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < (rating || 0) ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  const getTherapyIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'abhyanga': return 'Droplets';
      case 'shirodhara': return 'Waves';
      case 'virechana': return 'Leaf';
      case 'consultation': return 'MessageCircle';
      default: return 'Heart';
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString)?.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  if (loading) {
    return (
      <div className="card-breathing border border-border">
        <div className="flex items-center justify-center py-8">
          <Icon name="Loader2" size={24} className="text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="card-breathing border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Recent Feedback
            </h3>
            <p className="font-body text-sm text-text-secondary">
              Your therapy session reviews
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewAll?.()}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="font-body text-sm text-error">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {recentFeedback?.length > 0 ? (
          recentFeedback?.map((feedback) => (
            <div key={feedback?.id} className="bg-muted rounded-lg p-4 border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getTherapyIcon(feedback?.session?.therapy_type)} 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-foreground">
                      {feedback?.session?.therapy_type?.replace('_', ' ')?.toUpperCase() || 'Therapy Session'}
                    </h4>
                    <p className="font-caption text-xs text-text-secondary">
                      {formatDate(feedback?.session?.appointment?.scheduled_date)} • Dr. {feedback?.practitioner?.user_profile?.full_name?.split(' ')?.[1] || 'Practitioner'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {renderStars(feedback?.rating)}
                </div>
              </div>

              <div className="space-y-2">
                {feedback?.symptoms_before?.length > 0 && (
                  <div>
                    <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
                      Lakshana (Symptoms Before)
                    </span>
                    <p className="font-body text-sm text-foreground mt-1">
                      {feedback?.symptoms_before?.join(', ')}
                    </p>
                  </div>
                )}
                
                {feedback?.improvements?.length > 0 && (
                  <div>
                    <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
                      Shamana (Improvements)
                    </span>
                    <p className="font-body text-sm text-foreground mt-1">
                      {feedback?.improvements?.join(', ')}
                    </p>
                  </div>
                )}
                
                {feedback?.side_effects?.length > 0 && !feedback?.side_effects?.includes('None') && (
                  <div>
                    <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
                      Upadrava (Side Effects)
                    </span>
                    <p className="font-body text-sm text-foreground mt-1">
                      {feedback?.side_effects?.join(', ')}
                    </p>
                  </div>
                )}

                {feedback?.overall_experience && (
                  <div>
                    <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
                      Overall Experience
                    </span>
                    <p className="font-body text-sm text-foreground mt-1">
                      {feedback?.overall_experience}
                    </p>
                  </div>
                )}
              </div>

              {feedback?.practitioner_response && (
                <div className="mt-3 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <div className="flex items-start space-x-2">
                    <Icon name="MessageCircle" size={14} className="text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-xs font-medium text-primary mb-1">
                        Response from {feedback?.practitioner?.user_profile?.full_name}
                      </p>
                      <p className="font-body text-sm text-foreground">
                        {feedback?.practitioner_response}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-heading font-medium text-foreground mb-2">
              No Feedback Yet
            </h3>
            <p className="font-body text-sm text-text-secondary mb-4 max-w-sm mx-auto">
              Complete a therapy session to share your experience and help us improve our services.
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={() => onSubmitNew?.()}
          iconName="Plus"
          iconPosition="left"
          className="w-full"
        >
          Submit New Feedback
        </Button>
      </div>
    </div>
  );
};

export default RecentFeedback;