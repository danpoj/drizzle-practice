// src/db/seed.ts

import { db } from '@/db/drizzle.js';
import { postTable } from '@/db/schema.js';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();

if (!('NEON_DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
  const posts: (typeof postTable.$inferInsert)[] = [];

  for (let i = 0; i < 200; i++) {
    posts.push({
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      image: faker.image.url(),
    });
  }

  console.log('Seed start');
  await db.insert(postTable).values(posts);
  console.log('Seed done');
};

main();
