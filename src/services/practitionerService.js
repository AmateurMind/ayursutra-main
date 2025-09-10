import { supabase } from '../lib/supabase';

export const practitionerService = {
  // Get all verified practitioners
  async getAllPractitioners() {
    try {
      const { data, error } = await supabase?.from('practitioners')?.select(`
          *,
          user_profile:user_profiles (
            id,
            full_name,
            email,
            phone,
            avatar_url
          )
        `)?.eq('is_verified', true)?.order('rating', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch practitioners: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching practitioners:', error);
      throw error;
    }
  },

  // Get practitioner by user ID
  async getPractitionerByUserId(userId) {
    try {
      const { data, error } = await supabase?.from('practitioners')?.select(`
          *,
          user_profile:user_profiles (
            id,
            full_name,
            email,
            phone,
            avatar_url
          )
        `)?.eq('user_id', userId)?.single();

      if (error && error?.code !== 'PGRST116') {
        throw new Error(`Failed to fetch practitioner: ${error.message}`);
      }

      return data || null;
    } catch (error) {
      console.error('Error fetching practitioner by user ID:', error);
      throw error;
    }
  },

  // Get practitioners by therapy type
  async getPractitionersByTherapy(therapyType) {
    try {
      const { data, error } = await supabase?.from('practitioners')?.select(`
          *,
          user_profile:user_profiles (
            id,
            full_name,
            email,
            avatar_url
          )
        `)?.contains('available_therapies', [therapyType])?.eq('is_verified', true)?.order('rating', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch practitioners by therapy: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching practitioners by therapy:', error);
      throw error;
    }
  },

  // Get practitioner availability
  async getPractitionerAvailability(practitionerId) {
    try {
      const { data, error } = await supabase?.from('practitioners')?.select('availability')?.eq('id', practitionerId)?.single();

      if (error) {
        throw new Error(`Failed to fetch practitioner availability: ${error.message}`);
      }

      return data?.availability || {};
    } catch (error) {
      console.error('Error fetching practitioner availability:', error);
      throw error;
    }
  },

  // Update practitioner profile
  async updatePractitioner(practitionerId, updates) {
    try {
      const { data, error } = await supabase?.from('practitioners')?.update({ ...updates, updated_at: new Date()?.toISOString() })?.eq('id', practitionerId)?.select(`
          *,
          user_profile:user_profiles (
            full_name,
            email,
            avatar_url
          )
        `)?.single();

      if (error) {
        throw new Error(`Failed to update practitioner: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating practitioner:', error);
      throw error;
    }
  },

  // Create practitioner profile
  async createPractitioner(practitionerData) {
    try {
      const { data, error } = await supabase?.from('practitioners')?.insert([practitionerData])?.select(`
          *,
          user_profile:user_profiles (
            full_name,
            email,
            avatar_url
          )
        `)?.single();

      if (error) {
        throw new Error(`Failed to create practitioner: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating practitioner:', error);
      throw error;
    }
  },

  // Get practitioner dashboard stats
  async getPractitionerStats(practitionerId) {
    try {
      // Get appointment counts
      const { data: appointmentStats, error: appointmentError } = await supabase?.from('appointments')?.select('status')?.eq('practitioner_id', practitionerId);

      if (appointmentError) {
        throw new Error(`Failed to fetch appointment stats: ${appointmentError.message}`);
      }

      // Get session counts
      const { data: sessionStats, error: sessionError } = await supabase?.from('therapy_sessions')?.select('session_status')?.eq('practitioner_id', practitionerId);

      if (sessionError) {
        throw new Error(`Failed to fetch session stats: ${sessionError.message}`);
      }

      // Get recent feedback
      const { data: recentFeedback, error: feedbackError } = await supabase?.from('session_feedback')?.select('rating, created_at')?.eq('practitioner_id', practitionerId)?.order('created_at', { ascending: false })?.limit(10);

      if (feedbackError) {
        throw new Error(`Failed to fetch recent feedback: ${feedbackError.message}`);
      }

      return {
        totalAppointments: appointmentStats?.length || 0,
        confirmedAppointments: appointmentStats?.filter(a => a?.status === 'confirmed')?.length || 0,
        completedSessions: sessionStats?.filter(s => s?.session_status === 'completed')?.length || 0,
        averageRating: recentFeedback?.length > 0 
          ? (recentFeedback?.reduce((sum, f) => sum + (f?.rating || 0), 0) / recentFeedback?.length)?.toFixed(1)
          : 0,
        totalReviews: recentFeedback?.length || 0
      };
    } catch (error) {
      console.error('Error fetching practitioner stats:', error);
      throw error;
    }
  }
};