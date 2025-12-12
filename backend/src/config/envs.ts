
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const envSchema = z
  .object({
    PORT: z.preprocess(
      (val) => {
        if (val === undefined || val === null || val === '') return 3000;
        return Number(val);
      },
      z.number().int().positive(),
    ),
    ALLOWED_ORIGINS: z.preprocess(
      (val) => {
        if (!val) return ['http://localhost:3000'];
        if (typeof val === 'string') return val.split(',').map((s) => s.trim());
        return val;
      },
      z.array(z.string()).nonempty(),
    ),
    DATABASE_URL: z.string().optional(),
    REDIS_URL: z.string().optional(),
    JWT_SECRET: z.string().default('your-super-secret-jwt-key-change-in-production'),
    JWT_EXPIRES_IN: z.string().default('1d'),
    // Database configuration
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.preprocess((val) => (val ? Number(val) : 3306), z.number().int().positive()),
    DB_USER: z.string().default('root'),
    DB_PASSWORD: z.string().default(''),
    DB_NAME: z.string().default('bdgestion_hoteles'),
    DB_SYNC: z.preprocess((val) => val === 'true', z.boolean().default(false)),
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().default('no-reply@yuta-yuttari.local'),
    FRONTEND_URL: z.string().default('http://localhost:5173'),
  })
  .passthrough();

type envType = z.infer<typeof envSchema>;

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error('❌ Config validation error:', envParsed.error.format());
  throw new Error('Invalid environment variables');
}

if (!envParsed.data.DATABASE_URL) {
  console.warn('⚠️ DATABASE_URL not set. Some features may be disabled.');
}

export const envs: envType = {
  PORT: envParsed.data.PORT,
  ALLOWED_ORIGINS: envParsed.data.ALLOWED_ORIGINS,
  DATABASE_URL: envParsed.data.DATABASE_URL,
  REDIS_URL: envParsed.data.REDIS_URL,
  JWT_SECRET: envParsed.data.JWT_SECRET,
  JWT_EXPIRES_IN: envParsed.data.JWT_EXPIRES_IN,
  DB_HOST: envParsed.data.DB_HOST,
  DB_PORT: envParsed.data.DB_PORT,
  DB_USER: envParsed.data.DB_USER,
  DB_PASSWORD: envParsed.data.DB_PASSWORD,
  DB_NAME: envParsed.data.DB_NAME,
  DB_SYNC: envParsed.data.DB_SYNC,
  RESEND_API_KEY: envParsed.data.RESEND_API_KEY,
  EMAIL_FROM: envParsed.data.EMAIL_FROM,
  FRONTEND_URL: envParsed.data.FRONTEND_URL,
};

