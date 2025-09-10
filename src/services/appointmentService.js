import { supabase } from '../lib/supabase';

export const appointmentService = {
  // Get all appointments for a patient
  async getPatientAppointments(patientId) {
    try {
      const { data, error } = await supabase?.from('appointments')?.select(`
          *,
          practitioner:practitioners (
            id,
            user_id,
            specialization,
            experience_years,
            rating,
            user_profile:user_profiles (
              full_name,
              avatar_url
            )
          ),
          therapy_definition:therapy_definitions (
            id,
            therapy_type,
            name,
            description,
            duration_minutes,
            benefits
          )
        `)?.eq('patient_id', patientId)?.order('scheduled_date', { ascending: true })?.order('scheduled_time', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch appointments: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      throw error;
    }
  },

  // Get practitioner appointments
  async getPractitionerAppointments(practitionerId) {
    try {
      const { data, error } = await supabase?.from('appointments')?.select(`
          *,
          patient:user_profiles!patient_id (
            id,
            full_name,
            phone,
            avatar_url
          ),
          therapy_definition:therapy_definitions (
            id,
            therapy_type,
            name,
            description,
            duration_minutes
          )
        `)?.eq('practitioner_id', practitionerId)?.order('scheduled_date', { ascending: true })?.order('scheduled_time', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch practitioner appointments: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching practitioner appointments:', error);
      throw error;
    }
  },

  // Create new appointment
  async createAppointment(appointmentData) {
    try {
      const { data, error } = await supabase?.from('appointments')?.insert([appointmentData])?.select(`
          *,
          practitioner:practitioners (
            id,
            user_profile:user_profiles (
              full_name
            )
          ),
          therapy_definition:therapy_definitions (
            name,
            therapy_type
          )
        `)?.single();

      if (error) {
        throw new Error(`Failed to create appointment: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Update appointment
  async updateAppointment(appointmentId, updates) {
    try {
      const { data, error } = await supabase?.from('appointments')?.update({ ...updates, updated_at: new Date()?.toISOString() })?.eq('id', appointmentId)?.select()?.single();

      if (error) {
        throw new Error(`Failed to update appointment: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  // Cancel appointment
  async cancelAppointment(appointmentId, cancellationReason, cancelledBy) {
    try {
      const { data, error } = await supabase?.from('appointments')?.update({
          status: 'cancelled',
          cancellation_reason: cancellationReason,
          cancelled_by: cancelledBy,
          cancelled_at: new Date()?.toISOString(),
          updated_at: new Date()?.toISOString()
        })?.eq('id', appointmentId)?.select()?.single();

      if (error) {
        throw new Error(`Failed to cancel appointment: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  },

  // Get upcoming appointments (next 7 days)
  async getUpcomingAppointments(userId, limit = 10) {
    try {
      const today = new Date()?.toISOString()?.split('T')?.[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0];

      const { data, error } = await supabase?.from('appointments')?.select(`
          *,
          practitioner:practitioners (
            id,
            specialization,
            user_profile:user_profiles (
              full_name,
              avatar_url
            )
          ),
          therapy_definition:therapy_definitions (
            name,
            therapy_type,
            duration_minutes
          )
        `)?.eq('patient_id', userId)?.gte('scheduled_date', today)?.lte('scheduled_date', nextWeek)?.in('status', ['confirmed', 'preparation_required', 'ready'])?.order('scheduled_date', { ascending: true })?.order('scheduled_time', { ascending: true })?.limit(limit);

      if (error) {
        throw new Error(`Failed to fetch upcoming appointments: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching upcoming appointments:', error);
      throw error;
    }
  },

  // Update preparation status
  async updatePreparationStatus(appointmentId, status) {
    try {
      const { data, error } = await supabase?.from('appointments')?.update({ 
          preparation_status: status,
          updated_at: new Date()?.toISOString()
        })?.eq('id', appointmentId)?.select()?.single();

      if (error) {
        throw new Error(`Failed to update preparation status: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating preparation status:', error);
      throw error;
    }
  }
};