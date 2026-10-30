import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

/**
 * Connection to Supabase (login + database).
 *
 * Only the PUBLIC project URL and PUBLISHABLE key are used here. They are safe
 * to ship inside the app because Row Level Security in the database decides
 * who may read or change which rows. Secret keys never belong in the app.
 */

const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? '';
const publishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? '';

function looksConfigured(): boolean {
  return /^https:\/\/.+/.test(url) && !url.includes('YOUR-PROJECT-ID') && publishableKey.length > 20 && !publishableKey.includes('xxxx');
}

export const isSupabaseConfigured = looksConfigured();

/** null when the .env file has not been filled in yet – the app still runs. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url, publishableKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

// Refresh the login session only while the app is open (recommended by Supabase).
if (supabase && Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      void supabase.auth.startAutoRefresh();
    } else {
      void supabase.auth.stopAutoRefresh();
    }
  });
}

export type ConnectionStatus = 'not_configured' | 'connected' | 'unreachable';

/** Checks whether the Supabase project answers. Used on the profile screen in development. */
export async function checkSupabaseConnection(timeoutMs = 8000): Promise<ConnectionStatus> {
  if (!isSupabaseConfigured) return 'not_configured';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: publishableKey },
      signal: controller.signal,
    });
    return response.ok ? 'connected' : 'unreachable';
  } catch {
    return 'unreachable';
  } finally {
    clearTimeout(timer);
  }
}
