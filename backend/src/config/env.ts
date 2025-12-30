import { config } from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

// .env 파일 로드 (최상단에!)
config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),
  SUPABASE_URL: str(),
  SUPABASE_ANON_KEY: str(),
  SUPABASE_SERVICE_KEY: str(),
  JWT_SECRET: str(),
});
