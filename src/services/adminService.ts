import { supabase } from '../lib/supabase';

export async function loginAdmin(username: string, password: string) {
  try {
    const { data, error } = await supabase
      .rpc('check_admin_credentials', {
        p_username: username,
        p_password: password
      });

    if (error) throw error;
    return data ? { success: true, adminId: data } : { success: false };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false };
  }
}