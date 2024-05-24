import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const postTable = pgTable('post', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});
