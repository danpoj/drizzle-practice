import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL as string,
  },
  schema: './db/schema.ts',
  out: './drizzle',
});
