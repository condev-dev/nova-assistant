import { sql } from 'drizzle-orm';
import { index, pgTable, serial, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

const createdAt = () =>
  timestamp('created_at', { withTimezone: true }).defaultNow().notNull();

export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    channel: text('channel').notNull(),
    externalId: text('external_id').notNull(),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex('conv_unique').on(t.channel, t.externalId)],
);

export const messages = pgTable(
  'messages',
  {
    id: serial('id').primaryKey(),
    conversationId: uuid('conversation_id').references(() => conversations.id).notNull(),
    role: text('role').notNull(),
    content: text('content').notNull(),
    createdAt: createdAt(),
  },
  (t) => [index('messages_conv_idx').on(t.conversationId)],
);

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  conversationId: uuid('conversation_id').references(() => conversations.id).notNull(),
  channel: text('channel').notNull(),
  name: text('name'),
  phone: text('phone').notNull(),
  interest: text('interest'),
  createdAt: createdAt(),
});

export const bookings = pgTable(
  'bookings',
  {
    id: serial('id').primaryKey(),
    conversationId: uuid('conversation_id').references(() => conversations.id).notNull(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    service: text('service').notNull(),
    startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
    status: text('status').notNull().default('confirmed'),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex('booking_slot_unique').on(t.startsAt).where(sql`${t.status} = 'confirmed'`),
  ],
);

export const processedEvents = pgTable('processed_events', {
  id: text('id').primaryKey(),
  createdAt: createdAt(),
});
