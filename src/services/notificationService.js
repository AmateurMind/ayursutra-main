import { supabase } from '../lib/supabase';

export const notificationService = {
  // Get all notifications for a user
  async getUserNotifications(userId, limit = 50) {
    try {
      const { data, error } = await supabase?.from('notifications')?.select(`
          *,
          appointment:appointments (
            id,
            scheduled_date,
            scheduled_time,
            therapy_definition:therapy_definitions (
              name,
              therapy_type
            )
          )
        `)?.eq('user_id', userId)?.order('created_at', { ascending: false })?.limit(limit);

      if (error) {
        throw new Error(`Failed to fetch notifications: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      throw error;
    }
  },

  // Get unread notifications count
  async getUnreadNotificationsCount(userId) {
    try {
      const { count, error } = await supabase?.from('notifications')?.select('*', { count: 'exact', head: true })?.eq('user_id', userId)?.eq('is_read', false);

      if (error) {
        throw new Error(`Failed to fetch unread count: ${error.message}`);
      }

      return count || 0;
    } catch (error) {
      console.error('Error fetching unread notifications count:', error);
      return 0;
    }
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const { data, error } = await supabase?.from('notifications')?.update({ 
          is_read: true, 
          read_at: new Date()?.toISOString(),
          updated_at: new Date()?.toISOString()
        })?.eq('id', notificationId)?.select()?.single();

      if (error) {
        throw new Error(`Failed to mark notification as read: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Mark all notifications as read
  async markAllAsRead(userId) {
    try {
      const { data, error } = await supabase?.from('notifications')?.update({ 
          is_read: true, 
          read_at: new Date()?.toISOString(),
          updated_at: new Date()?.toISOString()
        })?.eq('user_id', userId)?.eq('is_read', false)?.select();

      if (error) {
        throw new Error(`Failed to mark all notifications as read: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // Create notification
  async createNotification(notificationData) {
    try {
      const { data, error } = await supabase?.from('notifications')?.insert([notificationData])?.select()?.single();

      if (error) {
        throw new Error(`Failed to create notification: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const { error } = await supabase?.from('notifications')?.delete()?.eq('id', notificationId);

      if (error) {
        throw new Error(`Failed to delete notification: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  // Get upcoming scheduled notifications
  async getScheduledNotifications(userId) {
    try {
      const now = new Date()?.toISOString();
      const { data, error } = await supabase?.from('notifications')?.select('*')?.eq('user_id', userId)?.gte('scheduled_for', now)?.is('sent_at', null)?.order('scheduled_for', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch scheduled notifications: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching scheduled notifications:', error);
      throw error;
    }
  }
};