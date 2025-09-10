import { supabase } from '../lib/supabase';

export const feedbackService = {
  // Get all feedback for a patient
  async getPatientFeedback(patientId) {
    try {
      const { data, error } = await supabase?.from('session_feedback')?.select(`
          *,
          session:therapy_sessions (
            id,
            therapy_type,
            actual_start_time,
            appointment:appointments (
              scheduled_date,
              scheduled_time
            )
          ),
          practitioner:practitioners (
            id,
            user_profile:user_profiles (
              full_name,
              avatar_url
            )
          )
        `)?.eq('patient_id', patientId)?.order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch patient feedback: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching patient feedback:', error);
      throw error;
    }
  },

  // Get recent feedback (last 3)
  async getRecentFeedback(patientId, limit = 3) {
    try {
      const { data, error } = await supabase?.from('session_feedback')?.select(`
          *,
          session:therapy_sessions (
            id,
            therapy_type,
            actual_start_time,
            appointment:appointments (
              scheduled_date,
              scheduled_time
            )
          ),
          practitioner:practitioners (
            id,
            user_profile:user_profiles (
              full_name,
              avatar_url
            )
          )
        `)?.eq('patient_id', patientId)?.order('created_at', { ascending: false })?.limit(limit);

      if (error) {
        throw new Error(`Failed to fetch recent feedback: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching recent feedback:', error);
      throw error;
    }
  },

  // Create feedback
  async createFeedback(feedbackData) {
    try {
      const { data, error } = await supabase?.from('session_feedback')?.insert([feedbackData])?.select(`
          *,
          session:therapy_sessions (
            therapy_type,
            appointment:appointments (
              scheduled_date
            )
          ),
          practitioner:practitioners (
            user_profile:user_profiles (
              full_name
            )
          )
        `)?.single();

      if (error) {
        throw new Error(`Failed to create feedback: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  },

  // Update feedback
  async updateFeedback(feedbackId, updates) {
    try {
      const { data, error } = await supabase?.from('session_feedback')?.update({ ...updates, updated_at: new Date()?.toISOString() })?.eq('id', feedbackId)?.select()?.single();

      if (error) {
        throw new Error(`Failed to update feedback: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating feedback:', error);
      throw error;
    }
  },

  // Get feedback by session ID
  async getFeedbackBySession(sessionId) {
    try {
      const { data, error } = await supabase?.from('session_feedback')?.select(`
          *,
          session:therapy_sessions (
            therapy_type,
            appointment:appointments (
              scheduled_date
            )
          ),
          practitioner:practitioners (
            user_profile:user_profiles (
              full_name
            )
          )
        `)?.eq('session_id', sessionId)?.single();

      if (error && error?.code !== 'PGRST116') {
        throw new Error(`Failed to fetch feedback by session: ${error.message}`);
      }

      return data || null;
    } catch (error) {
      console.error('Error fetching feedback by session:', error);
      throw error;
    }
  },

  // Add practitioner response to feedback
  async addPractitionerResponse(feedbackId, response) {
    try {
      const { data, error } = await supabase?.from('session_feedback')?.update({ 
          practitioner_response: response,
          response_date: new Date()?.toISOString(),
          updated_at: new Date()?.toISOString()
        })?.eq('id', feedbackId)?.select()?.single();

      if (error) {
        throw new Error(`Failed to add practitioner response: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error adding practitioner response:', error);
      throw error;
    }
  }
};