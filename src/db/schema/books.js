import { mysqlTable, int, varchar, text, timestamp } from 'drizzle-orm/mysql-core';
import { authorsTable } from "./index.js";  

export const booksTable = mysqlTable('books', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  authorId: int('author_id').references(() => authorsTable.id),
  publishedAt: timestamp('published_at'),
}); 