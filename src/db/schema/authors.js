import { mysqlTable, int, varchar, text } from 'drizzle-orm/mysql-core';
import { usersTable } from './users.js';

export const authorsTable = mysqlTable('authors', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  bio: text('bio'),
  user_id: int('user_id').notNull().references(()=>usersTable.id).unique()
});
