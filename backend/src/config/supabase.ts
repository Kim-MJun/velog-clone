import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import type { Database } from '../types/database.types';

// 백엔드에서는 Service Key 사용 (admin 권한)
export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// 프론트엔드용 (Anon Key) - 필요 시 사용
export const supabaseClient = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);
