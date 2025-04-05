import { boolean } from 'drizzle-orm/gel-core';
import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  isAuthor: boolean("isAuthor").default(false)
}); 