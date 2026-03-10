import { supabase } from './supabase';

export const isPremium = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('tier, status')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error || !data) return false;
    
    return ['premium', 'coaching_online', 'coaching_frontal'].includes(data.tier);
  } catch (e) {
    return false;
  }
};
