import { text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const subscriber = pgTable('subscriber', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
